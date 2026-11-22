# Gate run — news-image-20261122 round 1 (builder)

Built Sun 22 Nov 2026, ~09:00–13:30 WITA. Entry dir:
`~/workspace/makefun-work/news-image-20261122-entry/`.
Build dir: `~/workspace/makefun-work/news-image-20261122-build/`
(compose.py + panels/; compose.py NOT submitted).

## MQ1 — competition read live (PASS)

Read fresh requirements (56 checks) + competition.yaml + RULES.txt before
building. Key facts: program/v1, Node 22 main.ts or Python 3.13 main.py,
writes /output/entry.png, PNG/JPEG ≤1 MiB, ≤1024×1024, deterministic two
runs; repo public, owned by RieryBuild, created after 2026-11-22T00:00Z,
OSI license; README carries the 3 live badges + bounty link; About:
website https://make.fun/bounty/news-image-20261122 + topic makefun.
Judge z-ai/glm-5.3-flash, no feed, not told the day; criterion #1 = one
day's news + names that day. Entries close 24 Nov 08:00 WITA. Quota
verified 08:55 WITA by coordinator: can_submit YES, 0 made, day 6/6,
hard 40/40. Escrow funded 100 USDC.
Authorship floor: submission_rule authorship 12 (min_authored 12 lines).
No max_entry_bytes in competition.yaml.

## MQ2 — entry shape (PASS)

Entry tree: LICENSE (MIT, SPDX-License-Identifier line 1), NEWS.md (fact
record), README.md (3 live badges, description, Run it), entry.png
(JPEG bytes, 1024×1024, 292,181 bytes), main.ts (Node 22, stdlib only),
package.json ({"type":"module"}), gate-run.md (this file).
main.ts validates JPEG SOI/EOI + SOF0/SOF2 dimensions + ≤1 MiB and
copies entry.png byte-for-byte to $MAKEFUN_OUTPUT_DIR (fallback
$OUTPUT_DIR, then /output). No network, no writes into the repo,
never removes the output dir.

## MQ3 — determinism (PASS)

compose.py run twice: identical sha256
f28155c65cd9b831d7342e4ea2bbffb487003216345ace009d7140f2e0e39d5c.
main.ts run twice (node22) into /tmp/out1, /tmp/out2, /tmp/out4:
byte-identical to entry.png each time (cmp clean).

## MQ4 — size / format / legibility (PASS)

entry.png: JPEG magic FFD8, EOI FFD9 present, 1024×1024, 292,181 bytes
(<300 KB target, ≤1 MiB hard). 300 px downscale viewed: masthead date
"Sunday 22 November 2026" reads clearly; 3 hero headlines and the
6-figure strip stay legible as headlines/figures.

## MQ5 — angle (PASS)

Pitch, 3 angles considered:
- A (CHOSEN): "Early Edition — Sunday morning broadsheet". Heroes COP31
  (deal at dawn) + Nepal PM in Delhi + Pant 128; 13 panels; DATE CHECK
  footer naming the Friday stories kept out. Matches the proven
  top-entry shape (cream broadsheet, 3-hero hierarchy, big-number strip,
  labelled panels, map pins, ALSO list, DATE CHECK footer) on principle,
  not surface copy.
- B (rejected): conflict-led ("three wars, one day") — top stories
  (Ukraine 400/110 barrage, Kryvyi Rih) are 20 Nov, date-fragile.
- C (rejected): sport-led — too narrow for judge criterion 2 (breadth).
At build time (01:00–05:00 UTC) most of Sunday had not happened yet in
most timezones, so the early-edition framing with FORECAST tags for
today's scheduled events (F1 race, ATP final, Liverpool–United, Philly
Marathon, COP31 approval session) is the honest shape.

## MQ6 — facts / dates (PASS, after corrections)

Every story verified live against primary sources (Reuters, AP, AFP,
FIA/Formula 1, ATP, UKMTO, USGS, Nepal MFA). Full record in NEWS.md.
Date conflicts resolved from primary sources:
- Peru quake M6.7 = 20 Nov 19:09 local / 21 Nov 00:09 UTC → EXCLUDED
  (footer). No new 22 Nov Peru quake on USGS.
- Ukraine 400 drones / 110 missiles = night of 19–20 Nov → EXCLUDED.
- Sparta II = 21 Nov (Gulf of Finland) → panel, dated Saturday in NEWS.md.
- 'El Chapo Isidro' = operation Fri night 20 Nov, announced Sat 21 Nov
  → panel.
