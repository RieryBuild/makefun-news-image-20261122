# Gate run — news-image-20261122 round 5 (H7: "The day, hour by hour, field by field")

Build dir: `~/workspace/makefun-work/news-image-20261122-build-r5/`
Entry dir (working copy, NOT pushed): `~/workspace/makefun-work/news-image-20261122-entry/`
Repo: RieryBuild/makefun-news-image-20261122 (currently at r4 HEAD 01a5fac2).
Standing approval: Reza, 22 Nov 08:06 WITA, verbatim: "Ya, approve semua
git/build/test make.fun" — covers all make.fun git/build/test in
`~/workspace/makefun-work/` + this goal's hidden_files.

Final artifact: `entry.png` — JPEG 1024×1024, **280,022 bytes**,
sha256 `bdbcfe8abdeaf558c788884d8613b185992e196a1deeb4582fe1ecca7c6f4696`.
33 stories (13 panels + 20 ALSO). Strip: 258 / 186 / 44h / 11,613 / 720/9 /
98.79% (all positive figures, no "0" cell).

## STATUS — BUILD COMPLETE, NOT READY FOR SUBMIT (two blockers)

1. **Execution-risk flag (system, 23 Nov ~21:35 WITA).** A directory-listing
   exec result for the build/entry dirs failed an execution-risk check. Per
   that notice I stopped running, building, testing, copying, or git-ing the
   flagged files, and did not re-run compose.py / main.ts or copy anything
   into the entry repo after the flag. The final determinism re-run, the
   copy of this gate-run.md into the entry dir, and the local kit check
   therefore need the user's plain-words go-ahead before proceeding. The
   standing make.fun approval covers git/build/test generally; it does not
   by itself clear a flagged-content exception. All numbers in this file
   were established before the flag (or read afterwards by plain file
   viewing, which the notice allows) and are unchanged since.
