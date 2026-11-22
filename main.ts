// main.ts — news-image-20261122 entry program (Node 22, stdlib only).
//
// The entry image is the file entry.png shipped at the repository root
// (JPEG bytes under that name, which the rules allow: the file is told
// apart by its first bytes). This program validates it and copies it,
// byte for byte, to $MAKEFUN_OUTPUT_DIR/entry.png (or $OUTPUT_DIR, or
// /output). No network, no writes into the repository, no randomness:
// two runs write identical bytes.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
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
  // JPEG markers: SOI (FFD8), then segments. SOF0 (FFC0) / SOF2 (FFC2)
  // carry height then width as big-endian uint16 at offset 3..7.
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) {
    fail("entry.png is not a JPEG (missing SOI marker FFD8)");
  }
  let pos = 2;
  while (pos + 9 <= buf.length) {
    if (buf[pos] !== 0xff) {
      fail("entry.png: corrupt JPEG marker at offset " + pos);
    }
    const marker = buf[pos + 1];
    if (marker === 0xd9) {
      break; // EOI reached without a frame header
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      pos += 2; // standalone marker, no length field
      continue;
    }
    const len = buf.readUInt16BE(pos + 2);
    if (len < 2 || pos + 2 + len > buf.length) {
      fail("entry.png: corrupt JPEG segment at offset " + pos);
    }
    if (marker === 0xc0 || marker === 0xc2) {
      const height = buf.readUInt16BE(pos + 5);
      const width = buf.readUInt16BE(pos + 7);
      return { width, height };
    }
    pos += 2 + len;
  }
  fail("entry.png: no JPEG frame header (SOF0/SOF2) found");
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
  const outDir = outputDir();
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, "entry.png");
  copyFileSync(source, dest);
  console.log(
    "entry: wrote " + dest + " (" + buf.length + " bytes, " +
    width + "x" + height + " JPEG)",
  );
}

main();