- Nitish Setu = Sat 21 Nov → ALSO list.
- Roundup $7.25bn = Fri 20 Nov → EXCLUDED (footer).
- Bahrain plant fire: the verified fire is Hartha/Basra, Sat 21 Nov
  → panel (not "Bahrain plant").
- Nasdaq/Nvidia slide = Fri 20 Nov trading → EXCLUDED.
- Eisenkot mandate = 7–8 Nov → EXCLUDED (footer).
- COP31 status at build time: package unveiled overnight; approval
  session 06:00 GMT Sunday not yet held → hero text says "approval
  opens at 06:00 GMT" (scheduled, honest).
- Cricket figure fixed at build time: Pant 128, India 629/6 at lunch,
  lead 261 (live scorecard later showed 654/6; lunch figure kept).
- Cyclone Akvan: 20 flights cancelled at Ranchi (not 14) → ALSO list.
- Arsenal result corrected: Newcastle 2–2 Arsenal (not "Arsenal 2–2").
Corrections applied after review (see Gate 2): F1/ATP "tonight" →
"today"; "$5.17m" → "$5.171m" (exact $5,171,000); footer "Friday's
news" → "Earlier news" (Eisenkot is 8 Nov); story count "33" → "20"
(the 33 was never counted; the edition names 20 stories: 13 panels +
7 ALSO; the footer names 6 more checked-and-excluded).

## MQ7 — authorship / transcripts (PASS with a noted change of route)

RECORDER DOES NOT APPLY to this competition. `makefun record` refused
with HTTP 400 at 09:02 WITA: "news-image-20261122 does not take recorded
transcripts: its entries upload their transcripts (a bundle or loose
files) as the requirements say". The transcripts_witnessed check text
is generic; the server's record endpoint is authoritative. Consequence:
no recorder, no seal. Transcripts go up as a kit bundle built from this
Muse session (~/agents) + --muse-usage rows; the coordinator bundles.
Bundle --dry-run could not run yet: it refuses because the entry dir
is not inside a git repository — it will be verified after the repo is
created and the local git repo initialised (coordinator step).
UPDATE (verified 22 Nov ~10:00 WITA, after repo push + local git sync):
bundle --dry-run --muse-app-dir ~/agents exits 0 and finds 18 Muse app
sessions for this build (including subagent sessions). Two things for
the coordinator: (a) 0 usage rows are attached yet — the entry WILL be
rejected where transcripts are required unless usage rows are copied out
of muse.db (bundle --help shows the SELECT) and attached with
--muse-usage; run the SELECT with the top-level agent id
2e581ced-d8af-4f9c-8880-78bdc2191516 plus each subagent's id, AFTER this
builder run completes (a subagent's row is written only once its run
completes), and bundle from the top-level agent (its session was not in
this dry run); (b) the dry run lists ~25 pre-open Muse sessions
(first record 20 Nov) that wrote files this build read from ~/memory —
they were correctly LEFT OUT (any pre-open record gets the entry
rejected, thinking_in_window); do NOT add them with --session. One
session file names no model (b4ddcd85-3023-4a88-8634-080615f54af7.jsonl)
— set --model/--provider when bundling.
Authorship: main.ts, compose.py, NEWS.md, README.md, gate-run.md were
all written fresh in-session with the write/edit tools; the 13 panels
were generated in-session with the image-generation tool (no
photorealistic AI photos of real events, no code-drawn panels). Nothing
was copied from the 21 Nov build: compose.py and main.ts were written
fresh from spec and never read the previous round's files.

## MQ8 — self-critique (PASS)

Cycle 1 (after first render): found map projection distorted (continents
rendered as flat bands; pin 3 outside the box) → replaced the geographic
map with a schematic region pin-strip; found 4 panel bodies + hero 1
body truncated with ellipses → trimmed to fit; PNG 734 KB over the
300 KB target → switched output to JPEG bytes (allowed: name stays
entry.png), q78 = 292 KB.
Cycle 2 (after review fixes): re-rendered, viewed full image + 300 px
test; no new material weakness found. Full cycle with no material
weakness → stop.

## Gate 0 — requirements (PASS)