2. **Bundle / kit check is the coordinator's job.** The bundle dry-run
   fails at the prompt step: `--prompt-origin handed-off` (and `other`)
   require `--prompt-file` with the person's own words, and round 5 was
   started by the coordinator's own initiative — no Reza message ordering
   r5 exists in the main or Make.fun chats (checked 23 Nov ~21:30 WITA),
   so there is no verbatim Reza prompt to file; fabricating one would
   falsify the run record. The coordinator owns the prompt decision.
   Separately, `muse.db` shows 0 usage rows for this subagent session
   (rows flush only when the turn's messages are delivered), so a
   builder-side bundle would hit the same HTTP 422 `thinking_priced`
   failure the site gave hidden-spec-cli r2 for 0 usage rows. r4
   precedent: coordinator bundles at the end. Bundle attempts logged in
   `bundle-dryrun.log`, `bundle-dryrun2.log`, `bundle-dryrun3.log`
   (dry-run 3: exit 1, prompt-file refusal, 16 s).

`main.ts` sha256 (read from the pre-flag listing; coordinator to re-verify
at commit): `ae588e9bbbb8f1c896580573726986f34cd784ce1e699b8ebbe228c03864975a`.

## MQ1 — Competition read live
PASS. Competition `news-image-20261122`, "Sum up 22 November's world news in
one image", harness program/v1, status open. Entries close
2026-11-24T00:10:00Z per the fresh req file (08:10 WITA; the task brief
says 08:00 WITA — the earlier of the two governs; hard abort ~07:00 WITA
24 Nov). Gate: image ≤1 MiB, ≤1024×1024, whole JPEG/PNG; program runs
twice, same bytes; no network. Judge: z-ai/glm-5.3-flash, pairwise, NOT
told which day; criterion #1 = one day's news + names that day. Top 50
share $100 ($20/$12/$6/$2/$1.20). r4 ranked #4,736 (judge 0.969381).

## MQ2 — Entry shape
PASS. Repo root carries `main.ts` (Node 22, stdlib only), `entry.png`,
`NEWS.md`, `gate-run.md` (this file — in the build dir; copy into the entry
dir is BLOCKED, see Status), `LICENSE` (already in repo), `package.json`
(`"type": "module"`, `"main": "main.ts"` — already in repo, untouched).
`main.ts` reads `./entry.png` (the image the repository holds — the kit's
own documented simplest program), validates the JPEG structure, writes the
same bytes to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`).
No network, no dependencies. `README.md` left as-is per coordinator
decision from r3. Nothing pushed; coordinator handles the PAT commit.

## MQ3 — Determinism
PASS (2× byte-identical, both stages — verified BEFORE the execution-risk
flag; NOT re-run after it).
- `compose.py`: ran twice → identical sha256
  `bdbcfe8abdeaf558c788884d8613b185992e196a1deeb4582fe1ecca7c6f4696`.
  Fixed fonts (DejaVu), fixed layout, no timestamps/randomness in the image
  (only the static "Wires read up to 13:00 UTC, 23 Nov 2026" line).
- `main.ts`: ran twice (different output dirs) → identical bytes, same
  sha256 as `entry.png`.
- After the last Gate 1 fix (wrap() `if piece:` guard), compose.py was
  re-rendered twice byte-identical and the sha was UNCHANGED
  (bdbcfe8a…, 280,022 B).

## MQ4 — Size / format / legibility
PASS.
- Format: JPEG (SOI `FF D8` … EOI `FF D9`), 1024×1024, validated by
  `main.ts` (segment walk, SOF0 8-bit 1024×1024, scan-data marker rules,
  trailing-bytes rejection).
- Size: 280,022 bytes — under the 300 KB target and well under the 1 MiB
  cap. (Tie-break advantage: on an exact rate tie the smaller file wins.)
- 300px legibility test: PASS — downscaled to 300×300, the masthead date
  "SUNDAY 22 NOVEMBER 2026", the timeline times, and all three hero
  headlines read clearly. Verified by viewing the 300px render
  (`check-300.png`).

## MQ5 — Angle (H7)
PASS. Genuinely new axis vs r4 (H6 hero-choice) and r3 (count lever):
(1) lead device is THE DAY IN UTC — an 8-beat timeline spine (~04:46
Bahrain radar claim · ~05:30 Verstappen · ~06:00 186-drone tally · ~12:00
Seoul minister · 13:45 Márquez · ~16:00 COP31 NO DEAL · ~18:00 Democrats
258 · ~20:43 Alcaraz), replacing the deck line as primary orientation;
(2) organisation by FIELD — a 12-field bar (War, Climate, Politics,
Sport, Markets, Tech, Health, Faith, Energy, Courts, Space, Diplomacy)
replaces region bars, every panel carries a field tag; (3) story-pool
refresh to 33 stories. No layout or copy was taken from r1–r4 (their
compose.py / main.ts / NEWS.md / entry.png were never read for retyping;
r4's gate-run.md was read only for pipeline/tooling facts).

## MQ6 — Facts / dates
PASS. All 33 stories verified independently this session from primary
sources, with first-report dates in NEWS.md (AP, Reuters, AFP, CNN, WHO,
UN News, UKMTO, info.gov.hk, ESPNcricinfo, FIA, ATP, MotoGP.com, Lowy
Institute, KCNA, Yonhap). Day rule = happened OR first reported on
Sunday 22 Nov 2026 in any timezone. Verified fresh this session:
Democrats 258 (AP: Foxx concedes NC-5 to Hubbard, 330-vote lead, 258 as
of Sunday, 4 races open; CNN later says 259 — AP's as-of-Sunday figure
used); Merkury sunk in Benghazi early Sunday (sea drones blamed,
capsized, Ka-27 destroyed); Ebola Ituri (WHO Sunday: team trapped 24h+
in maternity ward; 11,613 cases / 5,678 deaths as of 17 Nov); Seoul
minister Choi Kyo-jin resigns Sunday (111 device-misconduct cases);
Netanyahu–Eisenkot talks fail Sunday (48 seats, 13 short); Márquez 8th
MotoGP title, P8, Bezzecchi wins Portuguese GP (race ends ~13:45 UTC);
Lowy Index published 22 Nov (US 78.9 vs China 73.6, gap 5.3, narrowest
since 2018); Kim "neither supremacy nor expansion" (ceremony Sunday
22 Nov, KCNA reported 23 Nov); 49ers beat Vikings 35–10 in Mexico City
(Sunday night local, ends after midnight UTC — counts via event
timezone); Colombia asks X to suspend Petro's account (request sent
Sunday, published 21:36 UTC 22 Nov); Khartoum drones early Sunday (5
children killed, UN building damaged); Niger State reprisals (Nigeria,
NOT Niger country: ≥35 Fulani killed in Wawa, AFP Sunday); Idlib
landmine (5 children aged 8–15, Umm Khuzaym, Sunday); Vyshneve drone
hits grocery store Sunday (3 killed, 15 hurt); Zelenskyy Sunday Telegram
Patriot plea; Hormuz attacks highest since war began (CNN 22 Nov,
UKMTO: 30+ Oct, 22 in Nov as of Sunday). Verified core (r4-verified,
trusted): COP31 no deal (44h overtime, longest COP, first no-deal since
Copenhagen 2009, $120bn annual adaptation target dropped, no fossil
fuels named); Russia 186 drones overnight, 161 downed/jammed, Dymer
block collapse (72 jet-powered, 14 may be trapped); Bahrain radar claim
(first reported Sun 04:46 UTC), Bahrain denies, no casualties; Sparta II
still burning Sunday (hit Sat by two drones, 16 crew safe); Hong Kong
Election Committee vote 98.79% final turnout (5,640 of 5,709 voters, 723
seats, 856 candidates); India declare 720/9 (highest Test total in NZ);
Verstappen wins Las Vegas GP 1:27:39.624; Alcaraz beats Zverev 6–2,
7–6(7), first ATP Finals title, $5.171m; Pope Leo XIV lunch for ~1,300
poor guests; Liverpool 4–0 United; Wembanyama 50 points. "Shah flies to
Delhi" was DROPPED (identity unclear, unverified) and replaced with
"BAHRAIN: Strike hits industrial site; two hurt" (Sitra refinery-area
fire, 2 hurt, verified). DATE CHECK footer lists 10 exclusions
(400-drone barrage 19–20 Nov, Peru quake 20 Nov, El Chapo, BepiColombo,
Nvidia SEC probe, Bayelsa boat, Gaza aid-van strike, EU–Indonesia deal,
Estonia border, Qeshm MQ-9 claim) + "Wires read up to 13:00 UTC,
23 Nov 2026" honesty line. Borderline calls documented in NEWS.md
(Merkury Monday confirmation vs Sunday strike; Kim ceremony Sunday /
KCNA Monday; 49ers after-midnight UTC; Lowy published 22 Nov; Ebola
totals dated 17 Nov, cited as outbreak total behind Sunday's story).

## MQ7 — Authorship / transcripts
PASS (builder side; coordinator bundles at the end).
- `compose.py` (17,991 B) and `main.ts` (4,037 B) written fresh in-session,
  revised in-session across multiple assistant messages (compose.py: fresh
  write + overflow trims + timeline/map fixes + Gate 1 fixes; main.ts:
  fresh write + scan-walk fix + destination verification). thinking_revised
  (≥2 messages) satisfied for both files.
- 13 panels generated in-session by the image model in flat illustration
  style (files in `panels/`, one .webp per panel + generation receipts);
  no photorealistic AI photos of real events; nothing code-drawn as a
  panel substitute.
- r1–r4 `compose.py` / `main.ts` / `NEWS.md` / `entry.png` were NOT read
  for retyping (task instruction); r4's gate-run.md was read only for
  pipeline/tooling facts.
- `makefun record` NOT run (returns HTTP 400 for this competition);
  transcripts upload as a bundle from live sessions; builder session file
  kept intact, nothing deleted.
- Bundle status: BLOCKED at the prompt step (see Status) — coordinator
  scope; session file
  `~/agents/agent-ff1a0c7c-9d54-4db4-ad0c-32548553cc29/sessions/ff1a0c7c-9d54-4db4-ad0c-32548553cc29.jsonl`
  (1.17 MB, live); parent session
  `~/agents/agent-baca7b0e-0440-424c-8c80-65fcab2fd15b/sessions/baca7b0e-0440-424c-8c80-65fcab2fd15b.jsonl`.

## MQ8 — Self-critique
Four measured cycles in-session:
1. Grid body overflow (Merkury 4 lines) → trimmed 6 grid bodies.
2. Timeline time overlapped header text → moved header/times/spine/
   labels, shortened header; map pins 1/3 overlapped → leader-line badge
   offsets, then pin-1 offset changed to (-12,4) so the Ituri dot is not
   hidden (pin positions numerically verified against rendered pixels).
3. Timeline small at 300px → times 12→14pt, labels 9→10pt.
4. Gate 1 fixes (see Gate 2): wrap() ellipsis + guard, main.ts scan
   walk, destination verification, font() caching.
   Final: 280,022 B, final footer y=1013, 300px PASS, determinism
   re-verified (pre-flag).

## Gate 0 — Requirements
PASS. Entry satisfies the competition gate: JPEG ≤1 MiB, 1024×1024,
whole file (validated end marker), program runs twice with identical
bytes, no network. 33 stories, all 22 Nov 2026 (any timezone). No
provider API key or secret in the entry files. No entry fee
(requirements `entry_fee` is null). Escrow funded (status open, $100 =
100,000,000 base units, USDC, in the fresh req file; coordinator verifies
at submit).

## Gate 1 — Local run + checks
PASS (pre-flag).
- `python3 compose.py` → rendered, final y=1013, no overflow, no overlap
  (visually verified full-size + 300px + crops: top band, bottom band,
  heroes, map pins).
- `node main.ts` ×2 → identical bytes, sha256 matches `entry.png`.
- JPEG validated by `main.ts` on every run (SOI/EOI/SOF0/scan rules);
  negative tests passed (truncated file, trailing bytes, non-JPEG all
  rejected; good file passes).
- Panel audit: all 13 panels generated in-session, flat illustration,
  on-topic, no baked-in text, no photographs.

## Gate 2 — Multi-model review (OpenRouter :free, $0)
Free list re-checked via GET /models 23 Nov: 12 free models incl.
nvidia/nemotron-3-ultra-550b-a55b:free and nvidia/nemotron-3.5-super-vl:free.
Driver: `gate1_review.py` (round 1) and `gate1_review2.py` (round 2).
Gemini: still HTTP 503 on gemini-3.8-flash (tested 23 Nov via the Gemini
helper, "Reply with exactly the word OK" — 503 Service Unavailable).
Skipped per task; record as GAP, not a Gate 1 FAIL. gemini-2.5-flash is
retired (404).

Round 1 text (nemotron-3-ultra, 21,761 tokens, $0) — verdict PASS WITH
MINOR FIXES. 37 findings: findings 9–37 (all "BLOCKER — fabricated")
are REFUTED as a class — the reviewer has a 2024 knowledge cutoff and
judged every Nov 2026 story against 2024 knowledge; every story was
verified live this session from primary sources dated 22–23 Nov 2026.
Real findings fixed: (1) wrap() single-char edge — fixed with ellipsis
substitution + guard; (2) asserts crash on legitimate text — NOT
REPRODUCED (all asserts pass on measured content; fail-loud is intended,
r3/r4 precedent); (3) load_panel exact-match — intended fail-loud, no
change; (4) map pin comment — accurate as written, no change; (5+6)
main.ts EOI/scan-data walk — REAL, fixed with proper scan walk; (7)
statSync race check — replaced with destination verification; (8) font()
caching — applied.

Round 1 image (nemotron-3.5-super-vl, 9,140 tokens, $0) — verdict PASS
WITH MINOR FIXES. 3 findings: (1) "Dyrer" typo — NOT REPRODUCED (source
string is "Dymer", drawn verbatim; OCR misread); (2) "Alcaraz win" — NOT
REPRODUCED (source string is "wins"; OCR misread); (3) timeline times
small at 300px — REAL, fixed (times 14pt, labels 10pt). Verified:
masthead date, 8 beats, 12 field chips, map pins/dots geographically
plausible, flat illustration, no baked-in text, hero headlines legible.

Round 2 focused re-review (nemotron-3-ultra) — verdict PASS WITH MINOR
FIXES. 1 MINOR finding: wrap() char-split loop can append empty lines —
FIXED (`if piece:` guard). Verified: main.ts scan walk correct/complete;
font cache correct; timeline layout no collision (labels y≈110–128,
fields bar y=140); "Dymer"/"wins" OCR misreads plausible, render cannot
show misread forms. After this fix, compose.py re-rendered twice
byte-identical, sha UNCHANGED (bdbcfe8a…, 280,022 B).

No Gate 1 finding remains unadjudicated. No third full re-review was run:
the remaining items were OCR misreads refuted by direct source reads, and
the one real item (timeline size) was fixed and re-verified.

## Gate 3 — Literal gate-row audit (req file, 56 checks)
Audited against
`req-news-image-20261122-fresh.json` (56 checks; `strict_transcripts`
ABSENT from the req file — the task's "verify strict_transcripts" item is
therefore N/A for this competition; transcripts upload as a bundle from
live sessions per the task brief, recorder N/A, HTTP 400).
Builder-relevant rows:
- competition_open / quota / form / entry_signature / repo_owner /
  repo_public / license_osi / repo_created_after_open / commit_in_repo:
  COORDINATOR scope (submit-time; repo is public, LICENSE present,
  created after open, coordinator holds the PAT commit + 6do8 wallet).
  Builder verified the entry dir is the r4 working copy (HEAD 01a5fac2)
  and did NOT push.
- duplicate_snapshot: PASS — all files are new in-session work (H7
  hierarchy, new panels, fresh code); entry.png bytes differ from r4
  (bdbcfe8a… vs r4 ee849966…).
- source_bundle: COORDINATOR scope (bundle blocked — see Status).
- entry_size: PASS — entry.png 280,022 B ≤ 1 MiB; main.ts 4,037 B;
  tree well under any cap.
- committed_provider_key / committed_secret: PASS — no keys or secrets
  in any entry file (only code + image + docs; no credentials anywhere
  in the build).
- security_audit: PASS — stdlib only, no network, no shell, no eval, no
  dynamic code; reads one local file, writes one local file.
- transcripts_present / recorded / wellformed / in_window / committed /
  reproduces / turns / priced / revised / fresh / own_work:
  COORDINATOR scope at bundle time, but builder-side evidence: session
  started after the competition opened (23 Nov, in-window); compose.py +
  main.ts + NEWS.md all authored in-session across ≥2 revised assistant
  messages (thinking_revised ✓); ≥30% authored share achievable because
  every counted line is agent-written (copy architecture, no embedded
  base64); panels generated in-session, not downloaded; no r1–r4 files
  read or copied (thinking_own_work ✓). BLOCKER: bundle needs the
  coordinator's prompt decision + usage rows (see Status); thinking_priced
  would fail builder-side (0 usage rows for this subagent session).
- run_completes / run_deterministic: PASS (pre-flag) — main.ts runs in
  <1 s, twice, byte-identical, no network, stdlib only (Node 22 with
  type-stripping for erasable TS — main.ts uses only erasable syntax).
- hindsight_clean / distinct_entrant / model_call / dev_profitable /
  practice_floor / contender / finalist_review / disqualified / claim_*:
  not applicable at build time (grading/claim phases; coordinator +
  submitter).
- entry_link / entry_pictures / ad_page / guide_page / repo_readme /
  repo_about / sponsor_self_entry / reward_locked: PASS or N/A as in r4
  (image entry, no link/ad/guide page required; README present in repo;
  no sponsor self-entry; escrow funded per req file).
- transcripts_witnessed / transcripts_run_record: COORDINATOR scope at
  bundle time (see Status).

## Verdict: BUILD COMPLETE — NOT READY FOR SUBMIT
All builder-side gates pass (MQ1–MQ8, Gates 0–2, Gate 3 builder rows).
Two blockers before READY, both coordinator/user scope:
(1) the execution-risk flag needs the user's plain-words go-ahead before
the final determinism re-run, the gate-run.md copy into the entry dir,
and the local kit check are performed; (2) the bundle needs the
coordinator's prompt decision (no verbatim Reza r5 prompt exists to file)
and its own usage rows (builder session has 0). Coordinator next after
go-ahead: re-run determinism (compose.py 2×, main.ts 2×), copy this
gate-run.md into the entry dir, bundle transcripts, run kit check, verify,
commit via PAT, submit with --keypair (wallet 6do8 only). Entries close
24 Nov 08:00–08:10 WITA; hard abort ~07:00 WITA 24 Nov; r4 stands if
r5 does not clear.

---

# FIX ROUND — 24 Nov ~05:45–06:30 WITA (coordinator 33ccf631; Reza go-ahead 05:43 WITA)

Reza's plain-words go-ahead (verbatim, 24 Nov 05:43 WITA): "Yang kemarin
pending ngga ke acc gas lagi ya" — this IS the authorization for the
compose.py re-render that the execution-risk flag blocked on 23 Nov. The
fix round below runs under that go-ahead + the standing approval (22 Nov
08:06: "Ya, approve semua git/build/test make.fun").

## The fix (MQ6 FAIL → fixed)
- compose.py BEATS: Seoul "~12:00" → "~02:30"; COP31 "~16:00" →
  "~13:55"; Alcaraz "~20:43" → "~19:15". List re-sorted chronologically:
  ~02:30 Seoul · ~04:46 Bahrain · ~05:30 Verstappen · ~06:00 drones ·
  13:45 Márquez · ~13:55 COP31 · ~18:00 Democrats · ~19:15 Alcaraz.
  Label texts unchanged; all times same character length — layout
  unaffected (asserts pass, footer y unchanged at 1013).
- NEWS.md: Angle paragraph first/last beats corrected (Seoul ~02:30 →
  Alcaraz ~19:15); "Timeline times" section rewritten in chronological
  order with corrected sources (Seoul disclosed ~11:30 KST, Seoul Daily;
  COP31 final plenary ~13:55, Earth Negotiations Bulletin; Alcaraz match
  began 18:10 CET, lasted 2h01m) + an MQ6-lesson note.
- gate1_review.py driver prompt beats updated to the corrected times
  (review tool only, not an entry file).
- Old times verified ABSENT from all entry files (grep across build dir:
  only gate-run.md + gate1-image.json + gate1_review.py history remain,
  and the driver was updated; gate-run.md's refs are the bug record).
- Times basis: the r5 coordinator's primary-source verification (state
  file §R5: Seoul Daily, Earth Negotiations Bulletin, tennisuptodate /
  sportsleo), carried in the parent's fix brief. My own independent
  web re-check was BLOCKED by a browser_search tool failure (3/3
  queries failed at the tool layer, 24 Nov ~05:50 — not a source
  contradiction; the tool notice forbids retrying). Recorded honestly:
  the fix values rest on the coordinator's cited primary sources, not
  on a fresh re-read by this coordinator.

## Re-render + determinism (AUTHORIZED re-render)
- `python3 compose.py` ×2 → byte-identical both runs. New entry.png:
  JPEG 1024×1024, **279,980 B** (was 280,022 B), sha256
  `016e7da0a6f533d84ead8f64c3f0c2e287228fbea74ef95f03273dfb1dd9bfe2`.
  Final footer y=1013 (unchanged). Old render kept as entry-pre-fix.png
  (build dir only, not an entry file).
- `main.ts` (node22) ×2 into out1-fix / out2-fix → both byte-identical
  to the new entry.png (sha 016e7da0…). run_deterministic PASS.
- Image verification (coordinator viewed the render directly):
  top-band crop (check-top-fix.png) reads all 8 beats in correct
  chronological order with the 3 corrected times visible; no overlap,
  labels clean. 300px re-check (check-300.png): masthead date + 3 hero
  headlines + strip figures read — PASS (same as pre-fix).

## Gate re-run from MQ1 (fix round)
- MQ1 requirements: PASS (re-fetched context: entries close 24 Nov
  08:00–08:10 WITA; hard abort ~07:00). MQ2 prizelist bar: PASS as
  evidence (gap to #50 ≈ 13,900 LB pts — prize path unlikely even
  fixed; Reza said gas anyway; gate passes on evidence, not a promised
  rank). MQ3 quota: PASS — re-verified 24 Nov ~05:45 via the
  competition's own endpoint: can_submit TRUE, 4 made/4 kept, day 4
  left, hard 36 left. MQ4 wallet/repo: PASS (6do8 only; PAT route).
  MQ5 supersede: PASS (deliberate supersede of r4 #3,086–#3,504,
  outside prizelist; rebuild-once respected; not a duplicate).
  MQ6 facts: PASS (3 timeline times corrected + verified on the image;
  all other stories unchanged from the pre-fix verified set).
  MQ7 never-submit: PASS. MQ8 session/transcript: PASS (fix authored
  in this coordinator session; original builder + coordinator sessions
  intact for the bundle).
- Gates 0–3: Gate 0 PASS (repo files present, tests pass on the new
  render). Gate 1: see below. Gate 2 PASS (not a duplicate, Force_Last
  intended, quota re-checked). Gate 3: literal audit re-run below.

## Gate 1 — focused re-review (fix round)
Driver: gate1_review_fix.py, 24 Nov ~06:0x WITA. Both models :free, cost $0.
Free list re-checked before launch (441 models, 12 :free; both nemotron
models available).

Review 1 — text (nemotron-3-ultra-550b-a55b:free, 7,817 tokens):
PASS WITH MINOR FIXES. 2 findings, both fixed in NEWS.md (text-only;
NEWS.md is not rendered, so no re-render needed).
  1. MINOR — Alcaraz arithmetic: 18:10 CET + 2h01m = 19:11 UTC, not
     ~19:15. ADJUDICATION: the beat ~19:15 is supported by primary-source
     END times (tennisuptodate live blog 20:17 CET = 19:17 UTC;
     sportsleo "concluded 22:16:51 EAT" = 19:16 UTC); the start+duration
     parenthetical created the inconsistency. FIX: NEWS.md parenthetical
     now cites the end-time sources directly ("won ~19:15 UTC;
     tennisuptodate live blog 20:17 CET; sportsleo concluded 22:16:51
     EAT = 19:16 UTC"). Beat unchanged at ~19:15.
  2. NIT — COP31 source timezone not clarified (ENB reports local time).
     FIX: annotated "~13:55 UTC (16:55 TRT)".
  VERIFIED by the reviewer: chronology strictly increasing; NEWS.md
  timeline matches compose.py BEATS exactly; Seoul ~02:30 UTC = ~11:30
  KST correct; Angle paragraph first/last beats match; no regressions.
Review 2 — image (nemotron-3.5-super-vl:free, 8,203 tokens): PASS.
  All 8 beats read correctly left to right, no overlaps/cutoffs/
  unreadable text; masthead + 3 hero headlines legible. The VL model
  misread "fired" as "freed" (beat 4) and "Dymer" as "Dyrer" (hero) —
  the KNOWN OCR misreads from round 1; source strings verified by
  direct read; non-material.
VERDICT: Gate 1 PASS. No re-review needed: both fixes are NEWS.md
documentation-only and the image was PASSed as rendered.

## Gate 3 — literal gate-row audit, fix round (56 checks)
Re-audited against the fresh req file (req-news-image-20261122-r5-fresh.json,
56 checks; strict_transcripts ABSENT — bundle route). Changed rows vs the
pre-fix audit: entry.png bytes + sha (new render, 279,980 B ≤ 1 MiB);
NEWS.md timeline section (corrected times + sources); compose.py BEATS
(corrected + re-sorted). All other rows unchanged from the pre-fix audit
(all PASS or coordinator/submit-time scope). entry_size PASS (279,980 B).
duplicate_snapshot PASS (new bytes, differ from r4 ee849966… and from the
pre-fix render bdbcfe8a…). run_completes / run_deterministic PASS
(main.ts 2× byte-identical on the new render). transcripts_*:
COORDINATOR/PARENT scope at bundle time (parent bundles: original
builder ff1a0c7c-9d54-4db4-ad0c-32548553cc29 + original coordinator
baca7b0e-0440-424c-8c80-65fcab2fd15b + this fix coordinator
33ccf631-7486-4e17-a615-3f4c455fd901; session files verified present).

## Local kit check — fix round (bundle --dry-run, 24 Nov ~06:03 WITA)
Kit: level-34 news-22 kit (cli/makefun.mjs). Repo: fresh clone at commit
959cba9d (entry.png sha 016e7da0… verified in the clone). Sessions: the 3
named above + parent 2e581ced auto-discovered via family (--no-family
leaves it out; parent's text-bounty precedent is --no-family).
Prompt-file + --prompt-origin other + --system-prompt supplied.
RESULT: bundle assembles cleanly; NO new failures from the fix.
Expected bundle-time items for the parent's bundle step (all resolve there):
- 0 usage rows attached (thinking_priced) — parent runs the usage SELECT
  and bundles with --muse-usage.
- Run record: MCP servers (--mcp none) + agent facts (--provider,
  --effort) to be declared by the parent.
- Parent session: included by family discovery; parent decides --no-family
  (their precedent) or include.
Warnings only: builder session taken whole (worked in the build dir, not
the repo — same as r1–r4); parent session's pre-opening records excluded
by the kit (thinking_in_window safe); 57 outside dirs read, 32 searched.
Dry run wrote nothing. Kit check: PASS.
