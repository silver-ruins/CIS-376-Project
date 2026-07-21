console.log('main.js loaded');

const entryForm = document.getElementById('entryForm');
const projectCards = document.getElementById('projectCards');
const searchInput = document.getElementById('searchInput');
const tagFilter = document.getElementById('tagFilter');
const sortSelect = document.getElementById('sortSelect');
const saveStatus = document.getElementById('saveStatus');
const saveGistBtn = document.getElementById('saveGistBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const loginState = document.getElementById('loginState');
const logoutBtn = document.getElementById('logoutBtn');

let entries = [];
let editId = null;
let favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));

function loadEntries() {
    const localData = localStorage.getItem('savedEntries');
    if (localData) {
        entries = JSON.parse(localData);
        render();
        return;
    }

    fetch('data/projects.json')
        .then((response) => response.json())
        .then((data) => {
            entries = data;
            persistEntries();
            render();
        })
        .catch(() => {
            entries = [];
            render();
        });
}

function persistEntries() {
    localStorage.setItem('savedEntries', JSON.stringify(entries));
    sessionStorage.setItem('savedEntries', JSON.stringify(entries));
}

function render() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const activeTag = tagFilter ? tagFilter.value : 'all';
    const sortMode = sortSelect ? sortSelect.value : 'date-desc';

    const filtered = entries.filter((entry) => {
        const text = `${entry.title} ${entry.description} ${entry.tags.join(' ')}`.toLowerCase();
        const matchesSearch = text.includes(searchTerm);
        const matchesTag = activeTag === 'all' || entry.tags.includes(activeTag);
        return matchesSearch && matchesTag;
    });

    const sorted = filtered.sort((a, b) => {
        if (sortMode === 'title') {
            return a.title.localeCompare(b.title);
        }

        if (sortMode === 'favorites') {
            return Number(favorites.has(b.id)) - Number(favorites.has(a.id));
        }

        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortMode === 'date-asc' ? dateA - dateB : dateB - dateA;
    });

    if (projectCards) {
        projectCards.innerHTML = sorted.map((entry) => {
            const favoriteClass = favorites.has(entry.id) ? 'is-favorite' : '';
            const favoriteLabel = favorites.has(entry.id) ? '★ Favorite' : '☆ Favorite';
            const tags = entry.tags.map((tag) => `<span class="tag-badge">${tag}</span>`).join('');
            const links = entry.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join('');

            return `
                <div class="col-md-6 col-xl-4">
                    <article class="card project-card ${favoriteClass}">
                        <div class="d-flex justify-content-between align-items-start gap-2">
                            <div>
                                <h4 class="mb-1">${entry.title}</h4>
                                <p class="text-muted mb-0">${entry.date}</p>
                            </div>
                            <button class="btn btn-sm favorite-btn ${favorites.has(entry.id) ? 'active' : 'btn-outline-success'}" data-id="${entry.id}">
                                ${favoriteLabel}
                            </button>
                        </div>
                        <p class="mt-3 mb-2">${entry.description}</p>
                        <div class="mb-3">${tags}</div>
                        <div class="d-flex flex-wrap gap-2">
                            <button class="btn btn-outline-secondary btn-sm edit-btn" data-id="${entry.id}">Edit</button>
                            <a class="btn btn-outline-success btn-sm" href="${entry.links[0]?.url || '#'}" target="_blank">Open link</a>
                        </div>
                        <div class="mt-3">${links}</div>
                    </article>
                </div>
            `;
        }).join('');
    }

    if (tagFilter) {
        const uniqueTags = [...new Set(entries.flatMap((entry) => entry.tags))];
        tagFilter.innerHTML = '<option value="all">All tags</option>' + uniqueTags.map((tag) => `<option value="${tag}">${tag}</option>`).join('');
    }
}

function populateForm(entry) {
    editId = entry.id;
    document.getElementById('entryTitle').value = entry.title;
    document.getElementById('entryDate').value = entry.date;
    document.getElementById('entryDescription').innerHTML = entry.description;
    document.getElementById('entryTags').value = entry.tags.join(', ');
    document.getElementById('entryLinkLabel').value = entry.links[0]?.label || '';
    document.getElementById('entryLinkUrl').value = entry.links[0]?.url || '';
}

function resetForm() {
    editId = null;
    entryForm.reset();
    document.getElementById('entryDescription').innerHTML = '';
}

function saveEntry(event) {
    event.preventDefault();
    const title = document.getElementById('entryTitle').value.trim();
    const date = document.getElementById('entryDate').value;
    const description = document.getElementById('entryDescription').innerText.trim();
    const tags = document.getElementById('entryTags').value.split(',').map((tag) => tag.trim()).filter(Boolean);
    const linkLabel = document.getElementById('entryLinkLabel').value.trim();
    const linkUrl = document.getElementById('entryLinkUrl').value.trim();

    if (!title || !date || !description) {
        saveStatus.textContent = 'Please fill in the title, date, and note before saving.';
        return;
    }

    const entryData = {
        id: editId || Date.now(),
        title,
        description,
        date,
        tags,
        favorite: false,
        links: linkUrl ? [{ label: linkLabel || 'Open link', url: linkUrl }] : []
    };

    if (editId) {
        entries = entries.map((entry) => entry.id === editId ? entryData : entry);
    } else {
        entries.unshift(entryData);
    }

    persistEntries();
    render();
    saveStatus.textContent = editId ? 'Entry updated.' : 'Entry created and stored locally.';
    resetForm();
}

function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }

    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    render();
}

if (entryForm) {
    entryForm.addEventListener('submit', saveEntry);
}

if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', resetForm);
}

if (projectCards) {
    projectCards.addEventListener('click', (event) => {
        const favoriteBtn = event.target.closest('.favorite-btn');
        if (favoriteBtn) {
            toggleFavorite(Number(favoriteBtn.dataset.id));
            return;
        }

        const editBtn = event.target.closest('.edit-btn');
        if (editBtn) {
            const entry = entries.find((item) => item.id === Number(editBtn.dataset.id));
            if (entry) {
                populateForm(entry);
                saveStatus.textContent = `Editing ${entry.title}.`;
            }
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', render);
}

if (tagFilter) {
    tagFilter.addEventListener('change', render);
}

if (sortSelect) {
    sortSelect.addEventListener('change', render);
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('sessionAuthN');
        sessionStorage.removeItem('username');
        location.reload();
    });
}

if (saveGistBtn) {
    saveGistBtn.addEventListener('click', () => {
        const gistPayload = {
            description: 'Dandelion Parade entries',
            public: false,
            files: {
                'entries.json': { content: JSON.stringify(entries, null, 2) }
            }
        };

        fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gistPayload)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.html_url) {
                    saveStatus.innerHTML = `Saved to gist: <a href="${data.html_url}" target="_blank">${data.html_url}</a>`;
                    sessionStorage.setItem('gistUrl', data.html_url);
                } else {
                    saveStatus.textContent = 'Unable to save gist right now.';
                }
            })
            .catch(() => {
                saveStatus.textContent = 'Unable to save gist right now.';
            });
    });
}

const isAuthN = sessionStorage.getItem('sessionAuthN');
if (loginState) {
    if (isAuthN === 'true') {
        loginState.innerText = `Hello, ${sessionStorage.getItem('username') || 'friend'}`;
    } else {
        loginState.innerText = 'Please log in';
    }
}

loadEntries();
render();