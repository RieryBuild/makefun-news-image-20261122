// news-image-20261122 round 5 (H7): entry program, Node 22, stdlib only.
//
// The repository holds the finished image as entry.png beside this file.
// The program checks that it is a whole, well-formed JPEG of at most
// 1024x1024 pixels, then copies the exact bytes to the output directory
// the grader provides. No network, no dependencies, no randomness: two
// runs write byte-identical files.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE = new URL("./entry.png", import.meta.url);
const DEST_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const DEST = join(DEST_DIR, "entry.png");
const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;

function fail(message) {
  throw new Error("entry.png failed validation: " + message);
}

function checkJpeg(bytes) {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    fail("missing JPEG start marker");
  }
  if (bytes.length > MAX_BYTES) {
    fail("file is " + bytes.length + " bytes, over the 1 MiB cap");
  }
  let pos = 2;
  let sawFrame = false;
  let sawScan = false;
  let sawEnd = false;
  while (pos + 1 < bytes.length) {
    if (bytes[pos] !== 0xff) {
      fail("expected a marker at offset " + pos);
    }
    const marker = bytes[pos + 1];
    if (marker === 0xd9) {
      sawEnd = true;
      pos += 2;
      break;
    }
    if (marker === 0xda) {
      // Start of scan: the SOS segment has a length field; scan data
      // begins after it. Walk the compressed data to the end marker,
      // skipping stuffed 0xff 0x00 pairs and restart markers, so a file
      // truncated mid-scan (or with trailing bytes after EOI) fails.
      if (pos + 4 > bytes.length) {
        fail("truncated scan header");
      }
      const sosSize = (bytes[pos + 2] << 8) | bytes[pos + 3];
      let scan = pos + 2 + sosSize;
      let foundEnd = false;
      while (scan + 1 < bytes.length) {
        if (bytes[scan] !== 0xff) {
          scan += 1;
          continue;
        }
        const next = bytes[scan + 1];
        if (next === 0x00) {
          scan += 2;
          continue;
        }
        if (next >= 0xd0 && next <= 0xd7) {
          scan += 2;
          continue;
        }
        if (next === 0xd9) {
          if (scan + 2 !== bytes.length) {
            fail("bytes trail the JPEG end marker");
          }
          foundEnd = true;
          break;
        }
        fail("unexpected marker 0xff"
             + next.toString(16).padStart(2, "0") + " in scan data");
      }
      if (!foundEnd) {
        fail("no end marker in scan data");
      }
      sawScan = true;
      sawEnd = true;
      break;
    }
    if (marker === 0xd8) {
      fail("second start marker before any scan data");
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2;
      continue;
    }
    if (pos + 4 > bytes.length) {
      fail("truncated segment header");
    }
    const size = (bytes[pos + 2] << 8) | bytes[pos + 3];
    if (size < 2 || pos + 2 + size > bytes.length) {
      fail("segment overruns the file at offset " + pos);
    }
    if (marker === 0xc0) {
      if (size < 8 || bytes[pos + 4] !== 8) {
        fail("unsupported frame: not 8-bit baseline");
      }
      const height = (bytes[pos + 5] << 8) | bytes[pos + 6];
      const width = (bytes[pos + 7] << 8) | bytes[pos + 8];
      if (width === 0 || height === 0 || width > MAX_SIDE
          || height > MAX_SIDE) {
        fail("dimensions " + width + "x" + height + " exceed 1024x1024");
      }
      sawFrame = true;
    }
    pos += 2 + size;
  }
  if (!sawFrame) {
    fail("no frame segment found");
  }
  if (!sawScan || !sawEnd) {
    fail("no scan data or end marker found");
  }
}

const bytes = readFileSync(SOURCE);
checkJpeg(bytes);
copyFileSync(SOURCE, DEST);
const written = readFileSync(DEST);
if (!written.equals(bytes)) {
  fail("destination bytes differ from entry.png");
}
