// main.ts — news-image-20261122 round 2 (results edition).
//
// Node 22, standard library only, no network. Validates the shipped
// entry.png (JPEG bytes, 1024x1024, at most 1 MiB, whole file through
// to its end marker) and copies it byte for byte to
// $MAKEFUN_OUTPUT_DIR/entry.png (fallback $OUTPUT_DIR, then /output).
// Two runs write identical bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576; // 1 MiB
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// Count raw occurrences of a two-byte sequence in the whole buffer.
// JPEG entropy data stuffs 0xFF as 0xFF00, so a raw 0xFFD8 / 0xFFD9
// byte pair can only be a real marker, never image data.
function countSequence(buf: Buffer, a: number, b: number): number {
  let n = 0;
  for (let i = 0; i + 1 < buf.length; i++) {
    if (buf[i] === a && buf[i + 1] === b) n++;
  }
  return n;
}

// Walk the JPEG marker segments from the SOI and return the frame size
// from the first SOF marker. Bounds-check every read.
function frameSize(buf: Buffer): { width: number; height: number } {
  let pos = 2; // past the SOI
  while (pos + 1 < buf.length) {
    if (buf[pos] !== 0xff) {
      fail(`expected marker prefix 0xFF at offset ${pos}`);
    }
    // Skip 0xFF fill bytes; the marker code is the first non-0xFF byte.
    let codePos = pos + 1;
    while (codePos < buf.length && buf[codePos] === 0xff) codePos++;
    if (codePos >= buf.length) fail("truncated marker at end of file");
    const code = buf[codePos];
    if (code === 0xd8) fail("second SOI marker");
    if (code === 0xd9) {
      // The pre-checks guarantee the file ends with exactly one EOI,
      // so reaching it here means no SOF marker came before it.
      fail("no SOF marker found (reached EOI)");
    }
    if (code === 0x01 || (code >= 0xd0 && code <= 0xd7)) {
      // Standalone markers (TEM, RST0-RST7): no length field.
      pos = codePos + 1;
      continue;
    }
    if (codePos + 3 > buf.length) fail("truncated segment length");
    const segLen = buf.readUInt16BE(codePos + 1);
    if (segLen < 2) fail(`segment length ${segLen} too small`);
    if (codePos + 1 + segLen > buf.length) {
      fail("segment overruns end of file");
    }
    const isSos = code === 0xda;
    if (isSos) {
      // Start-of-scan: entropy-coded data follows, and no SOF marker
      // can appear after it. Stop the walk instead of misreading
      // scan data as markers.
      fail("no SOF marker found before scan data");
    }
    const isSof =
      code >= 0xc0 &&
      code <= 0xcf &&
      code !== 0xc4 && // DHT
      code !== 0xc8 && // JPG
      code !== 0xcc; // DAC
    if (isSof) {
      if (segLen < 8) fail("SOF segment too short");
      const height = buf.readUInt16BE(codePos + 4);
      const width = buf.readUInt16BE(codePos + 6);
      return { width, height };
    }
    pos = codePos + 1 + segLen;
  }
  fail("no SOF marker found");
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = join(here, "entry.png");
  let buf: Buffer;
  try {
    buf = readFileSync(src);
  } catch {
    fail(`cannot read ${src}`);
  }
  if (buf.length === 0) fail("entry.png is empty");
  if (buf.length > MAX_BYTES) {
    fail(`entry.png is ${buf.length} bytes, over the 1 MiB cap`);
  }
  if (buf[0] !== 0xff || buf[1] !== 0xd8) {
    fail("entry.png does not start with JPEG SOI (FFD8)");
  }
  if (buf[buf.length - 2] !== 0xff || buf[buf.length - 1] !== 0xd9) {
    fail("entry.png does not end with JPEG EOI (FFD9)");
  }
  if (countSequence(buf, 0xff, 0xd8) !== 1) {
    fail("entry.png must contain exactly one SOI marker");
  }
  if (countSequence(buf, 0xff, 0xd9) !== 1) {
    fail("entry.png must contain exactly one EOI marker");
  }
  const { width, height } = frameSize(buf);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    fail(
      `entry.png is ${width}x${height}, expected ` +
        `${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
    );
  }
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, "entry.png");
  writeFileSync(dest, buf);
  console.log(
    `wrote ${dest} (${buf.length} bytes, ${width}x${height} JPEG)`,
  );
}

main();
