// main.ts — news-image-20261122 entry program (Node 22, stdlib only).
//
// The entry image is the file entry.png shipped at the repository root
// (JPEG bytes under that name, which the rules allow: the file is told
// apart by its first bytes). This program validates it and copies it,
// byte for byte, to $MAKEFUN_OUTPUT_DIR/entry.png (or $OUTPUT_DIR, or
// /output). No network, no writes into the repository, no randomness:
// two runs write identical bytes.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

function fail(message: string): never {
  console.error("entry: " + message);
  process.exit(1);
}

function outputDir(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_DIR ||
    "/output";
  return resolve(dir);
}

function readJpegDimensions(buf: Buffer): { width: number; height: number } {
  // JPEG markers: SOI (FFD8), then segments. SOF markers (FFC0-FFCF
  // except FFC4 DHT, FFC8 JPG, FFCC DAC) carry height then width as
  // big-endian uint16 at offset 3..7. Our shipped file is SOF0, but
  // accept every SOF marker so a valid JPEG in another frame mode
  // is not wrongly rejected.
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) {
    fail("entry.png is not a JPEG (missing SOI marker FFD8)");
  }
  let pos = 2;
  while (pos + 2 <= buf.length) {
    if (buf[pos] !== 0xff) {
      fail("entry.png: corrupt JPEG marker at offset " + pos);
    }
    // Skip 0xFF fill bytes: any number may precede a marker code.
    while (pos + 1 < buf.length && buf[pos + 1] === 0xff) {
      pos++;
    }
    if (pos + 1 >= buf.length) {
      fail("entry.png: truncated JPEG marker at offset " + pos);
    }
    const marker = buf[pos + 1];
    if (marker === 0xd9) {
      // EOI is only valid as the final two bytes of the file; an
      // early EOI means the file is truncated or has trailing junk.
      if (pos + 2 === buf.length) {
        break;
      }
      fail("entry.png: EOI marker before end of file");
    }
    if (marker === 0xd8) {
      fail("entry.png: unexpected second SOI marker at offset " + pos);
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2; // standalone marker, no length field
      continue;
    }
    if (pos + 4 > buf.length) {
      fail("entry.png: truncated JPEG segment at offset " + pos);
    }
    const len = buf.readUInt16BE(pos + 2);
    if (len < 2 || pos + 2 + len > buf.length) {
      fail("entry.png: corrupt JPEG segment at offset " + pos);
    }
    if (marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      // A SOF segment needs at least precision + height + width
      // (len >= 8) before the component list; shorter is corrupt.
      if (len < 8) {
        fail("entry.png: corrupt SOF segment at offset " + pos);
      }
      const height = buf.readUInt16BE(pos + 5);
      const width = buf.readUInt16BE(pos + 7);
      return { width, height };
    }
    pos += 2 + len;
  }
  fail("entry.png: no JPEG frame header (SOF) found");
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  let stat;
  try {
    stat = statSync(source);
  } catch {
    fail("entry.png not found next to main.ts");
  }
  if (!stat.isFile()) {
    fail("entry.png is not a regular file");
  }
  if (stat.size > MAX_BYTES) {
    fail("entry.png is " + stat.size + " bytes, over the 1 MiB limit");
  }
  const buf = readFileSync(source);
  if (buf.length < 2 || buf[buf.length - 2] !== 0xff ||
      buf[buf.length - 1] !== 0xd9) {
    fail("entry.png is not a whole JPEG (missing EOI marker FFD9)");
  }
  const { width, height } = readJpegDimensions(buf);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    fail(
      "entry.png is " + width + "x" + height +
      ", expected 1024x1024",
    );
  }
  // Whole-file marker check: exactly one SOI (at offset 0) and one EOI
  // (at the end). The frame parser returns at the SOF header, so an
  // early EOI or a second SOI hidden after it would otherwise go
  // unseen. In valid entropy data every 0xFF is stuffed as 0xFF00,
  // so a raw FFD8/FFD9 can only be a real marker; this file has
  // exactly one of each.
  let soiCount = 0;
  let eoiCount = 0;
  for (let i = 0; i + 1 < buf.length; i++) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8) {
      soiCount++;
    }
    if (buf[i] === 0xff && buf[i + 1] === 0xd9) {
      eoiCount++;
    }
  }
  if (soiCount !== 1) {
    fail("entry.png has " + soiCount + " SOI markers, expected 1");
  }
  if (eoiCount !== 1) {
    fail("entry.png has " + eoiCount + " EOI markers, expected 1");
  }
  const outDir = outputDir();
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, "entry.png");
  // Write the validated buffer itself, not a second read of the file:
  // a file mutated between validation and copy would otherwise ship
  // unvalidated bytes.
  writeFileSync(dest, buf);
  console.log(
    "entry: wrote " + dest + " (" + buf.length + " bytes, " +
    width + "x" + height + " JPEG)",
  );
}

main();