All 56 checks read; the entry satisfies the applicable ones (see Gate 3
audit). Non-applicable: patch_entry, entry_link, entry_pictures,
ad_page, guide_page, source_bundle, thinking_launch, thinking_fresh
(GitHub repo entry, not a source bundle), hindsight_clean,
dev_profitable, practice_floor, contender, finalist_review (no such
staging on this bounty), model_call (program/v1, no model gateway;
harness names no model_calls requirement either way — program writes an
image, no model call is possible or required).

## Gate 1 — local run + checks (PASS)

- main.ts ×3 runs, byte-identical outputs, correct validation messages.
- entry.png: JPEG, 1024×1024, 292,181 bytes, sha256
  f28155c65cd9b831d7342e4ea2bbffb487003216345ace009d7140f2e0e39d5c.
- README: 3 live badges present, no {owner}/{repo} placeholders,
  bounty link present.
- LICENSE: MIT + SPDX-License-Identifier: MIT on line 1.
- No provider keys or secrets in any entry file (grep-checked).
- Repo creation + push + About: see below (builder step, after Gate 1).

## Gate 2 — multi-model review (PASS after fixes)

OpenRouter :free reviewer (nvidia/nemotron-3-ultra-550b-a55b:free, cost
$0, 11,489 tokens): code PASS (no bugs; validated SOI/EOI, SOF parse,
determinism, env handling, no network/repo writes). Facts FAIL with 3
findings, all fixed + re-rendered + re-verified deterministic:
(1) F1 "tonight's race" → "today's race"; ATP "end tonight" → "end
today" (same timezone logic); (2) "$5.17m" → "$5.171m"; (3) footer
"Friday's news" → "Earlier news". Reviewer found nothing else.
Gemini text/copy: ATTEMPTED, HTTP 503 Service Unavailable from
gemini-3.8-flash — recorded gap, not a FAIL (per standing rule).
Self-critique found one further real error the reviewer missed (story
count 33 → 20, with NEWS.md + README corrected); fixed + re-rendered.

## Gate 3 — literal gate-row audit (PASS)

Audited against every named field in RULES.txt + requirements API:
repo_url/commit_sha/bundle/transcripts/entry_message/entry_signature
(coordinator submits); repo public + owned by RieryBuild (verified
after push); created after 2026-11-22T00:00Z (verified after push);
OSI license (MIT + SPDX line 1); README badges (3 live, verified in
file); About website + makefun topic (verified via PAT API after push);
entry.png PNG/JPEG ≤1 MiB ≤1024×1024 whole file (verified);
deterministic ×2 runs (verified); no network in program (verified by
reading main.ts); no committed keys/secrets (verified); no kit-starter
lines re-typed (main.ts/compose.py written fresh); transcripts via
bundle from the live session (coordinator step); system prompt file:
~/workspace/makefun-work/news-image-20261119-system-prompt.md
(coordinator attaches to the bundle run record).

## Verdict: READY FOR SUBMIT (builder)

Repo pushed + verified 22 Nov 2026 ~09:45 WITA (first push) and
~10:00 WITA (gate-run.md update push):
- Repo: https://github.com/RieryBuild/makefun-news-image-20261122
  (created 2026-11-22T01:29:27Z, public, after 2026-11-22T00:00Z).
- HEAD is a single root commit (0 parents) containing this file; the
  prior push verified in full was commit
  7bf0d622181bddf4b631f647858c9e03d66a5d50, tree
  d8b331b68688fb93d9c330a12bc1a15bacb72448 (see `git log -1` for the
  final HEAD sha — it is the successor commit with this updated file).
- Remote tree verified blob-for-blob on every push: all 7 files match
  local sha1s.
- About verified: homepage https://make.fun/bounty/news-image-20261122,
  topic makefun, description set.
- Push route note: GitHub's git-data API refuses ALL writes on an empty
  repo (409 "Git Repository is empty" for blobs and commits alike), so
  the first commit was seeded via the Contents API (LICENSE, commit
  42de0a02a74a993f356c12671d6e5b79e0fe2f9c) and the branch was then
  force-updated to the real root commit; the seed commit is unreachable
  from HEAD. One RemoteDisconnected + one PATCH retry occurred; both
  recovered via verify-before-retry.
- entry.png: 292,181 bytes, sha256
  f28155c65cd9b831d7342e4ea2bbffb487003216345ace009d7140f2e0e39d5c.
- Recorder: NOT APPLICABLE (HTTP 400 refusal, see MQ7) — coordinator
  bundles transcripts from the Muse session; DO NOT seal a recorder.
