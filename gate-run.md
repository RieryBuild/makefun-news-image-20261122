# Gate run — news-image-20261122 round 4 (H6: "Sunday's own stories lead")

Build dir: `~/workspace/makefun-work/news-image-20261122-build-r4/`
Entry dir (working copy, NOT pushed): `~/workspace/makefun-work/news-image-20261122-entry/`
Repo: RieryBuild/makefun-news-image-20261122 (currently at r3 HEAD b5205910).
Standing approval: Reza, 22 Nov 08:06 WITA, verbatim: "Ya, approve semua
git/build/test make.fun" — covers all make.fun git/build/test in
`~/workspace/makefun-work/` + this goal's hidden_files.

Final artifact: `entry.png` — JPEG 1024×1024, **288,344 bytes**,
sha256 `ee849966c652f436bbbaf8506e0edc144c824364301ed162dae27922fddbf65c`.
28 stories (13 panels + 15 ALSO). Strip: 186 / 161 / 98.79% / 720/9 / 44h / 723
(all positive figures, no "0" cell).

## MQ1 — Competition read live
PASS. Competition `news-image-20261122`, "Sum up 22 November's world news in
one image", harness program/v1, status open. Entries close
2026-11-24T00:00:00Z (24 Nov 08:00 WITA); results due 2026-12-08T08:00:00Z.
Gate: image ≤1 MiB, ≤1024×1024, whole JPEG/PNG; program runs twice, same
bytes; no network. Judge: z-ai/glm-5.3-flash, pairwise, criteria in order:
(1) one day's news, names that day; (2) selection/breadth; (3) reads clearly
from the image alone, nothing false; (4) faithful; (5) craft, legible ~300px,
no garbled text. Tie on exact rate → smaller file, then earlier receipt.
Top 50 share $100 ($20/$12/$6/$2/$1.20). r3 ranked #4,736 (judge 0.969381);
gap to #50 = 19,531 LB pts.

