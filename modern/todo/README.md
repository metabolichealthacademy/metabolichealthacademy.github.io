# To‑do Demo (localStorage)

This is a small client-side to-do list demo added under modern/todo. It stores items in the browser's localStorage and supports:

- Add / edit / delete tasks
- Mark complete / uncomplete
- Filters: All / Active / Completed
- Search
- Export (JSON) and Import (JSON)

Files added:
- modern/todo/index.html — the demo page (Tailwind CDN)
- assets/js/todo.js — application logic (localStorage)

How to view
1. Browse to: https://github.com/metabolichealthacademy/metabolichealthacademy.github.io/blob/modernize/tailwind-videos/modern/todo/index.html
2. To preview locally, open modern/todo/index.html in your browser (no server required), or push to GitHub Pages / Netlify and preview the branch.

Notes
- Data remains only in the browser where the app was used. Use Export / Import to transfer between devices.
- This is intentionally lightweight and client-only. If you want a persistent server-backed todo (for multiple users), I can scaffold a Supabase-backed version next.
