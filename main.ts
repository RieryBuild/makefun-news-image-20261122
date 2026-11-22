// main.ts — news-image-20261122 round 3.
//
// Copies the repository's entry.png to $MAKEFUN_OUTPUT_DIR/entry.png after
// validating that it is one whole JPEG within the competition limits
// (at most 1 MiB, at most 1024 by 1024 pixels). Node builtins only; the
// program reads one file next to this script and writes one file into the
// output directory, nothing else. The bytes written are the bytes read, so
// two runs write identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;
const MAX_DIM = 1024;

function fail(message: string): never {
  throw new Error("entry.png rejected: " + message);
}

function isStandalone(marker: number): boolean {
  return marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9);
}

function isSof(marker: number): boolean {
  return marker === 0xc0 || marker === 0xc1 || marker === 0xc2;
}

// Validate one JPEG buffer. Returns [width, height].
function validateJpeg(buf: Buffer): [number, number] {
  if (buf.length < 2) fail("file is empty");
  if (buf.length > MAX_BYTES) fail("file is " + buf.length + " bytes, over 1 MiB");
  if (buf[0] !== 0xff || buf[1] !== 0xd8) fail("missing SOI marker");
  if (buf[buf.length - 2] !== 0xff || buf[buf.length - 1] !== 0xd9) {
    fail("missing EOI marker at end of file");
  }

  let soiCount = 1;
  let eoiCount = 0;
  let sofCount = 0;
  let width = 0;
  let height = 0;
  let pos = 2;

  while (pos < buf.length) {
    if (buf[pos] !== 0xff) fail("expected marker at offset " + pos);
    // Skip fill bytes (0xff padding before a marker).
    while (pos < buf.length && buf[pos] === 0xff) pos++;
    if (pos >= buf.length) fail("truncated marker at end of file");
    const marker = buf[pos];
    pos++;
    if (marker === 0xd8) {
      fail("second SOI marker at offset " + (pos - 1));
    }
    if (marker === 0xd9) {
      eoiCount++;
      if (pos !== buf.length) fail("bytes after EOI marker");
      break;
    }
    if (isStandalone(marker)) continue;
    // Every other marker carries a 2-byte big-endian length that includes
    // the two length bytes themselves.
    if (pos + 2 > buf.length) fail("truncated length at offset " + pos);
    const length = buf.readUInt16BE(pos);
    if (length < 2) fail("bad segment length " + length + " at offset " + pos);
    if (pos + length > buf.length) {
      fail("segment overruns file at offset " + pos);
    }
    if (isSof(marker)) {
      sofCount++;
      // SOF layout: length(2) precision(1) height(2) width(2) count(1)
      // then 3 bytes per component, so length must be 8 + 3 * count.
      if (length < 11) fail("short SOF segment at offset " + pos);
      const components = buf[pos + 7];
      if (components < 1 || components > 4) {
        fail("bad component count " + components + " at offset " + pos);
      }
      if (length !== 8 + 3 * components) {
        fail("SOF length " + length + " mismatches " + components + " components");
      }
      height = buf.readUInt16BE(pos + 3);
      width = buf.readUInt16BE(pos + 5);
      if (width < 1 || height < 1) fail("zero image dimension");
      if (width > MAX_DIM || height > MAX_DIM) {
        fail("image is " + width + "x" + height + ", over 1024x1024");
      }
    }
    if (marker === 0xda) {
      // Start of scan: entropy data runs until the next real marker.
      // 0xff 0x00 is a stuffed byte, 0xff 0xd0..0xd7 are restart markers;
      // anything else after 0xff ends the scan.
      let scan = pos + length;
      let found = -1;
      while (scan + 1 < buf.length) {
        if (buf[scan] !== 0xff) {
          scan++;
          continue;
        }
        const next = buf[scan + 1];
        if (next === 0x00 || (next >= 0xd0 && next <= 0xd7)) {
          scan += 2;
          continue;
        }
        if (next === 0xff) {
          scan++;
          continue;
        }
        found = scan;
        break;
      }
      if (found < 0) fail("no marker after scan data");
      pos = found;
      continue;
    }
    pos += length;
  }

  if (soiCount !== 1) fail("found " + soiCount + " SOI markers");
  if (eoiCount !== 1) fail("found " + eoiCount + " EOI markers");
  if (sofCount !== 1) fail("found " + sofCount + " SOF markers");
  if (width < 1 || height < 1) fail("no image dimensions found");
  return [width, height];
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  let buf: Buffer;
  try {
    buf = readFileSync(source);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code ?? "unknown";
    fail("cannot read entry.png (" + code + ")");
  }
  const [width, height] = validateJpeg(buf);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) fail("MAKEFUN_OUTPUT_DIR is not set");
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.png");
  writeFileSync(target, buf);
  console.log(
    "wrote entry.png (" + buf.length + " bytes, " + width + "x" + height + ")",
  );
}

main();
