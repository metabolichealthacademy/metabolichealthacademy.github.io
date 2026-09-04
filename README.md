# The Metabolic Health Academy

Public, static educational website hosted on GitHub Pages at [themetabolichealthacademy.com](https://themetabolichealthacademy.com/).

## Architecture

- Semantic HTML pages
- Shared responsive design in `style.css`
- Small progressive-enhancement script in `site.js` for mobile navigation
- No user accounts, backend, database, or client-side secrets
- GitHub Pages hosting with the custom domain preserved in `CNAME`

## Content and trust

The site includes editorial, evidence, corrections, AI-use, sponsorship, privacy, terms, and medical-disclaimer pages. Dustin Beck is identified as an AI-generated presenter, not a real person or licensed healthcare professional.

## Local review

```bash
python -m http.server 8000
node scripts/validate-site.mjs
```

Open `http://localhost:8000`.

## Safety

Do not commit API keys, credentials, protected health information, or private medical records. Any future API or AI service must keep credentials server-side.