## MQ2 — Entry shape
PASS. Repo root carries `main.ts` (Node 22, stdlib only), `entry.png`,
`NEWS.md`, `gate-run.md`, `LICENSE` (already in repo), `package.json`
(`"type": "module"`, `"main": "main.ts"` — already in repo, untouched).
`main.ts` reads `./entry.png` (the image the repository holds — the kit's own
documented simplest program), validates the JPEG structure, writes the same
bytes to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`).
No network, no dependencies. `README.md` left as-is per coordinator decision
from r3. Nothing pushed; coordinator handles the PAT commit.

## MQ3 — Determinism
PASS (2× byte-identical, both stages).
- `compose.py`: ran twice → identical sha256
  `ee849966c652f436bbbaf8506e0edc144c824364301ed162dae27922fddbf65c`.
  Fixed fonts (DejaVu), fixed layout, no timestamps/randomness in the image
  (only the static "Wires read up to 07:00 UTC" line), LANCZOS resize.
- `main.ts`: ran twice (different output dirs, and once from another cwd) →
  identical bytes, same sha256 as `entry.png`.
- Note: `main.ts` was rewritten from the embed architecture to the copy
  architecture during the Gate 3 audit (see Gate 3); the JPEG validator logic
  is unchanged from the Gate-1-reviewed version, and determinism was
  re-verified after the rewrite.

## MQ4 — Size / format / legibility
PASS.
- Format: JPEG (SOI `FF D8` … EOI `FF D9`), 1024×1024, validated by
  `main.ts` (segment walk, SOF0 8-bit 1024×1024, scan-data marker rules).
- Size: 288,344 bytes — under the 300 KB target and well under the 1 MiB cap.
  (Also a tie-break advantage: on an exact rate tie the smaller file wins.)
- 300px legibility test: PASS — downscaled to 300×300, the masthead date
  "SUNDAY 22 NOVEMBER 2026", the deck, all six strip figures and all three
  hero headlines ("Iran claims two US radars hit", "Still burning on Sunday",
  "The deal that died") read clearly, not borderline. Verified by viewing the
  300px render and a 2× upscaled crop of its top band.

## MQ5 — Angle (H6)
PASS. Heroes are Sunday's own stories: (1) BAHRAIN — first reported Sunday
04:46 UTC, CLAIM vs DENIAL both stated; (2) SPARTA II — hit Saturday, still
burning Sunday; (3) COP31 — no deal decided Sunday. Deck leads with the same
three. Drones (186) and Hong Kong are panels, not heroes. This is a new
hierarchy vs r3 ("The Day the Deal Died", 37 stories, COP31-led); no layout
or copy was taken from r1–r3 (their files were never read for retyping).

## MQ6 — Facts / dates
PASS. All 28 stories verified from primary sources with first-report dates
in NEWS.md (Reuters/AP/AFP/UN News/UKMTO/USGS-adjacent NCS/info.gov.hk/
ESPNcricinfo/FIA/ATP/Vatican News/IANS/MEA). Date discipline: day rule =
happened OR first reported on Sunday 22 Nov 2026 in any timezone; never
aggregator republication dates; never bloggersminds.com. 18 exclusions in the
DATE CHECK footer (10 mandated + 8 verified extras: Qeshm MQ-9 claim,
France–Myanmar, Ladakh polls, Nitish Setu, Arsenal/Leeds, Akvan flights,
Pugh swim, Gaza aid-van strike). Borderline calls documented in NEWS.md:
England 37–12 (Sat London, Sun NZ), Myanmar quake (21:05 UTC Sat, 03:35 Sun
local), F1 (Sat night Vegas, Sun morning UTC), BBC gamer rescue (feature
first published 22 Nov, rescue late Oct), Eisenkot mandate 7–8 Nov vs
Sunday's condemnation + Likud talks. F1 time corrected to 1:27:39.624 (FIA;
the brief's 1:37:39.624 is wrong). COP31 framed as first no-deal since
Copenhagen 2009 (asiatoday + coordinator), not Hague 2000.

## MQ7 — Authorship / transcripts
PASS (builder side; coordinator bundles at the end).
- `compose.py` (438 lines) and `main.ts` (109 lines) written fresh in-session,
  revised in-session across multiple assistant messages (compose.py: 2-chunk
  write + overflow trims + 7 Gate 1 fixes; main.ts: fresh write + SOI patch +
  payload re-injections + full rewrite to copy architecture). thinking_revised
  (≥2 messages) satisfied for both files.
- 13 panels generated in-session by the image model in flat illustration
  style (files in `panels/`, one .webp per panel); no photorealistic AI
  photos of real events; nothing code-drawn as a panel substitute.
- r1–r3 `compose.py` / `main.ts` / `NEWS.md` / `entry.png` were NOT read for
  retyping (task instruction); the entry dir's `package.json` was read only
  to confirm `"type": "module"`.
- `makefun record` NOT run (returns HTTP 400 for this competition);
  transcripts upload as a bundle from live sessions; builder session files
  kept intact, nothing deleted.
- Authorship risk found and fixed in the Gate 3 audit: the first `main.ts`
  embedded the JPEG as ~5,059 base64 lines produced by a script — those lines
  appear nowhere in the transcripts, so they would count as unwritten lines
  against the 30% authored share (thinking_reproduces). Rewrote `main.ts` to
  the kit's documented copy pattern (read `./entry.png`, validate, write).
  All counted lines are now agent-authored in-session.

## MQ8 — Self-critique
Three measured cycles in-session:
1. First render overflowed (final y=1108): trimmed panel bodies to ≤~155
   chars, hero image 132→118, small image 62→48, map 132→118 → final y=1016.
2. ALSO items wrapped to 2 lines and overlapped: shortened all 15 items to
   ≤59 chars (single line each, verified visually); JPEG quality 88→80 →
   360,422 B → 289,905 B (under the 300 KB target).
3. Gate 1 fixes (see Gate 2): ALSO single-line assert, wrap() word-split
   fallback, panel-loader exact-match assert, map 13 pins → 3 hero pins,
   strip label "India declared", COP31 "annual" + trims, HK headline
   "98.79% turnout", main.ts second-SOI check, copy architecture.
   Final: 288,344 B, final y=1016, 300px PASS, determinism re-verified.

## Gate 0 — Requirements
PASS. Entry satisfies the competition.yaml gate: JPEG ≤1 MiB, 1024×1024,
whole file (validated end marker), program runs twice with identical bytes,
no network. 28 stories, all 22 Nov 2026 (any timezone). No provider API key
or secret in the entry files. No entry fee (requirements `entry_fee` is null).
Escrow funded (status in req file; coordinator verifies at submit).

## Gate 1 — Local run + checks
PASS.
- `python3 compose.py` → rendered, final y=1016, no overflow, no overlap
  (visually verified full-size + 300px + crops: Israel panel, map).
- `node main.ts` ×2 (+ once from another cwd) → identical bytes, sha256
  matches `entry.png`.
- JPEG validated by `main.ts` on every run (SOI/EOI/SOF0/scan rules).
- Panel audit: all 13 panels viewed (contact sheet + p01/p05 full-size) —
  flat illustration, on-topic, no baked-in text, no photographs.

## Gate 2 — Multi-model review (OpenRouter :free, $0)
Two rounds. Round 1: nemotron-3-ultra-550b-a55b:free (text: compose.py +
main.ts code + NEWS.md; 35,220 tokens) and nemotron-3.5-super-vl:free
(image: entry.png; 7,561 tokens). Round 2 (re-review after fixes):
nemotron-3-ultra (26,924 tokens) + nemotron-3.5-super-vl (8,280 tokens).
Gemini: 503s did not clear → skipped, recorded GAP (not FAIL), same as r3.

Round 1 text (verdict FAIL) — 7 findings, all adjudicated:
1. MAJOR ALSO loop draws only lines[0] → REAL (latent). FIXED: assert
   len(lines)==1 (fail loudly, not silently truncate).
2. MAJOR map legend explains only pins 1–3 of 13 → REAL. FIXED: map now
   shows only the 3 hero pins; legend complete.
3. MINOR wrap() no over-long-word split → REAL edge case. FIXED: char-split
   fallback added.
4. MINOR panel loader "locale-dependent sort" → reviewer's premise wrong
   (Python sorted() is code-point order, deterministic); hardening applied
   anyway: assert exactly one match.
5. NIT `d._image` private attr → REAL. FIXED: panel_block now takes the
   canvas image explicitly (`img.paste`); the reviewer's suggested `draw.im`
   was itself wrong — `ImageDraw.im` is the low-level core object, and using
   it raised TypeError on first run (caught and fixed the same way).
6. MINOR main.ts SOI standalone handling → partially real. FIXED: explicit
   "second SOI before SOS" fail (EOI was already handled).
7. NIT "India declare" → REAL. FIXED: "India declared in Wellington".
8–9. VERIFIED: all 28 stories/dates correct; determinism confirmed.

Round 1 image (verdict FAIL) — 3 findings:
1. MAJOR pin 2 "in the North Sea near the UK" → NOT REPRODUCED. Pin 2 is at
   lon 24.0E / lat 60.0N = Gulf of Finland (correct). The real underlying
   issue was the 13-pin Europe cluster overlapping — FIXED by hero-only pins.
2. MINOR HK panel "98.79% turnout out" baked text → NOT REPRODUCED. The
   p05 panel viewed full-size contains no text at all. (The headline "98.79%
   turn out" was later reworded anyway — see round 2.)
3. NIT footer dense → accepted as-is (8pt, legible; standard footer size).

Round 2 text (verdict PASS WITH MINOR FIXES) — 5 findings:
1. MINOR wrap single-char edge → theoretical only, reviewer itself: "cannot
   happen in practice, risk negligible". No change.
2. MINOR loader assert crash message → assert message is already explicit
   ("panel %s: %d matches"); reviewer: "keep the assert (acceptable)". No change.
3. MINOR ALSO assert fragility → the assert is the intended fail-loud
   behaviour for fixed content. No change.
4. NIT COP31 missing "annual" → REAL. FIXED: "dropped a $120bn annual
   adaptation target" (with two trims to hold the 6-line body; final y
   still 1016).
5. NIT Israel party names → reviewer: "current phrasing is not wrong".
   No change.
6–8. VERIFIED: facts/dates, JPEG validation, determinism.

Round 2 image (verdict FAIL) — 4 findings, all checked directly:
1. MAJOR "Eisenkot condemns asron" → NOT REPRODUCED. Full-resolution crop
   of the rendered panel reads "Eisenkot condemns arson". Model OCR error.
2. MAJOR Israel panel "photograph of a military vehicle" → NOT
   REPRODUCED. The panel is a flat illustration of a hillside village with
   soldiers and smoke (viewed in the contact sheet and the crop). Model
   hallucination.
3. MAJOR pin 2 "North Sea/UK" again → NOT REPRODUCED (same as round 1).
   Map crop shows pin 2 north of pin 3 (Antalya), at the Gulf of Finland
   coordinates; pin 1 sits in the Gulf, pin 3 on Turkey's south coast.
4. MINOR HK headline "98.79% turnout out" again → the headline was
   "98.79% turn out"; the model merged "turn"+"out" and flagged the trailing
   "out". Real ambiguity, cheap fix: FIXED → headline is now "98.79% turnout".

No Gate 1 finding remains unadjudicated. The two image FAIL verdicts rest
entirely on model misreads that direct visual inspection refutes; the one
real item they raised (HK headline wording) was fixed and re-rendered.
No third full re-review was run: the VL reviewer repeated the same two
misreads across both rounds despite the fixes, so a third pass would add
noise, not signal; adjudication rests on direct crops instead.

## Gate 3 — Literal gate-row audit (req file, 56 checks)
Audited against `req-news-image-20261122-r4-fresh.json` (56 checks).
Builder-relevant rows:
- competition_open / quota / form / entry_signature / repo_owner /
  repo_public / license_osi / repo_created_after_open / commit_in_repo:
  COORDINATOR scope (submit-time; repo is public, LICENSE present,
  created after open, coordinator holds the PAT commit + 6do8 wallet).
  Builder verified the repo is the r3 working copy at HEAD b5205910 and did
  NOT push.
- duplicate_snapshot: PASS — all files are new in-session work (H6
  hierarchy, new panels, fresh code); entry.png bytes differ from r3.
- entry_size: PASS — entry.png 288,344 B ≤ 1 MiB; main.ts 4,105 B;
  tree well under any cap (kit caps are per-file/tree; largest file is the
  288 KB image).
- committed_provider_key / committed_secret: PASS — no keys or secrets in
  any entry file (grep-verified by construction: only code + image + docs).
- security_audit: PASS — stdlib only, no network, no shell, no eval, no
  dynamic code; reads one local file, writes one local file.
- transcripts_present / recorded / wellformed / in_window / committed /
  reproduces / turns / priced / revised / fresh / own_work:
  COORDINATOR scope at bundle time, but builder-side evidence: session
  started after the competition opened (23 Nov, in-window); compose.py +
  main.ts + NEWS.md all authored in-session across ≥5 assistant messages
  with writes/edits (thinking_revised ✓); ≥30% authored share achievable
  because every counted line is agent-written (the embed-architecture risk
  was caught and fixed — see MQ7); panels generated in-session, not
  downloaded; no r1–r3 files read or copied (thinking_own_work ✓).
- run_completes / run_deterministic: PASS — main.ts runs in <1 s, twice,
  byte-identical, no network, stdlib only (Node 24 tested; kit runs Node 22
  with type-stripping for erasable TS — main.ts uses only erasable syntax).
- hindsight_clean / distinct_entrant / model_call / dev_profitable /
  practice_floor / contender / finalist_review / disqualified / claim_*: not
  applicable at build time (grading/claim phases; coordinator + submitter).
- strict_transcripts: not present in the req file's escrow block (no
  strict_transcripts key) — the task's "verify strict_transcripts" item is
  therefore N/A for this competition; transcripts upload as a bundle from
  live sessions per the task brief (recorder N/A, HTTP 400).

## Fix record — Gate 1 re-review, fix builder (23 Nov ~16:00–17:00 WITA)

Standing approval (Reza, 22 Nov 08:06 WITA, verbatim): "Ya, approve semua
git/build/test make.fun".

The coordinator's independent OpenRouter review (nemotron-3-ultra-550b-a55b:free)
of the r4 entry returned FAIL. Its 8 fact findings were all adjudicated
INVALID by the coordinator (the model judged 22 Nov 2026 events against a
2024 knowledge cutoff; every fact verified from primary sources). The 6 code
findings were REAL and were patched in `main.ts` (in-session edits only;
`entry.png` untouched, still 288,344 B, sha
`ee849966c652f436bbbaf8506e0edc144c824364301ed162dae27922fddbf65c`):

1. File-size check: `if (buf.length > 1024 * 1024) fail("file exceeds 1 MiB");`
   at the top of `validateJpeg`.
2. Entropy-data scan: 0xFF fill byte — when the next byte is also 0xFF,
   advance `i` by 1 (re-examine the next byte) instead of failing
   "unexpected marker".
3. Marker-padding skip loop bounded: `while (marker === 0xff && pos + 1 <
   buf.length)`.
4. Bounds re-verified after the padding skip: `if (pos + 3 >= buf.length)
   fail("truncated segment header");` before reading the segment length.
5. Duplicate SOF0: `if (sawSof0) fail("duplicate SOF0");` in the 0xC0 block.
6. Duplicate SOS: `if (sawSos) fail("duplicate SOS");` in the 0xDA block.

Determinism re-verified after the 6 fixes (Node 22.21.0): `main.ts` run
twice into fresh dirs + once from another cwd — all three outputs
byte-identical, sha256 `ee849966c652f436bbbaf8506e0edc144c824364301ed162dae27922fddbf65c`
(matching `entry.png`).

Re-review #1 (same model, prompt `r4-review-prompt-fix.txt`, reply
`r4-review-fix.json`, 11,929 tokens, $0): verdict FAIL, 16 findings.
3 code findings REAL, fixed in-session:
- (a) RST/TEM accepted as standalone markers before SOS → now
  `fail("standalone marker 0xFF… before SOS")`.
- (b) 0xFF00 not rejected in the marker stream → now
  `fail("0xFF00 stuffing byte in marker stream")`.
- (c) Entropy scan could exit without seeing EOI (e.g. an SOS segment
  length that jumps past the scan) → `sawEoiInScan` flag, fail if EOI
  never seen in the scan.
13 fact findings (claims 1–13) INVALID — same 2024-cutoff misreads as the
first review (model reasons "as of 2024": no COP31, Pope Francis, Dahal as
Nepal PM, etc.); all 13 claims were verified from primary sources by the
coordinator. Determinism re-verified after these 3 fixes (2× + other cwd,
all `ee849966…`).

Re-review #2 (same model, prompt `r4-review-prompt-fix2.txt`, reply
`r4-review-fix2.json`, 18,990 tokens, $0): verdict FAIL, 6 findings.
2 code findings REAL, fixed in-session (no third full re-review per the
task's cap — adjudicated from direct inspection + negative tests instead):
- (d) `0xFF 0xFF 0x00` in scan data was accepted (a gap introduced by fix
  2's fill-byte handling) → fill byte now requires the following byte
  not to be 0x00: `fail("0xFF00 after fill byte in scan data")`.
- (e) Other SOF markers (0xC1, 0xC2, …) were silently skipped → now
  `fail("unexpected SOF marker 0xFF…")` for any SOF other than SOF0
  (0xC4 DHT / 0xC8 JPG / 0xCC DAC excluded, they are not SOF).
4 fact findings (claims 8, 9, 10, 12) INVALID — repeats of the same
2024-cutoff misreads already adjudicated in re-review #1 (Balendra Shah,
Pope Leo XIV, Eisenkot/Yashar, Pochettino at United); coordinator-verified
from primary sources.

Final `main.ts`: 5,748 bytes, sha256
`53afdc6299a7d411e99465fd55eacecaaebc3f623c4067d8913a34501a673c63`.
Determinism re-verified after the final 2 fixes (2× + other cwd, all
`ee849966…`). Negative tests on mutated copies in /tmp (real code, real
validator): `0xFF 0xFF 0x00` in scan data → rejected "0xFF00 after fill
byte in scan data"; SOF1 → rejected "unexpected SOF marker 0xFFc1"; RST
before SOS → rejected "standalone marker 0xFFd0 before SOS"; 0xFF00 in
marker stream → rejected "0xFF00 stuffing byte in marker stream";
unmutated control → accepted. No third full re-review run: the model's
remaining FAILs rest entirely on the repeated 2024-cutoff fact misreads,
already adjudicated, and the two new code items were fixed and verified by
direct negative tests (same precedent as Gate 2's image FAILs).

Gemini: 503, skipped, recorded GAP (not FAIL), same as r3.

## Verdict: READY FOR SUBMIT
All gates pass. One recorded GAP (Gemini 503, skipped, not a fail) and three
documented non-findings (VL model misreads, refuted by direct inspection).
Fix-builder round (see Fix record above): the coordinator's Gate 1 text
re-review FAIL rested on 8 adjudicated-INVALID fact findings plus 6 REAL
code findings, all fixed in `main.ts`; two follow-up re-reviews surfaced 5
further REAL code findings, all fixed and verified by determinism runs +
negative tests; their remaining fact findings are repeats of the same
2024-cutoff misreads, adjudicated INVALID from direct inspection.
Coordinator next: verify, commit via PAT, bundle, submit with --keypair
(wallet 6do8 only). Entries close 24 Nov 08:00 WITA; coordinator hard abort
~07:00 WITA 24 Nov.
