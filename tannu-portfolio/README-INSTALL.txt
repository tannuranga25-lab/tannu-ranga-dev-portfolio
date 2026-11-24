THE LIVING FIELDBOOK — V7 (natural cursor + ranking evidence)

CHANGES
- Softer, smaller cursor halo: native pointer stays visible, no giant circle or labels.
- Catalyst copy: individual entry, Position 100 in the Code Analysis ranking, 93.14 marks.
- Authentic cropped proof of Tannu Ranga's ranking row (source: user-provided PDF page 5).
- Existing Top 150 hackathon certificate stays available via its own link.
- No other participants' ranking data included.
- V6 projects, experience, contact, nature hobby, resume and achievements preserved.

INSTALL
1. Download ZIP into ~/Downloads.
2. cd ~/Desktop/Portfolio/tannu-portfolio
3. cp src/App.tsx src/App.tsx.before-v7
4. cp src/index.css src/index.css.before-v7
5. unzip -o ~/Downloads/the-living-fieldbook-v7-natural-cursor.zip -d .
6. npm run build && npm run lint
7. npm run dev

GITHUB & VERCEL (ONLY after local checks pass)
 git add src/App.tsx src/index.css public/achievements/catalyst-code-analysis-rank-100.webp
 git commit -m "refine: soften cursor and document Catalyst Code Analysis ranking"
 git push

Accuracy note: ranking source titled "Latest Code Analysis - Ranking"
shows Tannu Ranga at position 100 with marks 93.14; the
separate achievement certificate says Top 150 in Catalyst.
