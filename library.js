(() => {
  const grid = document.querySelector("#library-grid");
  if (!grid) return;

  const controls = {
    search: document.querySelector("#library-search"),
    topic: document.querySelector("#topic-filter"),
    audience: document.querySelector("#audience-filter"),
    type: document.querySelector("#type-filter"),
    status: document.querySelector("#status-filter")
  };
  const count = document.querySelector("#library-count");
  const error = document.querySelector("#library-error");
  const clear = document.querySelector("#clear-filters");
  let resources = [];

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  function render() {
    const query = controls.search.value.trim().toLowerCase();
    const visible = resources.filter(item => {
      const haystack = [item.title, item.summary, item.topic, item.type, ...(item.keywords || [])].join(" ").toLowerCase();
      return (!query || haystack.includes(query))
        && (!controls.topic.value || item.topic === controls.topic.value)
        && (!controls.audience.value || item.audiences.includes(controls.audience.value))
        && (!controls.type.value || item.type === controls.type.value)
        && (!controls.status.value || item.status === controls.status.value);
    });

    count.textContent = `${visible.length} of ${resources.length} resources shown`;
    if (!visible.length) {
      grid.innerHTML = '<div class="empty-state"><h2>No matching resources</h2><p>Clear one or more filters and try again.</p></div>';
      return;
    }

    grid.innerHTML = visible.map(item => {
      const available = item.status === "available";
      const action = available && item.href
        ? `<a class="resource-action" href="${escapeHTML(item.href)}">${item.type === "PDF" ? "Download PDF" : "Open resource"}<span aria-hidden="true"> →</span></a>`
        : '<span class="resource-action resource-action-disabled" aria-disabled="true">In development</span>';
      return `<article class="resource-card">
        <div class="resource-card-top"><span class="status ${available ? "status-available" : "status-coming"}">${available ? "Available" : "Coming soon"}</span><span class="resource-type">${escapeHTML(item.type)}</span></div>
        <h2>${escapeHTML(item.title)}</h2>
        <p>${escapeHTML(item.summary)}</p>
        <dl class="resource-meta"><div><dt>Topic</dt><dd>${escapeHTML(item.topic)}</dd></div><div><dt>Audience</dt><dd>${item.audiences.map(escapeHTML).join(", ")}</dd></div><div><dt>Reviewed</dt><dd>${escapeHTML(item.reviewed || "Pending")}</dd></div></dl>
        ${action}
      </article>`;
    }).join("");
  }

  fetch("data/library.json")
    .then(response => {
      if (!response.ok) throw new Error("Library request failed");
      return response.json();
    })
    .then(data => {
      resources = Array.isArray(data.resources) ? data.resources : [];
      const topics = [...new Set(resources.map(item => item.topic))].sort();
      controls.topic.insertAdjacentHTML("beforeend", topics.map(topic => `<option>${escapeHTML(topic)}</option>`).join(""));
      Object.values(controls).forEach(control => control.addEventListener("input", render));
      clear.addEventListener("click", () => {
        Object.values(controls).forEach(control => { control.value = ""; });
        controls.search.focus();
        render();
      });
      render();
    })
    .catch(() => {
      count.textContent = "Library unavailable";
      error.hidden = false;
    });
})();