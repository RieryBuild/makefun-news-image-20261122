// main.ts — news-image-20261122, round 4 entry writer.
//
// Stdlib only, no network. The entry image lives in this repository as
// entry.png; this program reads it, validates the JPEG structure
// (SOI/EOI, segment walk, SOF0 dimensions 1024x1024, scan-data marker
// rules) and writes the same bytes to $MAKEFUN_OUTPUT_DIR/entry.png
// (default /output/entry.png). Deterministic: a pure copy.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE: string = dirname(fileURLToPath(import.meta.url));
const JPEG: Buffer = readFileSync(join(HERE, "entry.png"));

function fail(msg: string): never {
  throw new Error("main.ts: " + msg);
}

function validateJpeg(buf: Buffer): void {
  if (buf.length > 1024 * 1024) fail("file exceeds 1 MiB");
  if (buf.length < 4) fail("file too small to be a JPEG");
  // SOI must open the file.
  if (buf[0] !== 0xff || buf[1] !== 0xd8) fail("missing SOI marker");
  // EOI must close the file, with nothing trailing it.
  if (buf[buf.length - 2] !== 0xff || buf[buf.length - 1] !== 0xd9) {
    fail("missing trailing EOI marker");
  }

  // Walk the marker segments up to SOS.
  let pos: number = 2;
  let sawSof0: boolean = false;
  let sawSos: boolean = false;
  while (pos + 3 < buf.length) {
    if (buf[pos] !== 0xff) fail("expected marker prefix at offset " + pos);
    let marker: number = buf[pos + 1];
    // Skip 0xFF padding bytes before the marker code.
    while (marker === 0xff && pos + 1 < buf.length) {
      pos++;
      marker = buf[pos + 1];
    }
    // Padding-skip may have consumed to the end of the file; re-check
    // bounds before reading the segment header below.
    if (pos + 3 >= buf.length) fail("truncated segment header");
    // 0xFF00 is a stuffed byte, valid only inside scan data — never in
    // the marker stream before SOS.
    if (marker === 0x00) fail("0xFF00 stuffing byte in marker stream");
    // Only SOF0 is a valid start-of-frame here (0xC4 DHT, 0xC8 JPG and
    // 0xCC DAC are not SOF markers); any other SOF is rejected.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc0 && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      fail("unexpected SOF marker 0xFF" + marker.toString(16));
    }
    if (marker === 0xd9) fail("EOI reached before SOS");
    if (marker === 0xd8) fail("second SOI before SOS");
    if (marker === 0xda) {
      // SOS: entropy data follows the segment header.
      if (sawSos) fail("duplicate SOS");
      sawSos = true;
      const segLen: number = (buf[pos + 2] << 8) | buf[pos + 3];
      if (segLen < 2) fail("SOS segment length < 2");
      let i: number = pos + 2 + segLen;
      let sawEoiInScan: boolean = false;
      // Scan the entropy data with proper marker rules: 0xFF00 is a
      // stuffed byte, 0xFFD0-0xFFD7 are restart markers, 0xFFD9 ends it.
      while (i + 1 < buf.length) {
        if (buf[i] !== 0xff) {
          i++;
          continue;
        }
        const code: number = buf[i + 1];
        if (code === 0xff) {
          // 0xFF fill (padding) byte inside scan data: advance by 1 so
          // the next 0xFF is re-examined as a possible marker prefix. A
          // fill byte must be followed by a real marker, never by a
          // stuffed 0x00 byte (0xFF 0xFF 0x00 is malformed).
          if (i + 2 >= buf.length) fail("truncated fill byte in scan data");
          if (buf[i + 2] === 0x00) fail("0xFF00 after fill byte in scan data");
          i += 1;
          continue;
        }
        if (code === 0x00) {
          i += 2;
          continue;
        }
        if (code >= 0xd0 && code <= 0xd7) {
          i += 2;
          continue;
        }
        if (code === 0xd9) {
          if (i + 2 !== buf.length) fail("EOI not at end of file");
          sawEoiInScan = true;
          break;
        }
        if (code === 0xd8) fail("second SOI inside scan data");
        fail("unexpected marker 0xFF" + code.toString(16) + " in scan data");
      }
      if (!sawEoiInScan) fail("EOI not found in entropy data");
      break;
    }
    // RST (0xFFD0-0xFFD7) and TEM (0xFF01) occur only inside entropy-coded
    // scan data, never in the marker stream before SOS.
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      fail("standalone marker 0xFF" + marker.toString(16) + " before SOS");
    }
    const segLen: number = (buf[pos + 2] << 8) | buf[pos + 3];
    if (segLen < 2) fail("segment length < 2 at offset " + pos);
    if (pos + 2 + segLen > buf.length) {
      fail("segment overruns file at offset " + pos);
    }
    if (marker === 0xc0) {
      // SOF0: precision (1), height (2), width (2), components (1).
      if (segLen < 11) fail("SOF0 segment too short");
      const precision: number = buf[pos + 4];
      const h: number = (buf[pos + 5] << 8) | buf[pos + 6];
      const w: number = (buf[pos + 7] << 8) | buf[pos + 8];
      if (precision !== 8) fail("SOF0 precision " + precision + " != 8");
      if (h !== 1024 || w !== 1024) {
        fail("SOF0 dimensions " + w + "x" + h + " != 1024x1024");
      }
      if (sawSof0) fail("duplicate SOF0");
      sawSof0 = true;
    }
    pos += 2 + segLen;
  }
  if (!sawSof0) fail("no SOF0 segment found");
  if (!sawSos) fail("no SOS segment found");
}

validateJpeg(JPEG);

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath: string = join(outDir, "entry.png");
writeFileSync(outPath, JPEG);
const sha: string = createHash("sha256").update(JPEG).digest("hex");
console.log("wrote " + outPath + " (" + JPEG.length + " bytes, sha256 " + sha + ")");
