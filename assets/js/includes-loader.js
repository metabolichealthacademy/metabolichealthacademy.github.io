(() => {
  async function loadInclude(id, url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const html = await res.text();
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    } catch (e) { console.error('Include load error', e); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    loadInclude('site-header', '/includes/header.html');
    loadInclude('site-footer', '/includes/footer.html');
  });
})();
