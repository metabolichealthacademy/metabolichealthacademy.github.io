// Simple To-do app using localStorage
// Storage key used for persistence
const STORAGE_KEY = 'mha_todos_v1';

// DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const countEl = document.getElementById('count');
const clearBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search');
const exportBtn = document.getElementById('export-json');
const importBtn = document.getElementById('import-json');
const importFile = document.getElementById('import-file');

let todos = [];
let filter = 'all';
let searchTerm = '';

// Load from localStorage
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse todos from localStorage', e);
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function addTodo(text) {
  const t = {
    id: uid(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now()
  };
  if (!t.text) return;
  todos.unshift(t);
  saveTodos();
  render();
}

function updateTodo(id, patch) {
  const idx = todos.findIndex(x => x.id === id);
  if (idx === -1) return;
  todos[idx] = {...todos[idx], ...patch};
  saveTodos();
  render();
}

function removeTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
}

function exportJSON() {
  const dataStr = JSON.stringify(todos, null, 2);
  const blob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mha-todos.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importJSONFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        // Basic validation of items shape
        const cleaned = data.map(d => ({
          id: d.id || uid(),
          text: String(d.text || '').trim(),
          completed: !!d.completed,
          createdAt: d.createdAt || Date.now()
        })).filter(d => d.text);
        todos = cleaned.concat(todos);
        saveTodos();
        render();
        alert('Imported ' + cleaned.length + ' items');
      } else {
        alert('Invalid JSON format: expected an array');
      }
    } catch (err) {
      alert('Failed to import JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function filteredTodos() {
  let out = todos.slice();
  if (filter === 'active') out = out.filter(t => !t.completed);
  if (filter === 'completed') out = out.filter(t => t.completed);
  if (searchTerm) {
    const s = searchTerm.toLowerCase();
    out = out.filter(t => t.text.toLowerCase().includes(s));
  }
  return out;
}

function render() {
  list.innerHTML = '';
  const items = filteredTodos();
  countEl.textContent = items.length;

  if (!items.length) {
    list.innerHTML = '<li class="text-gray-500">No items</li>';
    return;
  }

  for (const t of items) {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-3 p-2 border rounded';
    li.dataset.id = t.id;

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!t.completed;
    cb.className = 'w-4 h-4';
    cb.setAttribute('aria-label', 'Mark complete');

    const label = document.createElement('div');
    label.className = 'flex-1';
    const text = document.createElement('div');
    text.textContent = t.text;
    text.className = t.completed ? 'line-through text-gray-500' : '';
    text.setAttribute('tabindex', '0');
    text.setAttribute('role', 'textbox');
    text.setAttribute('aria-label', 'Todo text');

    const editBtn = document.createElement('button');
    editBtn.className = 'text-sm text-indigo-600 hover:underline';
    editBtn.textContent = 'Edit';

    const delBtn = document.createElement('button');
    delBtn.className = 'text-sm text-red-600 hover:underline';
    delBtn.textContent = 'Delete';

    label.appendChild(text);
    li.appendChild(cb);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    // Events
    cb.addEventListener('change', () => updateTodo(t.id, {completed: cb.checked}));

    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit task', t.text);
      if (newText === null) return;
      const trimmed = String(newText).trim();
      if (!trimmed) { alert('Task cannot be empty'); return; }
      updateTodo(t.id, {text: trimmed});
    });

    delBtn.addEventListener('click', () => {
      if (confirm('Delete this task?')) removeTodo(t.id);
    });

    list.appendChild(li);
  }
}

// Handlers
form.addEventListener('submit', e => {
  e.preventDefault();
  const v = input.value;
  if (!v.trim()) return;
  addTodo(v);
  input.value = '';
  input.focus();
});

clearBtn.addEventListener('click', () => {
  if (confirm('Remove all completed items?')) clearCompleted();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('bg-gray-100'));
    btn.classList.add('bg-gray-100');
    filter = btn.dataset.filter;
    render();
  });
});

searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value;
  render();
});

exportBtn.addEventListener('click', exportJSON);
importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', e => {
  const f = e.target.files && e.target.files[0];
  if (f) importJSONFile(f);
  importFile.value = '';
});

// Init
loadTodos();
render();
