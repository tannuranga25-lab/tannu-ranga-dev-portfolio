The Living Fieldbook — V5 (V4 + Nature & Updatable Resume)

Includes ALL V4 changes: achievements, uploaded certificate previews, leadership,
contact email, YouTube, linked proofs, and Open to Internships / Jobs / Collaborations.

ADDED IN V5:
- Hobby: Spending time in nature
- Download resume CTA in hero and contact footer
- View PDF fallback in contact footer
- Resume links use the same Google Drive file ID supplied by user

DOWNLOAD LINK BEHAVIOUR:
Google Drive can sometimes open a preview or confirmation instead of starting a direct
download. Visitors can then click Download. The View PDF fallback always opens the
Drive viewer subject to sharing permissions.

UPDATE RESUME WITHOUT EDITING PORTFOLIO:
1. Open the SAME resume file in Google Drive.
2. File information → Manage versions → Upload new version.
3. Select the updated PDF. Do NOT create a separate new Drive file or replace the ID.
4. Test both portfolio links in an incognito browser.
5. Share → General access → Anyone with the link → Viewer.
6. Make sure viewers are permitted to download.
7. Before making public, inspect your resume for any personal phone number or private data.

INSTALL: From ~/Desktop/Portfolio/tannu-portfolio
  cp src/App.tsx src/App.tsx.before-v5
  cp src/index.css src/index.css.before-v5
  unzip -o ~/Downloads/the-living-fieldbook-v5-nature-resume.zip -d .
  npm run build
  npm run lint
  npm run dev

Requires existing installed dependencies: motion, lucide-react, react-icons.
No new packages required.
