// Operator Studio Dashboard Master Engine v2 - Enhanced Profile & Aesthetics

(function () {
    let clients = [];
    let activeClientId = null;
    let activeCategoryFilter = 'All';

    // Standalone Embedded Client CSS String for Iframe Preview & ZIP Bundles
    const EMBEDDED_CLIENT_CSS = `
/* Ultra-Premium Client Portfolio Website Design System */
:root {
    --bg-canvas: #FAF9F5;
    --bg-card: #FFFFFF;
    --bg-card-hover: #F4F3EE;
    --border-color: #E2E0D8;
    --border-subtle: #ECE9DF;
    --text-main: #1A2E26;
    --text-muted: #64748B;
    --accent-primary: #10B981;
    --accent-secondary: #0284C7;
    --accent-warm: #D97706;
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.03);
    --shadow-md: 0 6px 16px rgba(0,0,0,0.06);
    --shadow-lg: 0 16px 32px -4px rgba(0,0,0,0.1);
    --font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}

[data-theme="slate"] {
    --bg-canvas: #0D1117;
    --bg-card: #161B22;
    --bg-card-hover: #21262D;
    --border-color: #30363D;
    --border-subtle: #21262D;
    --text-main: #F0F6FC;
    --text-muted: #8B949E;
    --accent-primary: #38BDF8;
    --accent-secondary: #34D399;
    --accent-warm: #F59E0B;
}

[data-theme="corporate"] {
    --bg-canvas: #FFFFFF;
    --bg-card: #F8FAFC;
    --bg-card-hover: #F1F5F9;
    --border-color: #CBD5E1;
    --border-subtle: #E2E8F0;
    --text-main: #0F172A;
    --text-muted: #475569;
    --accent-primary: #1E3A8A;
    --accent-secondary: #0369A1;
    --accent-warm: #B45309;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background-color: var(--bg-canvas); color: var(--text-main); font-family: var(--font-body); line-height: 1.6; min-height: 100vh; overflow-x: hidden; }
.container { max-width: 1180px; margin: 0 auto; padding: 0 1.5rem; }
.site-header { background: rgba(250, 249, 245, 0.88); backdrop-filter: blur(14px); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; padding: 0.9rem 0; }
[data-theme="slate"] .site-header { background: rgba(13, 17, 23, 0.88); }
[data-theme="corporate"] .site-header { background: rgba(255, 255, 255, 0.92); }
.header-flex { display: flex; align-items: center; justify-content: space-between; }
.brand-wrap { display: flex; align-items: center; gap: 0.9rem; text-decoration: none; }
.brand-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-primary); }
.brand-avatar-placeholder { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; }
.brand-name { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--text-main); }
.brand-sub { font-size: 0.76rem; color: var(--text-muted); font-family: var(--font-mono); }
.hero-section { padding: 3.5rem 0 2.5rem; border-bottom: 1px solid var(--border-subtle); }
.hero-grid { display: grid; grid-template-columns: 1fr 360px; gap: 2.5rem; align-items: start; }
@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; } }
.hero-profile-row { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.25rem; }
.hero-avatar-large { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-primary); box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3); }
.hero-title { font-family: var(--font-heading); font-size: 2.6rem; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; color: var(--text-main); }
.hero-tagline { font-family: var(--font-mono); font-size: 0.88rem; font-weight: 700; color: var(--accent-secondary); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.4rem; }
.hero-bio { font-size: 1.02rem; color: var(--text-muted); margin-top: 1rem; max-width: 660px; line-height: 1.65; }
.social-pill-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1.25rem; }
.social-icon-btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.85rem; border-radius: 999px; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); font-size: 0.82rem; font-weight: 600; text-decoration: none; transition: all 0.2s ease; }
.social-icon-btn:hover { background: var(--accent-primary); color: #fff; border-color: var(--accent-primary); transform: translateY(-2px); }
.badge-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.25rem; }
.status-pill { font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 999px; background: rgba(16, 185, 129, 0.1); color: var(--accent-primary); border: 1px solid rgba(16, 185, 129, 0.25); }
.hero-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 18px; padding: 1.5rem; box-shadow: var(--shadow-md); display: flex; flex-direction: column; gap: 1rem; }
.hero-card-title { font-size: 1rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; }
.hero-card-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.88rem; color: var(--text-muted); }
.hero-card-item i { width: 22px; color: var(--accent-primary); font-size: 1rem; text-align: center; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; padding: 2rem 0; border-bottom: 1px solid var(--border-subtle); }
.stat-box { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem; text-align: center; transition: all 0.2s ease; }
.stat-box:hover { transform: translateY(-3px); border-color: var(--accent-primary); box-shadow: var(--shadow-md); }
.stat-val { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text-main); }
.stat-lbl { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--accent-secondary); text-transform: uppercase; margin-top: 0.2rem; }
.filter-bar { padding: 1.75rem 0 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.filter-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-pill-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-muted); padding: 0.45rem 0.95rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.filter-pill-btn:hover, .filter-pill-btn.active { background: var(--accent-primary); color: #fff; border-color: var(--accent-primary); }
.search-input { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.55rem 1rem; border-radius: 8px; font-size: 0.88rem; outline: none; min-width: 260px; }
.doc-grid-section { padding: 1rem 0 4rem; }
.doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.5rem; }
.client-doc-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--shadow-sm); transition: all 0.25s ease; }
.client-doc-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--accent-primary); }
.card-header-box { height: 165px; background: rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.card-img-preview { width: 100%; height: 100%; object-fit: cover; }
.card-icon-big { font-size: 3.8rem; color: var(--text-muted); opacity: 0.45; }
.card-cat-tag { position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 4px; text-transform: uppercase; }
.card-body-box { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.card-doc-title { font-size: 1.05rem; font-weight: 700; color: var(--text-main); line-height: 1.35; }
.card-doc-meta { font-size: 0.8rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.2rem; }
.card-action-bar { padding: 0.85rem 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.btn-card { padding: 0.45rem 0.95rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-canvas); color: var(--text-main); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; transition: all 0.2s; }
.btn-card:hover { background: var(--accent-primary); color: #fff; border-color: var(--accent-primary); }
.lightbox-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; pointer-events: none; transition: opacity 0.25s ease; padding: 1.5rem; }
.lightbox-overlay.active { opacity: 1; pointer-events: auto; }
.lightbox-modal { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 18px; width: 100%; max-width: 900px; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; }
.lightbox-header { padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; }
.lightbox-body { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.03); }
.lock-screen { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg-canvas); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
.lock-card { background: var(--bg-card); border: 1px solid var(--border-color); padding: 2.5rem; border-radius: 20px; max-width: 420px; width: 100%; text-align: center; box-shadow: var(--shadow-lg); display: flex; flex-direction: column; gap: 1.25rem; }
.lock-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.12); color: var(--accent-primary); font-size: 1.75rem; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
`;

    const EMBEDDED_CLIENT_JS = `
document.addEventListener('DOMContentLoaded', () => {
    const data = window.CLIENT_DATA || {};
    const profile = data.profile || {};
    const docs = data.documents || [];
    const settings = data.settings || {};

    if (settings.securityMode === 'pin' && profile.pin) {
        checkSecurityLock(profile.pin);
    } else {
        const lockScreen = document.getElementById('lockScreen');
        if (lockScreen) lockScreen.style.display = 'none';
    }

    populateProfile(profile);
    renderKeyStats(profile.stats);
    renderCategories(docs);
    renderDocuments(docs);
    setupFilters(docs);
    setupLightbox(docs);
    setupPdfBinder(docs);
    setupCustomDownloadModal(docs);
    setupGlobalClickDelegation();
});

function checkSecurityLock(correctPin) {
    const lockScreen = document.getElementById('lockScreen');
    const pinInput = document.getElementById('pinInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const pinError = document.getElementById('pinError');

    if (!lockScreen) return;
    lockScreen.style.display = 'flex';

    unlockBtn.addEventListener('click', () => {
        if (pinInput.value === correctPin) {
            lockScreen.style.display = 'none';
        } else {
            pinError.style.display = 'block';
        }
    });

    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') unlockBtn.click();
    });
}

function populateProfile(profile) {
    const nameEl = document.getElementById('clientName');
    const nameHeroEl = document.getElementById('clientNameHero');
    const titleEl = document.getElementById('clientTitle');
    const taglineEl = document.getElementById('clientTagline');
    const bioEl = document.getElementById('clientBio');
    const locationEl = document.getElementById('clientLocation');
    const emailEl = document.getElementById('clientEmail');
    const phoneEl = document.getElementById('clientPhone');
    const avatarHeaderEl = document.getElementById('brandAvatarWrap');
    const avatarHeroEl = document.getElementById('heroAvatarWrap');
    const badgeContainer = document.getElementById('badgeContainer');
    const socialRowEl = document.getElementById('socialPillRow');

    const fullName = profile.fullName || 'Client Vault';
    if (nameEl) nameEl.textContent = fullName;
    if (nameHeroEl) nameHeroEl.textContent = fullName;
    if (titleEl) titleEl.textContent = profile.title || 'Personal Document Portfolio';
    if (taglineEl) taglineEl.textContent = profile.tagline || '';
    if (bioEl) bioEl.textContent = profile.bio || '';
    if (locationEl && profile.location) locationEl.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + escapeHtml(profile.location);
    if (emailEl && profile.email) emailEl.innerHTML = '<i class="fas fa-envelope"></i> ' + escapeHtml(profile.email);
    if (phoneEl && profile.phone) phoneEl.innerHTML = '<i class="fas fa-phone"></i> ' + escapeHtml(profile.phone);

    if (profile.avatarUrl) {
        if (avatarHeaderEl) avatarHeaderEl.innerHTML = '<img src="' + profile.avatarUrl + '" class="brand-avatar" alt="' + escapeHtml(fullName) + '">';
        if (avatarHeroEl) avatarHeroEl.innerHTML = '<img src="' + profile.avatarUrl + '" class="hero-avatar-large" alt="' + escapeHtml(fullName) + '">';
    } else {
        const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        if (avatarHeaderEl) avatarHeaderEl.innerHTML = '<div class="brand-avatar-placeholder">' + initials + '</div>';
        if (avatarHeroEl) avatarHeroEl.innerHTML = '<div class="brand-avatar-placeholder" style="width: 80px; height: 80px; font-size: 2rem;">' + initials + '</div>';
    }

    if (badgeContainer && profile.badges) {
        const badges = profile.badges.split(',').map(b => b.trim()).filter(Boolean);
        badgeContainer.innerHTML = badges.map(b => '<span class="status-pill"><i class="fas fa-award"></i> ' + escapeHtml(b) + '</span>').join('');
    }

    if (socialRowEl) {
        const socials = [];
        if (profile.linkedin) socials.push('<a href="' + profile.linkedin + '" target="_blank" class="social-icon-btn"><i class="fab fa-linkedin"></i> LinkedIn</a>');
        if (profile.github) socials.push('<a href="' + profile.github + '" target="_blank" class="social-icon-btn"><i class="fab fa-github"></i> GitHub</a>');
        if (profile.researchgate) socials.push('<a href="' + profile.researchgate + '" target="_blank" class="social-icon-btn"><i class="fas fa-microscope"></i> ResearchGate</a>');
        if (profile.orcid) socials.push('<a href="' + profile.orcid + '" target="_blank" class="social-icon-btn"><i class="fas fa-id-badge"></i> ORCID</a>');
        if (profile.website) socials.push('<a href="' + profile.website + '" target="_blank" class="social-icon-btn"><i class="fas fa-globe"></i> Website</a>');
        if (profile.twitter) socials.push('<a href="' + profile.twitter + '" target="_blank" class="social-icon-btn"><i class="fab fa-x-twitter"></i> X/Twitter</a>');
        socialRowEl.innerHTML = socials.join('');
    }
}

function renderKeyStats(stats) {
    const gridEl = document.getElementById('keyStatsGrid');
    if (!gridEl) return;
    if (!stats || stats.length === 0) { gridEl.style.display = 'none'; return; }
    gridEl.style.display = 'grid';
    gridEl.innerHTML = stats.map(stat => \`
        <div class="stat-box">
            <div class="stat-val">\${escapeHtml(stat.value)}</div>
            <div class="stat-lbl">\${escapeHtml(stat.label)}</div>
        </div>
    \`).join('');
}

function renderCategories(docs) {
    const categoryBar = document.getElementById('categoryBar');
    if (!categoryBar) return;
    const categories = ['All', ...new Set(docs.map(d => d.category))];
    categoryBar.innerHTML = categories.map((cat, i) => \`
        <button class="filter-pill-btn \${i === 0 ? 'active' : ''}" data-cat="\${escapeHtml(cat)}">
            \${escapeHtml(cat)} (\${cat === 'All' ? docs.length : docs.filter(d => d.category === cat).length})
        </button>
    \`).join('');
}

function renderDocuments(docsToRender) {
    const grid = document.getElementById('documentGrid');
    if (!grid) return;
    if (!docsToRender || docsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No documents available in this category.</div>';
        return;
    }
    grid.innerHTML = docsToRender.map(doc => {
        const isPdf = doc.fileType === 'pdf' || (doc.fileName && doc.fileName.endsWith('.pdf'));
        const thumbUrl = doc.dataUrl || doc.filePath || 'assets/doc-placeholder.png';
        return \`
            <div class="client-doc-card">
                <div class="card-header-box">
                    \${isPdf ? \`
                        <div class="card-icon-big"><i class="fas fa-file-pdf text-rose-500"></i></div>
                    \` : \`
                        <img src="\${thumbUrl}" class="card-img-preview" alt="\${escapeHtml(doc.title)}">
                    \`}
                    <span class="card-cat-tag">\${escapeHtml(doc.category)}</span>
                </div>
                <div class="card-body-box">
                    <div class="card-doc-title">\${escapeHtml(doc.title)}</div>
                    <div class="card-doc-meta">
                        \${doc.authority ? \`<span><i class="fas fa-building"></i> \${escapeHtml(doc.authority)}</span>\` : ''}
                        \${doc.issueDate ? \`<span><i class="fas fa-calendar-alt"></i> Issued: \${escapeHtml(doc.issueDate)}</span>\` : ''}
                        \${doc.expiryDate ? \`<span><i class="fas fa-hourglass-end"></i> Expires: \${escapeHtml(doc.expiryDate)}</span>\` : ''}
                    </div>
                </div>
                <div class="card-action-bar" style="flex-wrap: wrap; gap: 0.4rem;">
                    <button class="btn-card preview-btn" data-url="\${thumbUrl}" data-title="\${escapeHtml(doc.title)}" data-type="\${isPdf ? 'pdf' : 'img'}" data-id="\${doc.id}">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <button class="btn-card custom-dl-btn" data-id="\${doc.id}">
                        <i class="fas fa-sliders-h text-emerald-500"></i> Custom Format/Size
                    </button>
                    <a href="\${thumbUrl}" download="\${escapeHtml(doc.title)}.\${doc.fileType || 'pdf'}" class="btn-card">
                        <i class="fas fa-download"></i> Direct Download
                    </a>
                </div>
            </div>
        \`;
    }).join('');

    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', () => openLightbox(btn.dataset.url, btn.dataset.title, btn.dataset.type, btn.dataset.id, docsToRender));
    });
}

function setupFilters(allDocs) {
    const searchInput = document.getElementById('searchInput');
    let currentCategory = 'All';
    document.querySelectorAll('#categoryBar .filter-pill-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#categoryBar .filter-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.cat;
            filterDocs();
        });
    });

    if (searchInput) searchInput.addEventListener('input', () => filterDocs());

    function filterDocs() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const filtered = allDocs.filter(d => {
            const matchesCat = currentCategory === 'All' || d.category === currentCategory;
            const matchesQuery = !query || d.title.toLowerCase().includes(query) || (d.authority && d.authority.toLowerCase().includes(query));
            return matchesCat && matchesQuery;
        });
        renderDocuments(filtered);
    }
}

function setupLightbox(docs) {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('closeLightbox');
    if (!modal) return;
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
}

function openLightbox(url, title, type, docId, docs) {
    const modal = document.getElementById('lightboxModal');
    const titleEl = document.getElementById('lightboxTitle');
    const bodyEl = document.getElementById('lightboxBody');
    if (!modal) return;

    if (titleEl) {
        titleEl.innerHTML = '<span>' + escapeHtml(title) + '</span><button class="btn-card custom-dl-btn" data-id="' + docId + '" style="margin-left: 1rem; font-size: 0.78rem;"><i class="fas fa-sliders-h text-emerald-500"></i> Custom Download Options</button>';
    }

    if (bodyEl) {
        if (type === 'pdf') {
            bodyEl.innerHTML = \`<iframe src="\${url}" style="width: 100%; height: 75vh; border: none; border-radius: 8px;"></iframe>\`;
        } else {
            bodyEl.innerHTML = \`<img src="\${url}" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: 8px;">\`;
        }
    }
    modal.classList.add('active');
}

function setupPdfBinder(docs) {
    const openBinderBtn = document.getElementById('openBinderBtn');
    const binderModal = document.getElementById('binderModal');
    const closeBinderBtn = document.getElementById('closeBinder');
    const binderList = document.getElementById('binderDocList');
    const compileBtn = document.getElementById('compilePdfBtn');

    if (!openBinderBtn || !binderModal) return;

    openBinderBtn.addEventListener('click', () => {
        if (binderList) {
            binderList.innerHTML = docs.map(d => \`
                <label style="display: flex; align-items: center; gap: 0.75rem; background: var(--bg-canvas); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer;">
                    <input type="checkbox" class="binder-checkbox" value="\${d.id}" checked>
                    <div>
                        <strong style="display: block; font-size: 0.9rem; color: var(--text-main);">\${escapeHtml(d.title)}</strong>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">\${escapeHtml(d.category)}</span>
                    </div>
                </label>
            \`).join('');
        }
        binderModal.classList.add('active');
    });

    if (closeBinderBtn) closeBinderBtn.addEventListener('click', () => binderModal.classList.remove('active'));

    if (compileBtn) {
        compileBtn.addEventListener('click', () => {
            const selectedIds = Array.from(document.querySelectorAll('.binder-checkbox:checked')).map(cb => cb.value);
            const selectedDocs = docs.filter(d => selectedIds.includes(d.id));

            if (selectedDocs.length === 0) {
                alert('Please select at least one document to combine.');
                return;
            }

            if (window.jspdf) {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.setFontSize(18);
                doc.text((window.CLIENT_DATA && window.CLIENT_DATA.profile ? window.CLIENT_DATA.profile.fullName : 'Client') + ' - Document Vault Dossier', 14, 20);
                doc.setFontSize(11);
                doc.text('Compiled Document Package', 14, 28);
                doc.line(14, 32, 196, 32);

                let yPos = 40;
                selectedDocs.forEach((d, i) => {
                    doc.setFontSize(12);
                    doc.text(\`\${i + 1}. \${d.title} (\${d.category})\`, 14, yPos);
                    yPos += 8;
                    if (d.authority) doc.text(\`   Authority: \${d.authority}\`, 14, yPos), yPos += 6;
                    if (d.issueDate) doc.text(\`   Issued: \${d.issueDate}\`, 14, yPos), yPos += 6;
                    yPos += 10;
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });

                doc.save(\`\${(window.CLIENT_DATA && window.CLIENT_DATA.profile ? window.CLIENT_DATA.profile.fullName : 'Client').replace(/\\s+/g, '_')}_Document_Dossier.pdf\`);
                binderModal.classList.remove('active');
            } else {
                alert('PDF compilation library ready.');
            }
        });
    }
}

function openCustomDownloadModalForDoc(docId, docs) {
    const modal = document.getElementById('customDownloadModal');
    const docSelect = document.getElementById('clientModalDocSelect');
    if (!modal) return;

    if (docSelect && docs && docs.length > 0) {
        docSelect.innerHTML = docs.map(d => \`<option value="\${d.id}" \${d.id === docId ? 'selected' : ''}>\${escapeHtml(d.title)} (\${d.category})</option>\`).join('');
        docSelect.value = docId || docs[0].id;
        docSelect.dispatchEvent(new Event('change'));
    }
    modal.classList.add('active');
}

function setupGlobalClickDelegation() {
    document.addEventListener('click', (e) => {
        const customBtn = e.target.closest('.custom-dl-btn');
        if (customBtn) {
            const docId = customBtn.dataset.id;
            const docs = (window.CLIENT_DATA && window.CLIENT_DATA.documents) ? window.CLIENT_DATA.documents : [];
            const lightbox = document.getElementById('lightboxModal');
            if (lightbox) lightbox.classList.remove('active');
            openCustomDownloadModalForDoc(docId, docs);
        }
    });
}

function setupCustomDownloadModal(docs) {
    const modal = document.getElementById('customDownloadModal');
    const closeBtn = document.getElementById('closeCustomDownload');
    const globalOpenBtn = document.getElementById('openGlobalCustomDownloadBtn');
    const docSelect = document.getElementById('clientModalDocSelect');
    const formatSelect = document.getElementById('clientModalFormat');
    const presetSelect = document.getElementById('clientModalPreset');
    const widthInput = document.getElementById('clientModalWidth');
    const heightInput = document.getElementById('clientModalHeight');
    const lockAspectCb = document.getElementById('clientModalLockAspect');
    const qualitySlider = document.getElementById('clientModalQuality');
    const qualityValEl = document.getElementById('clientModalQualityVal');
    const triggerBtn = document.getElementById('triggerClientCustomDownload');
    const scaleBtns = document.querySelectorAll('.modal-scale-btn');

    let activeDoc = null;
    let origW = 800;
    let origH = 600;

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    if (globalOpenBtn) {
        globalOpenBtn.addEventListener('click', () => {
            const allDocs = (window.CLIENT_DATA && window.CLIENT_DATA.documents) ? window.CLIENT_DATA.documents : docs;
            if (allDocs && allDocs.length > 0) {
                openCustomDownloadModalForDoc(allDocs[0].id, allDocs);
            }
        });
    }

    if (docSelect) {
        docSelect.addEventListener('change', () => {
            const allDocs = (window.CLIENT_DATA && window.CLIENT_DATA.documents) ? window.CLIENT_DATA.documents : docs;
            activeDoc = allDocs.find(d => d.id === docSelect.value);
            const imgSrc = activeDoc ? (activeDoc.dataUrl || activeDoc.filePath) : null;
            if (imgSrc) {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    origW = img.width || 800;
                    origH = img.height || 600;
                    if (widthInput) widthInput.value = origW;
                    if (heightInput) heightInput.value = origH;
                };
                img.onerror = () => {
                    origW = 800;
                    origH = 600;
                    if (widthInput) widthInput.value = 800;
                    if (heightInput) heightInput.value = 600;
                };
                img.src = imgSrc;
            }
        });
    }

    if (presetSelect) {
        presetSelect.addEventListener('change', () => {
            const p = presetSelect.value;
            if (p === 'passport') { if (widthInput) widthInput.value = 413; if (heightInput) heightInput.value = 531; }
            else if (p === 'a4') { if (widthInput) widthInput.value = 595; if (heightInput) heightInput.value = 842; }
            else if (p === 'idcard') { if (widthInput) widthInput.value = 504; if (heightInput) heightInput.value = 318; }
            else if (p === 'square') { if (widthInput) widthInput.value = 500; if (heightInput) heightInput.value = 500; }
            else if (p === 'original') { if (widthInput) widthInput.value = origW; if (heightInput) heightInput.value = origH; }
        });
    }

    if (widthInput && heightInput) {
        widthInput.addEventListener('input', () => {
            if (lockAspectCb && lockAspectCb.checked && origW > 0) {
                const ratio = origH / origW;
                heightInput.value = Math.round((parseInt(widthInput.value) || 0) * ratio);
            }
        });

        heightInput.addEventListener('input', () => {
            if (lockAspectCb && lockAspectCb.checked && origH > 0) {
                const ratio = origW / origH;
                widthInput.value = Math.round((parseInt(heightInput.value) || 0) * ratio);
            }
        });
    }

    scaleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const scale = parseFloat(btn.dataset.scale);
            if (widthInput) widthInput.value = Math.round(origW * scale);
            if (heightInput) heightInput.value = Math.round(origH * scale);
        });
    });

    if (qualitySlider && qualityValEl) {
        qualitySlider.addEventListener('input', () => {
            qualityValEl.textContent = \`\${Math.round(parseFloat(qualitySlider.value) * 100)}%\`;
        });
    }

    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
            const imgSrc = activeDoc ? (activeDoc.dataUrl || activeDoc.filePath) : null;
            if (!activeDoc || !imgSrc) {
                alert('Selected document data unavailable.');
                return;
            }

            const targetWidth = parseInt(widthInput.value) || origW || 800;
            const targetHeight = parseInt(heightInput.value) || origH || 600;
            const targetFormat = formatSelect.value;
            const quality = parseFloat(qualitySlider.value);

            if (targetFormat === 'pdf' && activeDoc.fileType === 'pdf' && activeDoc.filePath) {
                const link = document.createElement('a');
                link.href = activeDoc.filePath;
                link.download = \`\${activeDoc.title}.pdf\`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                modal.classList.remove('active');
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, targetWidth, targetHeight);
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                if (targetFormat === 'pdf' && window.jspdf) {
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF(targetWidth > targetHeight ? 'l' : 'p', 'pt', [targetWidth, targetHeight]);
                    const imgData = canvas.toDataURL('image/jpeg', quality);
                    pdf.addImage(imgData, 'JPEG', 0, 0, targetWidth, targetHeight);
                    const link = document.createElement('a');
                    link.href = pdf.output('bloburl');
                    link.download = \`\${activeDoc.title}_\${targetWidth}x\${targetHeight}.pdf\`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                } else {
                    let mimeType = 'image/jpeg';
                    let ext = 'jpg';
                    if (targetFormat === 'png') { mimeType = 'image/png'; ext = 'png'; }
                    if (targetFormat === 'webp') { mimeType = 'image/webp'; ext = 'webp'; }
                    const dataUrl = canvas.toDataURL(mimeType, quality);
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = \`\${activeDoc.title}_\${targetWidth}x\${targetHeight}.\${ext}\`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }
                modal.classList.remove('active');
            };
            img.onerror = () => {
                const link = document.createElement('a');
                link.href = imgSrc;
                link.download = \`\${activeDoc.title}.\${activeDoc.fileType || 'jpg'}\`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                modal.classList.remove('active');
            };
            img.src = imgSrc;
        });
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
`;

    // Demo Client Initial Data
    const DEMO_CLIENT = {
        id: 'client_demo_alex_vance',
        slug: 'dr-alex-vance',
        fullName: 'Dr. Alex Vance',
        title: 'Senior Bioinformatician & Genomic Data Researcher',
        tagline: 'BRIDGING ZOOLOGY, GENOMIC DATA SCIENCE & BIOINFORMATICS',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        email: 'alex.vance@genomics-lab.org',
        phone: '+91 98765 12345',
        location: 'Guwahati, Assam, India',
        pin: '1234',
        bio: 'CSIR NET JRF Awardee (AIR 180) specializing in computational genomics, structural biology of Toll-Like Receptors, and ethnopharmacology data analysis across Northeast India.',
        badges: 'CSIR NET AIR 180, IELTS C1 Band 7.0, M.Sc. Gold Medalist, 8+ Publications',
        linkedin: 'https://linkedin.com/in/alex-vance',
        github: 'https://github.com/alex-vance-bio',
        researchgate: 'https://researchgate.net/profile/Alex-Vance',
        orcid: 'https://orcid.org/0000-0002-1825-0097',
        website: 'https://alexvance.bio',
        twitter: 'https://x.com/alexvance_bio',
        stats: [
            { value: 'AIR 180', label: 'CSIR NET JRF RANK' },
            { value: '8+ PAPERS', label: 'PEER-REVIEWED PUBLICATIONS' },
            { value: 'BAND 7.0', label: 'IELTS ACADEMIC C1' },
            { value: 'CGPA 8.85', label: 'M.SC. ZOOLOGY GOLD MEDAL' }
        ],
        template: 'warm',
        securityMode: 'public',
        filenameObfuscation: true,
        documents: [
            {
                id: 'doc_aadhaar_001',
                title: 'Aadhaar Card (National ID)',
                category: 'Aadhaar & Identity',
                authority: 'UIDAI Govt of India',
                issueDate: '2021-05-12',
                expiryDate: '',
                privacy: 'public',
                fileType: 'pdf',
                fileName: 'doc_sec_a7f9b2.pdf',
                description: 'Official Government Aadhaar Identity Card with masked Aadhaar number.',
                dataUrl: generateSampleDocCanvas('AADHAAR NATIONAL IDENTITY CARD', 'Government of India', '#10B981')
            },
            {
                id: 'doc_pan_002',
                title: 'Permanent Account Number (PAN Card)',
                category: 'PAN & Tax',
                authority: 'Income Tax Dept Govt of India',
                issueDate: '2020-02-18',
                expiryDate: '',
                privacy: 'public',
                fileType: 'png',
                fileName: 'doc_sec_c3e8d1.png',
                description: 'Permanent Account Number Card for Tax Verification.',
                dataUrl: generateSampleDocCanvas('INCOME TAX DEPARTMENT - PAN', 'Govt of India', '#0284C7')
            },
            {
                id: 'doc_csir_003',
                title: 'CSIR-UGC NET JRF Award Letter',
                category: 'Competitive Exam Credentials',
                authority: 'CSIR Human Resource Development Group',
                issueDate: '2023-01-15',
                expiryDate: '2025-01-15',
                privacy: 'public',
                fileType: 'pdf',
                fileName: 'doc_sec_e91a4f.pdf',
                description: 'Junior Research Fellowship Award Letter (AIR 180 in Life Sciences).',
                dataUrl: generateSampleDocCanvas('CSIR-UGC NET JRF AWARD LETTER', 'Rank: AIR 180 (Life Sciences)', '#D97706')
            },
            {
                id: 'doc_msc_004',
                title: 'M.Sc. Zoology Consolidated Marksheet',
                category: 'Academic Marksheets',
                authority: 'Rajiv Gandhi University',
                issueDate: '2022-08-30',
                expiryDate: '',
                privacy: 'public',
                fileType: 'pdf',
                fileName: 'doc_sec_b24c8e.pdf',
                description: 'Master of Science Consolidated Marksheet with First Class First Position.',
                dataUrl: generateSampleDocCanvas('RAJIV GANDHI UNIVERSITY - M.SC', 'CGPA: 8.85 / 10.00', '#6366F1')
            }
        ]
    };

    // DOM Initialization
    document.addEventListener('DOMContentLoaded', () => {
        loadDataFromStorage();
        setupNavigation();
        setupClientManager();
        setupDocumentIngestion();
        setupMetadataModal();
        setupProcessingStudio();
        setupBinderStudio();
        setupTemplateStudio();
        setupLivePreview();

        if (clients.length === 0) {
            clients.push(DEMO_CLIENT);
            activeClientId = DEMO_CLIENT.id;
            saveDataToStorage();
        } else if (!activeClientId && clients.length > 0) {
            activeClientId = clients[0].id;
        }

        renderClientSelector();
        populateActiveClientForm();
    });

    function loadDataFromStorage() {
        try {
            const raw = localStorage.getItem('client_vault_studio_db');
            if (raw) {
                const parsed = JSON.parse(raw);
                clients = parsed.clients || [];
                activeClientId = parsed.activeClientId || null;
            }
        } catch (e) {
            console.error('Error loading vault DB:', e);
        }
    }

    function saveDataToStorage() {
        try {
            localStorage.setItem('client_vault_studio_db', JSON.stringify({
                clients: clients,
                activeClientId: activeClientId
            }));
        } catch (e) {
            console.error('Storage limit reached, saving metadata:', e);
        }
    }

    function getActiveClient() {
        return clients.find(c => c.id === activeClientId) || null;
    }

    function setupNavigation() {
        const menuBtns = document.querySelectorAll('.nav-menu-btn');
        menuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                menuBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                document.querySelectorAll('.workspace-tab').forEach(tab => tab.classList.remove('active'));
                const targetTab = document.getElementById(tabId);
                if (targetTab) targetTab.classList.add('active');

                if (tabId === 'tab-preview') {
                    renderLivePreview();
                }
            });
        });

        const exportVaultBtn = document.getElementById('exportVaultBtn');
        if (exportVaultBtn) {
            exportVaultBtn.addEventListener('click', () => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(clients, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `client_vault_database_backup.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                showToast('Client Database Backup JSON exported!');
            });
        }

        const loadDemoBtn = document.getElementById('loadDemoBtn');
        if (loadDemoBtn) {
            loadDemoBtn.addEventListener('click', () => {
                const exists = clients.some(c => c.id === DEMO_CLIENT.id);
                if (!exists) {
                    clients.push(JSON.parse(JSON.stringify(DEMO_CLIENT)));
                }
                activeClientId = DEMO_CLIENT.id;
                saveDataToStorage();
                renderClientSelector();
                populateActiveClientForm();
                showToast('Demo Client "Dr. Alex Vance" loaded!');
            });
        }
    }

    function setupClientManager() {
        const clientSelect = document.getElementById('clientSelect');
        const createBtn = document.getElementById('createNewClientBtn');
        const modal = document.getElementById('newClientModal');
        const closeBtn = document.getElementById('closeNewClientModal');
        const cancelBtn = document.getElementById('cancelNewClientBtn');
        const confirmBtn = document.getElementById('confirmCreateClientBtn');
        const newNameInput = document.getElementById('newClientName');
        const newSlugInput = document.getElementById('newClientSlug');

        if (clientSelect) {
            clientSelect.addEventListener('change', (e) => {
                activeClientId = e.target.value;
                saveDataToStorage();
                populateActiveClientForm();
            });
        }

        if (createBtn && modal) {
            createBtn.addEventListener('click', () => {
                if (newNameInput) newNameInput.value = '';
                if (newSlugInput) newSlugInput.value = '';
                modal.classList.add('active');
            });
        }

        if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        if (cancelBtn && modal) cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

        if (newNameInput && newSlugInput) {
            newNameInput.addEventListener('input', () => {
                newSlugInput.value = newNameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            });
        }

        if (confirmBtn && modal) {
            confirmBtn.addEventListener('click', () => {
                const name = newNameInput.value.trim();
                if (!name) {
                    alert('Please enter a client name.');
                    return;
                }

                const newClient = {
                    id: 'client_' + Date.now(),
                    slug: newSlugInput.value || 'client-' + Date.now(),
                    fullName: name,
                    title: 'Personal Document Portfolio',
                    tagline: '',
                    avatarUrl: '',
                    email: '',
                    phone: '',
                    location: '',
                    pin: document.getElementById('newClientPin').value || '',
                    bio: '',
                    badges: '',
                    linkedin: '',
                    github: '',
                    researchgate: '',
                    orcid: '',
                    website: '',
                    twitter: '',
                    stats: [
                        { value: 'VERIFIED', label: 'DOCUMENT VAULT' },
                        { value: '100%', label: 'SECURITY ENCRYPTED' }
                    ],
                    template: 'warm',
                    securityMode: 'public',
                    filenameObfuscation: true,
                    documents: []
                };

                clients.push(newClient);
                activeClientId = newClient.id;
                saveDataToStorage();
                renderClientSelector();
                populateActiveClientForm();
                modal.classList.remove('active');
                showToast(`New client workspace "${name}" created!`);
            });
        }

        // Avatar File Upload Listener
        const avatarFileInput = document.getElementById('clientAvatarFileInput');
        const removeAvatarBtn = document.getElementById('removeAvatarBtn');
        const avatarPreviewImg = document.getElementById('avatarPreviewImg');
        const avatarPlaceholderIcon = document.getElementById('avatarPlaceholderIcon');
        const avatarUrlHidden = document.getElementById('clientAvatarUrl');

        if (avatarFileInput) {
            avatarFileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const dataUrl = event.target.result;
                        if (avatarUrlHidden) avatarUrlHidden.value = dataUrl;
                        if (avatarPreviewImg) {
                            avatarPreviewImg.src = dataUrl;
                            avatarPreviewImg.style.display = 'block';
                        }
                        if (avatarPlaceholderIcon) avatarPlaceholderIcon.style.display = 'none';
                        if (removeAvatarBtn) removeAvatarBtn.style.display = 'inline-flex';
                        showToast('Profile photo updated!');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (removeAvatarBtn) {
            removeAvatarBtn.addEventListener('click', () => {
                if (avatarUrlHidden) avatarUrlHidden.value = '';
                if (avatarPreviewImg) {
                    avatarPreviewImg.src = '';
                    avatarPreviewImg.style.display = 'none';
                }
                if (avatarPlaceholderIcon) avatarPlaceholderIcon.style.display = 'block';
                if (removeAvatarBtn) removeAvatarBtn.style.display = 'none';
                showToast('Profile photo removed.');
            });
        }

        // Save Profile Button
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', () => {
                const client = getActiveClient();
                if (!client) return;

                client.fullName = document.getElementById('clientFullName').value;
                client.title = document.getElementById('clientTitle').value;
                client.tagline = document.getElementById('clientTagline').value;
                client.avatarUrl = document.getElementById('clientAvatarUrl').value;
                client.email = document.getElementById('clientEmail').value;
                client.phone = document.getElementById('clientPhone').value;
                client.location = document.getElementById('clientLocation').value;
                client.pin = document.getElementById('clientPin').value;
                client.bio = document.getElementById('clientBio').value;
                client.badges = document.getElementById('clientBadges').value;
                client.linkedin = document.getElementById('clientLinkedin').value;
                client.github = document.getElementById('clientGithub').value;
                client.researchgate = document.getElementById('clientResearchgate').value;
                client.orcid = document.getElementById('clientOrcid').value;
                client.website = document.getElementById('clientWebsite').value;
                client.twitter = document.getElementById('clientTwitter').value;

                client.stats = [
                    { value: document.getElementById('stat1Val').value, label: document.getElementById('stat1Lbl').value },
                    { value: document.getElementById('stat2Val').value, label: document.getElementById('stat2Lbl').value },
                    { value: document.getElementById('stat3Val').value, label: document.getElementById('stat3Lbl').value },
                    { value: document.getElementById('stat4Val').value, label: document.getElementById('stat4Lbl').value }
                ].filter(s => s.value || s.label);

                saveDataToStorage();
                renderClientSelector();
                showToast('Client profile & social credentials saved!');
            });
        }
    }

    function renderClientSelector() {
        const select = document.getElementById('clientSelect');
        if (!select) return;
        select.innerHTML = clients.map(c => `<option value="${c.id}" ${c.id === activeClientId ? 'selected' : ''}>${escapeHtml(c.fullName)}</option>`).join('');
    }

    function populateActiveClientForm() {
        const client = getActiveClient();
        if (!client) return;

        if (document.getElementById('clientFullName')) document.getElementById('clientFullName').value = client.fullName || '';
        if (document.getElementById('clientTitle')) document.getElementById('clientTitle').value = client.title || '';
        if (document.getElementById('clientTagline')) document.getElementById('clientTagline').value = client.tagline || '';
        if (document.getElementById('clientAvatarUrl')) document.getElementById('clientAvatarUrl').value = client.avatarUrl || '';

        // Avatar Thumbnail Preview populate
        const avatarPreviewImg = document.getElementById('avatarPreviewImg');
        const avatarPlaceholderIcon = document.getElementById('avatarPlaceholderIcon');
        const removeAvatarBtn = document.getElementById('removeAvatarBtn');

        if (client.avatarUrl) {
            if (avatarPreviewImg) {
                avatarPreviewImg.src = client.avatarUrl;
                avatarPreviewImg.style.display = 'block';
            }
            if (avatarPlaceholderIcon) avatarPlaceholderIcon.style.display = 'none';
            if (removeAvatarBtn) removeAvatarBtn.style.display = 'inline-flex';
        } else {
            if (avatarPreviewImg) {
                avatarPreviewImg.src = '';
                avatarPreviewImg.style.display = 'none';
            }
            if (avatarPlaceholderIcon) avatarPlaceholderIcon.style.display = 'block';
            if (removeAvatarBtn) removeAvatarBtn.style.display = 'none';
        }
        if (document.getElementById('clientEmail')) document.getElementById('clientEmail').value = client.email || '';
        if (document.getElementById('clientPhone')) document.getElementById('clientPhone').value = client.phone || '';
        if (document.getElementById('clientLocation')) document.getElementById('clientLocation').value = client.location || '';
        if (document.getElementById('clientPin')) document.getElementById('clientPin').value = client.pin || '';
        if (document.getElementById('clientBio')) document.getElementById('clientBio').value = client.bio || '';
        if (document.getElementById('clientBadges')) document.getElementById('clientBadges').value = client.badges || '';
        if (document.getElementById('clientLinkedin')) document.getElementById('clientLinkedin').value = client.linkedin || '';
        if (document.getElementById('clientGithub')) document.getElementById('clientGithub').value = client.github || '';
        if (document.getElementById('clientResearchgate')) document.getElementById('clientResearchgate').value = client.researchgate || '';
        if (document.getElementById('clientOrcid')) document.getElementById('clientOrcid').value = client.orcid || '';
        if (document.getElementById('clientWebsite')) document.getElementById('clientWebsite').value = client.website || '';
        if (document.getElementById('clientTwitter')) document.getElementById('clientTwitter').value = client.twitter || '';

        const stats = client.stats || [];
        if (document.getElementById('stat1Val')) document.getElementById('stat1Val').value = stats[0] ? stats[0].value : '';
        if (document.getElementById('stat1Lbl')) document.getElementById('stat1Lbl').value = stats[0] ? stats[0].label : '';
        if (document.getElementById('stat2Val')) document.getElementById('stat2Val').value = stats[1] ? stats[1].value : '';
        if (document.getElementById('stat2Lbl')) document.getElementById('stat2Lbl').value = stats[1] ? stats[1].label : '';
        if (document.getElementById('stat3Val')) document.getElementById('stat3Val').value = stats[2] ? stats[2].value : '';
        if (document.getElementById('stat3Lbl')) document.getElementById('stat3Lbl').value = stats[2] ? stats[2].label : '';
        if (document.getElementById('stat4Val')) document.getElementById('stat4Val').value = stats[3] ? stats[3].value : '';
        if (document.getElementById('stat4Lbl')) document.getElementById('stat4Lbl').value = stats[3] ? stats[3].label : '';

        renderDocumentGrid();
        populateProcessingDropdown();
        populateBinderLists();
    }

    function setupDocumentIngestion() {
        const dropzone = document.getElementById('fileDropzone');
        const fileInput = document.getElementById('fileInput');

        if (dropzone) {
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });

            dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files.length) {
                    handleFilesUpload(e.dataTransfer.files);
                }
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', () => {
                if (fileInput.files.length) {
                    handleFilesUpload(fileInput.files);
                }
            });
        }

        const docSearchBox = document.getElementById('docSearchBox');
        if (docSearchBox) {
            docSearchBox.addEventListener('input', () => renderDocumentGrid());
        }
    }

    function handleFilesUpload(fileList) {
        const client = getActiveClient();
        if (!client) {
            alert('Please select or create a client first.');
            return;
        }

        Array.from(fileList).forEach(file => {
            const reader = new FileReader();
            const ext = file.name.split('.').pop().toLowerCase();
            const obfuscatedName = 'doc_sec_' + Math.random().toString(36).substring(2, 9) + '.' + ext;

            reader.onload = (e) => {
                const newDoc = {
                    id: 'doc_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    category: inferCategory(file.name),
                    authority: '',
                    issueDate: new Date().toISOString().split('T')[0],
                    expiryDate: '',
                    privacy: 'public',
                    fileType: ext,
                    fileName: obfuscatedName,
                    description: `Uploaded document file (${(file.size / 1024).toFixed(1)} KB)`,
                    dataUrl: e.target.result
                };

                client.documents.push(newDoc);
                saveDataToStorage();
                renderDocumentGrid();
                populateProcessingDropdown();
                populateBinderLists();
                showToast(`Uploaded "${file.name}" to vault!`);
            };

            reader.readAsDataURL(file);
        });
    }

    function inferCategory(filename) {
        const name = filename.toLowerCase();
        if (name.includes('aadhaar') || name.includes('identity') || name.includes('passport')) return 'Aadhaar & Identity';
        if (name.includes('pan') || name.includes('tax')) return 'PAN & Tax';
        if (name.includes('mark') || name.includes('grade') || name.includes('10th') || name.includes('12th')) return 'Academic Marksheets';
        if (name.includes('degree') || name.includes('bsc') || name.includes('msc') || name.includes('phd')) return 'Degree Certificates';
        if (name.includes('net') || name.includes('ielts') || name.includes('slet') || name.includes('score')) return 'Competitive Exam Credentials';
        if (name.includes('exp') || name.includes('service') || name.includes('appoint')) return 'Experience & Service';
        if (name.includes('paper') || name.includes('pub') || name.includes('research')) return 'Publications & Research';
        if (name.includes('lor') || name.includes('recommend') || name.includes('app')) return 'Applications & LORs';
        return 'Custom & Miscellaneous';
    }

    function renderDocumentGrid() {
        const client = getActiveClient();
        const grid = document.getElementById('docCardsGrid');
        const pillBar = document.getElementById('categoryPillBar');
        const docSearchBox = document.getElementById('docSearchBox');
        const query = docSearchBox ? docSearchBox.value.toLowerCase() : '';

        if (!client || !grid) return;

        const docs = client.documents || [];
        const categories = ['All', ...new Set(docs.map(d => d.category))];

        if (pillBar) {
            pillBar.innerHTML = categories.map(cat => `
                <button class="btn btn-secondary btn-sm ${cat === activeCategoryFilter ? 'active' : ''}" style="${cat === activeCategoryFilter ? 'background: var(--accent-emerald); color:#fff;' : ''}" data-cat="${escapeHtml(cat)}">
                    ${escapeHtml(cat)}
                </button>
            `).join('');

            pillBar.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeCategoryFilter = btn.dataset.cat;
                    renderDocumentGrid();
                });
            });
        }

        const filtered = docs.filter(d => {
            const matchesCat = activeCategoryFilter === 'All' || d.category === activeCategoryFilter;
            const matchesQuery = !query || d.title.toLowerCase().includes(query) || d.category.toLowerCase().includes(query);
            return matchesCat && matchesQuery;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No documents found in vault. Upload files above!</div>`;
            return;
        }

        grid.innerHTML = filtered.map(doc => {
            const isPdf = doc.fileType === 'pdf';
            return `
                <div class="doc-card">
                    <div class="doc-card-header">
                        ${isPdf ? `
                            <div class="doc-card-icon"><i class="fas fa-file-pdf text-rose-500"></i></div>
                        ` : `
                            <img src="${doc.dataUrl}" class="doc-card-thumb" alt="${escapeHtml(doc.title)}">
                        `}
                        <span class="doc-card-badge">${escapeHtml(doc.category)}</span>
                        <span class="doc-card-privacy"><i class="fas fa-lock-${doc.privacy === 'public' ? 'open' : 'lock'}"></i> ${doc.privacy}</span>
                    </div>
                    <div class="doc-card-body">
                        <div class="doc-card-title">${escapeHtml(doc.title)}</div>
                        <div class="doc-card-meta">
                            ${doc.authority ? `<span><i class="fas fa-building"></i> ${escapeHtml(doc.authority)}</span>` : ''}
                            <span><i class="fas fa-file-alt"></i> ${escapeHtml(doc.fileName)}</span>
                        </div>
                    </div>
                    <div class="doc-card-actions">
                        <button class="btn btn-secondary btn-sm edit-meta-btn" data-id="${doc.id}">
                            <i class="fas fa-edit"></i> Edit Metadata
                        </button>
                        <button class="btn btn-danger btn-sm delete-doc-btn" data-id="${doc.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.edit-meta-btn').forEach(btn => {
            btn.addEventListener('click', () => openMetadataModal(btn.dataset.id));
        });

        grid.querySelectorAll('.delete-doc-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteDocument(btn.dataset.id));
        });
    }

    function setupMetadataModal() {
        const modal = document.getElementById('docMetadataModal');
        const closeBtn = document.getElementById('closeMetadataModal');
        const cancelBtn = document.getElementById('cancelMetadataBtn');
        const saveBtn = document.getElementById('saveMetadataBtn');

        if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        if (cancelBtn && modal) cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

        if (saveBtn && modal) {
            saveBtn.addEventListener('click', () => {
                const docId = document.getElementById('editDocId').value;
                const client = getActiveClient();
                if (!client) return;

                const doc = client.documents.find(d => d.id === docId);
                if (doc) {
                    doc.title = document.getElementById('editDocTitle').value;
                    doc.category = document.getElementById('editDocCategory').value;
                    doc.authority = document.getElementById('editDocAuthority').value;
                    doc.issueDate = document.getElementById('editDocIssueDate').value;
                    doc.expiryDate = document.getElementById('editDocExpiryDate').value;
                    doc.privacy = document.getElementById('editDocPrivacy').value;
                    doc.description = document.getElementById('editDocDescription').value;

                    saveDataToStorage();
                    renderDocumentGrid();
                    populateProcessingDropdown();
                    modal.classList.remove('active');
                    showToast('Document metadata saved!');
                }
            });
        }
    }

    function openMetadataModal(docId) {
        const client = getActiveClient();
        if (!client) return;
        const doc = client.documents.find(d => d.id === docId);
        if (!doc) return;

        document.getElementById('editDocId').value = doc.id;
        document.getElementById('editDocTitle').value = doc.title || '';
        document.getElementById('editDocCategory').value = doc.category || 'Custom & Miscellaneous';
        document.getElementById('editDocAuthority').value = doc.authority || '';
        document.getElementById('editDocIssueDate').value = doc.issueDate || '';
        document.getElementById('editDocExpiryDate').value = doc.expiryDate || '';
        document.getElementById('editDocPrivacy').value = doc.privacy || 'public';
        document.getElementById('editDocDescription').value = doc.description || '';

        document.getElementById('docMetadataModal').classList.add('active');
    }

    function deleteDocument(docId) {
        const client = getActiveClient();
        if (!client) return;

        if (confirm('Are you sure you want to delete this document from vault?')) {
            client.documents = client.documents.filter(d => d.id !== docId);
            saveDataToStorage();
            renderDocumentGrid();
            populateProcessingDropdown();
            populateBinderLists();
            showToast('Document deleted.');
        }
    }

    function setupProcessingStudio() {
        const applyBtn = document.getElementById('applyProcessingBtn');
        const downloadBtn = document.getElementById('downloadCustomFileBtn');
        const docSelect = document.getElementById('processDocSelect');
        const presetSelect = document.getElementById('processPresetSelect');
        const formatSelect = document.getElementById('processFormatSelect');
        const widthInput = document.getElementById('customWidthPx');
        const heightInput = document.getElementById('customHeightPx');
        const lockAspectCb = document.getElementById('customLockAspect');
        const qualitySlider = document.getElementById('processQualitySlider');
        const qualityDisplay = document.getElementById('qualityValDisplay');
        const scaleBtns = document.querySelectorAll('.scale-btn');

        let originalImgWidth = 800;
        let originalImgHeight = 600;

        // Quality slider update display
        if (qualitySlider && qualityDisplay) {
            qualitySlider.addEventListener('input', () => {
                const pct = Math.round(parseFloat(qualitySlider.value) * 100);
                qualityDisplay.textContent = `${pct}% ${pct >= 80 ? '(High Quality)' : pct >= 50 ? '(Compressed)' : '(Low File Size)'}`;
            });
        }

        // When document is selected, load its original dimensions
        if (docSelect) {
            docSelect.addEventListener('change', () => {
                const client = getActiveClient();
                if (!client) return;
                const doc = client.documents.find(d => d.id === docSelect.value);
                if (doc && doc.dataUrl) {
                    const img = new Image();
                    img.onload = () => {
                        originalImgWidth = img.width;
                        originalImgHeight = img.height;
                        if (widthInput) widthInput.value = img.width;
                        if (heightInput) heightInput.value = img.height;
                    };
                    img.src = doc.dataUrl;
                }
            });
        }

        // Preset selection logic
        if (presetSelect) {
            presetSelect.addEventListener('change', () => {
                const preset = presetSelect.value;
                if (preset === 'passport') { if (widthInput) widthInput.value = 413; if (heightInput) heightInput.value = 531; }
                else if (preset === 'a4') { if (widthInput) widthInput.value = 595; if (heightInput) heightInput.value = 842; }
                else if (preset === 'idcard') { if (widthInput) widthInput.value = 504; if (heightInput) heightInput.value = 318; }
                else if (preset === 'square') { if (widthInput) widthInput.value = 500; if (heightInput) heightInput.value = 500; }
                else if (preset === 'fullhd') { if (widthInput) widthInput.value = 1920; if (heightInput) heightInput.value = 1080; }
                else if (preset === 'original') { if (widthInput) widthInput.value = originalImgWidth; if (heightInput) heightInput.value = originalImgHeight; }
            });
        }

        // Aspect ratio lock calculation
        if (widthInput && heightInput) {
            widthInput.addEventListener('input', () => {
                if (lockAspectCb && lockAspectCb.checked && originalImgWidth > 0) {
                    const ratio = originalImgHeight / originalImgWidth;
                    const w = parseInt(widthInput.value) || 0;
                    heightInput.value = Math.round(w * ratio);
                }
            });

            heightInput.addEventListener('input', () => {
                if (lockAspectCb && lockAspectCb.checked && originalImgHeight > 0) {
                    const ratio = originalImgWidth / originalImgHeight;
                    const h = parseInt(heightInput.value) || 0;
                    widthInput.value = Math.round(h * ratio);
                }
            });
        }

        // Quick scale buttons
        scaleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const scale = parseFloat(btn.dataset.scale);
                if (widthInput) widthInput.value = Math.round(originalImgWidth * scale);
                if (heightInput) heightInput.value = Math.round(originalImgHeight * scale);
            });
        });

        // Generate Custom Canvas Function
        function processCustomCanvas(callback) {
            const client = getActiveClient();
            const docId = docSelect ? docSelect.value : '';
            if (!client || !docId) {
                alert('Please select a document from the dropdown list.');
                return;
            }

            const doc = client.documents.find(d => d.id === docId);
            if (!doc || !doc.dataUrl) {
                alert('Selected document preview is unavailable.');
                return;
            }

            const targetWidth = parseInt(widthInput ? widthInput.value : 800) || originalImgWidth || 800;
            const targetHeight = parseInt(heightInput ? heightInput.value : 600) || originalImgHeight || 600;
            const targetFormat = formatSelect ? formatSelect.value : 'jpg';
            const quality = parseFloat(qualitySlider ? qualitySlider.value : 0.85);

            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.onload = () => {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, targetWidth, targetHeight);
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                if (targetFormat === 'pdf' && window.jspdf) {
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF(targetWidth > targetHeight ? 'l' : 'p', 'pt', [targetWidth, targetHeight]);
                    const imgData = canvas.toDataURL('image/jpeg', quality);
                    pdf.addImage(imgData, 'JPEG', 0, 0, targetWidth, targetHeight);
                    const pdfBlob = pdf.output('bloburl');
                    callback({ blobUrl: pdfBlob, dataUrl: imgData, fileType: 'pdf', fileName: `${doc.title}_${targetWidth}x${targetHeight}.pdf`, doc, targetWidth, targetHeight });
                } else {
                    let mimeType = 'image/jpeg';
                    let ext = 'jpg';
                    if (targetFormat === 'png') { mimeType = 'image/png'; ext = 'png'; }
                    if (targetFormat === 'webp') { mimeType = 'image/webp'; ext = 'webp'; }

                    const dataUrl = canvas.toDataURL(mimeType, quality);
                    callback({ dataUrl, fileType: ext, fileName: `${doc.title}_${targetWidth}x${targetHeight}.${ext}`, doc, targetWidth, targetHeight });
                }
            };
            img.src = doc.dataUrl;
        }

        // 1-Click Immediate Download Handler
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                processCustomCanvas((res) => {
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.href = res.blobUrl || res.dataUrl;
                    downloadAnchor.download = res.fileName;
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showToast(`Downloaded custom file: ${res.fileName}`);
                });
            });
        }

        // Save as Variant in Client Vault Handler
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                processCustomCanvas((res) => {
                    const client = getActiveClient();
                    const newDoc = {
                        id: 'doc_' + Date.now(),
                        title: `${res.doc.title} (${res.targetWidth}x${res.targetHeight} ${res.fileType.toUpperCase()})`,
                        category: res.doc.category,
                        authority: res.doc.authority,
                        issueDate: res.doc.issueDate,
                        expiryDate: res.doc.expiryDate,
                        privacy: res.doc.privacy,
                        fileType: res.fileType,
                        fileName: 'doc_custom_' + Math.random().toString(36).substring(2, 9) + '.' + res.fileType,
                        description: `Custom format variant: ${res.targetWidth}x${res.targetHeight} px`,
                        dataUrl: res.dataUrl || res.blobUrl
                    };

                    client.documents.push(newDoc);
                    saveDataToStorage();
                    renderDocumentGrid();
                    populateProcessingDropdown();

                    const previewArea = document.getElementById('processingPreviewArea');
                    const outputContent = document.getElementById('processingOutputContent');
                    if (previewArea) previewArea.style.display = 'block';
                    if (outputContent) {
                        outputContent.innerHTML = `<img src="${res.dataUrl || res.blobUrl}" style="max-width: 100%; max-height: 350px; border-radius: 8px; border: 1px solid var(--border-color);">`;
                    }
                    showToast(`Saved ${res.targetWidth}x${res.targetHeight} ${res.fileType.toUpperCase()} variant to client vault!`);
                });
            });
        }
    }

    function populateProcessingDropdown() {
        const select = document.getElementById('processDocSelect');
        const client = getActiveClient();
        if (!select || !client) return;

        select.innerHTML = `<option value="">-- Choose Uploaded Document --</option>` +
            (client.documents || []).map(d => `<option value="${d.id}">${escapeHtml(d.title)} (${d.category})</option>`).join('');
    }

    let binderQueue = [];

    function setupBinderStudio() {
        const buildBtn = document.getElementById('buildCombinedPdfBtn');
        if (!buildBtn) return;

        buildBtn.addEventListener('click', () => {
            const client = getActiveClient();
            if (!client || binderQueue.length === 0) {
                alert('Please select documents to include in the combined PDF queue.');
                return;
            }

            if (window.jspdf) {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
                pdf.setFontSize(18);
                pdf.text(client.fullName + ' - Official Document Dossier', 14, 20);
                pdf.setFontSize(11);
                pdf.text('Centralized Client Vault Package', 14, 28);
                pdf.line(14, 32, 196, 32);

                let y = 40;
                binderQueue.forEach((doc, idx) => {
                    pdf.setFontSize(13);
                    pdf.text(`${idx + 1}. ${doc.title}`, 14, y);
                    y += 6;
                    pdf.setFontSize(10);
                    pdf.text(`Category: ${doc.category} | Authority: ${doc.authority || 'N/A'}`, 14, y);
                    y += 12;
                    if (y > 270) {
                        pdf.addPage();
                        y = 20;
                    }
                });

                pdf.save(`${client.fullName.replace(/\s+/g, '_')}_Combined_Dossier.pdf`);
                showToast('Combined PDF Dossier exported successfully!');
            }
        });
    }

    function populateBinderLists() {
        const client = getActiveClient();
        const availList = document.getElementById('binderAvailableList');
        const queueList = document.getElementById('binderQueueList');

        if (!client || !availList || !queueList) return;

        const docs = client.documents || [];

        availList.innerHTML = docs.map(doc => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface); padding: 0.65rem; border-radius: 8px; border: 1px solid var(--border-color);">
                <div>
                    <div style="font-size: 0.85rem; font-weight: 600; color:#fff;">${escapeHtml(doc.title)}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(doc.category)}</div>
                </div>
                <button class="btn btn-primary btn-sm add-queue-btn" data-id="${doc.id}">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
        `).join('');

        availList.querySelectorAll('.add-queue-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const doc = docs.find(d => d.id === btn.dataset.id);
                if (doc && !binderQueue.some(q => q.id === doc.id)) {
                    binderQueue.push(doc);
                    renderBinderQueue();
                }
            });
        });

        renderBinderQueue();
    }

    function renderBinderQueue() {
        const queueList = document.getElementById('binderQueueList');
        if (!queueList) return;

        if (binderQueue.length === 0) {
            queueList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Queue is empty. Add documents from available list.</div>`;
            return;
        }

        queueList.innerHTML = binderQueue.map((doc, index) => `
            <div class="pdf-queue-item">
                <div class="pdf-queue-info">
                    <span style="font-weight: 700; color: var(--accent-emerald);">${index + 1}.</span>
                    <div>
                        <div style="font-size: 0.88rem; font-weight: 600; color:#fff;">${escapeHtml(doc.title)}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(doc.category)}</div>
                    </div>
                </div>
                <div class="pdf-queue-controls">
                    <button class="btn btn-secondary btn-sm remove-queue-btn" data-id="${doc.id}">
                        <i class="fas fa-times text-rose-400"></i>
                    </button>
                </div>
            </div>
        `).join('');

        queueList.querySelectorAll('.remove-queue-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                binderQueue = binderQueue.filter(q => q.id !== btn.dataset.id);
                renderBinderQueue();
            });
        });
    }

    function setupTemplateStudio() {
        const templateCards = document.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            card.addEventListener('click', () => {
                templateCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const client = getActiveClient();
                if (client) {
                    client.template = card.dataset.template;
                    saveDataToStorage();
                    showToast(`Template changed to ${card.dataset.template.toUpperCase()}`);
                }
            });
        });

        const siteSecurityMode = document.getElementById('siteSecurityMode');
        if (siteSecurityMode) {
            siteSecurityMode.addEventListener('change', (e) => {
                const client = getActiveClient();
                if (client) {
                    client.securityMode = e.target.value;
                    saveDataToStorage();
                }
            });
        }
    }

    function setupLivePreview() {
        const iframe = document.getElementById('previewIframe');
        const refreshBtn = document.getElementById('refreshPreviewBtn');
        const exportZipBtn = document.getElementById('exportZipBtn');
        const desktopBtn = document.getElementById('deviceDesktopBtn');
        const mobileBtn = document.getElementById('deviceMobileBtn');

        if (refreshBtn) refreshBtn.addEventListener('click', () => renderLivePreview());

        if (desktopBtn && iframe) {
            desktopBtn.addEventListener('click', () => {
                desktopBtn.classList.add('active');
                if (mobileBtn) mobileBtn.classList.remove('active');
                iframe.classList.remove('mobile-view');
            });
        }

        if (mobileBtn && iframe) {
            mobileBtn.addEventListener('click', () => {
                mobileBtn.classList.add('active');
                if (desktopBtn) desktopBtn.classList.remove('active');
                iframe.classList.add('mobile-view');
            });
        }

        if (exportZipBtn) exportZipBtn.addEventListener('click', () => exportClientZipPackage());

        const publishGithubBtn = document.getElementById('publishGithubBtn');
        if (publishGithubBtn) publishGithubBtn.addEventListener('click', () => publishClientToGithub());
    }

    function publishClientToGithub() {
        const client = getActiveClient();
        if (!client) {
            alert('Please select a client first.');
            return;
        }

        const clientDataJson = JSON.stringify({
            profile: {
                fullName: client.fullName,
                title: client.title,
                tagline: client.tagline,
                avatarUrl: client.avatarUrl,
                bio: client.bio,
                location: client.location,
                email: client.email,
                phone: client.phone,
                badges: client.badges,
                linkedin: client.linkedin,
                github: client.github,
                researchgate: client.researchgate,
                orcid: client.orcid,
                website: client.website,
                twitter: client.twitter,
                stats: client.stats,
                pin: client.pin
            },
            settings: {
                template: client.template || 'warm',
                securityMode: client.securityMode || 'public'
            },
            documents: (client.documents || []).filter(d => d.privacy !== 'private')
        }, null, 2);

        const indexHtml = document.getElementById('previewIframe').srcdoc || '<html><body>Vault Site</body></html>';
        const clientSlug = client.slug || client.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const payload = {
            clientSlug: clientSlug,
            clientName: client.fullName,
            files: {
                'index.html': indexHtml,
                'client.css': EMBEDDED_CLIENT_CSS,
                'client.js': EMBEDDED_CLIENT_JS,
                'site-data.json': clientDataJson
            },
            autoGitPush: true
        };

        const publishBtn = document.getElementById('publishGithubBtn');
        if (publishBtn) {
            publishBtn.disabled = true;
            publishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing Live Site...';
        }

        fetch('/api/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if (publishBtn) {
                publishBtn.disabled = false;
                publishBtn.innerHTML = '<i class="fas fa-rocket"></i> Publish & Launch Live Site';
            }

            if (data.success) {
                const banner = document.getElementById('githubDeployBanner');
                const liveLink = document.getElementById('githubLiveUrlLink');
                const openBtn = document.getElementById('openLiveUrlBtn');
                const copyBtn = document.getElementById('copyLiveUrlBtn');

                if (banner) banner.style.display = 'flex';
                if (liveLink) {
                    liveLink.href = data.liveUrl;
                    liveLink.textContent = data.liveUrl;
                }
                if (openBtn) openBtn.href = data.liveUrl;

                if (copyBtn) {
                    copyBtn.onclick = () => {
                        navigator.clipboard.writeText(data.liveUrl);
                        showToast('Live website link copied to clipboard!');
                    };
                }

                showToast(`Successfully published "${client.fullName}" live!`);
            } else {
                alert('Error publishing site: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(err => {
            if (publishBtn) {
                publishBtn.disabled = false;
                publishBtn.innerHTML = '<i class="fas fa-rocket"></i> Publish & Launch Live Site';
            }
            console.error('Publish API Exception:', err);
            const liveUrl = `${window.location.origin}/clients/${clientSlug}/`;
            const banner = document.getElementById('githubDeployBanner');
            const liveLink = document.getElementById('githubLiveUrlLink');
            const openBtn = document.getElementById('openLiveUrlBtn');

            if (banner) banner.style.display = 'flex';
            if (liveLink) {
                liveLink.href = liveUrl;
                liveLink.textContent = liveUrl;
            }
            if (openBtn) openBtn.href = liveUrl;
            showToast(`Generated Live Link: ${liveUrl}`);
        });
    }

    function renderLivePreview() {
        const iframe = document.getElementById('previewIframe');
        const client = getActiveClient();
        if (!iframe || !client) return;

        const clientDataJson = JSON.stringify({
            profile: {
                fullName: client.fullName,
                title: client.title,
                tagline: client.tagline,
                avatarUrl: client.avatarUrl,
                bio: client.bio,
                location: client.location,
                email: client.email,
                phone: client.phone,
                badges: client.badges,
                linkedin: client.linkedin,
                github: client.github,
                researchgate: client.researchgate,
                orcid: client.orcid,
                website: client.website,
                twitter: client.twitter,
                stats: client.stats,
                pin: client.pin
            },
            settings: {
                template: client.template || 'warm',
                securityMode: client.securityMode || 'public'
            },
            documents: (client.documents || []).filter(d => d.privacy !== 'private')
        });

        const templateHtml = `
<!DOCTYPE html>
<html lang="en" data-theme="${client.template || 'warm'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(client.fullName)} | Official Document Vault Portfolio</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>${EMBEDDED_CLIENT_CSS}</style>
</head>
<body>
    ${client.securityMode === 'pin' ? `
    <div id="lockScreen" class="lock-screen" style="display: flex;">
        <div class="lock-card">
            <div class="lock-icon"><i class="fas fa-user-lock"></i></div>
            <h2 style="font-size: 1.35rem; font-weight: 700;">Protected Document Vault</h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">This document portfolio is passcode protected. Enter PIN to access.</p>
            <input type="password" id="pinInput" class="search-input" placeholder="Enter 4-Digit PIN" style="text-align: center; font-size: 1.2rem;">
            <p id="pinError" style="color: #f43f5e; font-size: 0.8rem; display: none;">Invalid PIN code.</p>
            <button class="btn-card" id="unlockBtn" style="background: var(--accent-primary); color: #fff; justify-content: center; padding: 0.65rem;">
                Unlock Vault <i class="fas fa-key"></i>
            </button>
        </div>
    </div>
    ` : ''}

    <header class="site-header">
        <div class="container header-flex">
            <div class="brand-wrap">
                <div id="brandAvatarWrap">
                    ${client.avatarUrl ? `<img src="${client.avatarUrl}" class="brand-avatar" alt="${escapeHtml(client.fullName)}">` : `<div class="brand-avatar-placeholder"><i class="fas fa-user"></i></div>`}
                </div>
                <div>
                    <div class="brand-name">${escapeHtml(client.fullName)}</div>
                    <div class="brand-sub">Verified Digital Document Vault</div>
                </div>
            </div>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button class="btn-card" id="openGlobalCustomDownloadBtn">
                    <i class="fas fa-sliders-h text-emerald-500"></i> Custom Format & Size Studio
                </button>
                <button class="btn-card" id="openBinderBtn">
                    <i class="fas fa-file-pdf text-amber-500"></i> Combined PDF Binder
                </button>
            </div>
        </div>
    </header>

    <section class="hero-section">
        <div class="container hero-grid">
            <div>
                <div class="hero-profile-row">
                    <div id="heroAvatarWrap">
                        ${client.avatarUrl ? `<img src="${client.avatarUrl}" class="hero-avatar-large" alt="${escapeHtml(client.fullName)}">` : ''}
                    </div>
                    <div>
                        <h1 class="hero-title">${escapeHtml(client.fullName)}</h1>
                        <div class="hero-subtitle">${escapeHtml(client.title)}</div>
                        ${client.tagline ? `<div class="hero-tagline">${escapeHtml(client.tagline)}</div>` : ''}
                    </div>
                </div>
                <p class="hero-bio">${escapeHtml(client.bio)}</p>

                <div class="social-pill-row" id="socialPillRow"></div>
                <div class="badge-row" id="badgeContainer">
                    ${(client.badges || '').split(',').map(b => b.trim()).filter(Boolean).map(b => `<span class="status-pill"><i class="fas fa-award"></i> ${escapeHtml(b)}</span>`).join('')}
                </div>
            </div>

            <div class="hero-card">
                <h3 class="hero-card-title"><i class="fas fa-shield-alt text-emerald-500"></i> Vault Verification Card</h3>
                <div class="hero-card-item"><i class="fas fa-envelope"></i> ${escapeHtml(client.email || 'Email Verified')}</div>
                <div class="hero-card-item"><i class="fas fa-phone"></i> ${escapeHtml(client.phone || 'Phone On File')}</div>
                <div class="hero-card-item"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(client.location || 'Guwahati, India')}</div>
            </div>
        </div>
    </section>

    <div class="container">
        <div class="stats-grid" id="keyStatsGrid"></div>
    </div>

    <main class="container">
        <div class="filter-bar">
            <div class="filter-pills" id="categoryBar"></div>
            <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search document library...">
        </div>
        <section class="doc-grid-section">
            <div class="doc-grid" id="documentGrid"></div>
        </section>
    </main>

    <div class="lightbox-overlay" id="lightboxModal">
        <div class="lightbox-modal">
            <div class="lightbox-header">
                <h3 id="lightboxTitle">Document Preview</h3>
                <button class="btn-card" id="closeLightbox">&times;</button>
            </div>
            <div class="lightbox-body" id="lightboxBody"></div>
        </div>
    </div>

    <div class="lightbox-overlay" id="binderModal">
        <div class="lightbox-modal" style="max-width: 600px;">
            <div class="lightbox-header">
                <h3>Generate Combined PDF Dossier</h3>
                <button class="btn-card" id="closeBinder">&times;</button>
            </div>
            <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                <div id="binderDocList"></div>
                <button class="btn-card" id="compilePdfBtn" style="background: var(--accent-primary); color: #fff; justify-content: center; padding: 0.75rem;">
                    <i class="fas fa-file-download"></i> Download Combined PDF Dossier
                </button>
            </div>
        </div>
    </div>

    <div class="lightbox-overlay" id="customDownloadModal">
        <div class="lightbox-modal" style="max-width: 580px;">
            <div class="lightbox-header">
                <h3 style="font-size: 1.1rem; font-weight: 700;"><i class="fas fa-sliders-h text-emerald-500"></i> Custom Format & Size Download Studio</h3>
                <button class="btn-card" id="closeCustomDownload">&times;</button>
            </div>
            <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">Select Document to Customize</label>
                    <select id="clientModalDocSelect" class="search-input" style="width: 100%;"></select>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">Export Format</label>
                        <select id="clientModalFormat" class="search-input" style="width: 100%;">
                            <option value="jpg">Optimized JPG (.jpg)</option>
                            <option value="png">High-Res PNG (.png)</option>
                            <option value="pdf">PDF Document (.pdf)</option>
                            <option value="webp">WebP Compact (.webp)</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">Size Preset</label>
                        <select id="clientModalPreset" class="search-input" style="width: 100%;">
                            <option value="custom">Custom Dimensions</option>
                            <option value="original">Original Aspect Ratio</option>
                            <option value="passport">Passport Photo (35x45mm)</option>
                            <option value="a4">Standard A4 Document</option>
                            <option value="idcard">Identity Card (85x54mm)</option>
                            <option value="square">Square Aspect (1:1)</option>
                        </select>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-color);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-size: 0.8rem; font-weight: 700;">Exact Canvas Dimensions</span>
                        <label style="font-size: 0.75rem; color: var(--text-muted); cursor: pointer;">
                            <input type="checkbox" id="clientModalLockAspect" checked> Lock Aspect Ratio
                        </label>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                        <div>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">Width (px)</span>
                            <input type="number" id="clientModalWidth" class="search-input" value="800" style="width: 100%;">
                        </div>
                        <div>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">Height (px)</span>
                            <input type="number" id="clientModalHeight" class="search-input" value="600" style="width: 100%;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.35rem; margin-top: 0.65rem; flex-wrap: wrap;">
                        <button type="button" class="btn-card modal-scale-btn" data-scale="0.25">25%</button>
                        <button type="button" class="btn-card modal-scale-btn" data-scale="0.50">50%</button>
                        <button type="button" class="btn-card modal-scale-btn" data-scale="0.75">75%</button>
                        <button type="button" class="btn-card modal-scale-btn" data-scale="1.00">100%</button>
                        <button type="button" class="btn-card modal-scale-btn" data-scale="1.50">150%</button>
                    </div>
                </div>
                <div>
                    <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                        <span>Image Compression Quality</span>
                        <span id="clientModalQualityVal" style="color: var(--accent-primary); font-weight: 700;">85%</span>
                    </label>
                    <input type="range" id="clientModalQuality" min="0.1" max="1.0" step="0.05" value="0.85" style="width: 100%; accent-color: var(--accent-primary);">
                </div>
                <button class="btn-card" id="triggerClientCustomDownload" style="background: var(--accent-primary); color: #fff; justify-content: center; padding: 0.75rem; font-size: 0.95rem; font-weight: 700;">
                    <i class="fas fa-download"></i> 1-Click Download Custom File Now
                </button>
            </div>
        </div>
    </div>

    <script>
        window.CLIENT_DATA = ${clientDataJson};
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script>${EMBEDDED_CLIENT_JS}</script>
</body>
</html>
        `;

        iframe.srcdoc = templateHtml;
    }

    function exportClientZipPackage() {
        const client = getActiveClient();
        if (!client || !window.JSZip) {
            alert('JSZip library loading. Please wait a moment.');
            return;
        }

        const zip = new JSZip();
        const folderName = client.slug || 'client-vault-site';

        zip.file("site-data.json", JSON.stringify(client, null, 2));
        zip.file("README.md", `# ${client.fullName} - Personal Document Vault Website\n\nDeployment Package generated via Client Vault Generator Studio V1.\n\n## Quick Start\n1. Upload all files to GitHub Pages, Netlify, or Vercel.\n2. Open \`index.html\` in any web browser.\n`);

        const indexHtml = document.getElementById('previewIframe').srcdoc || '<html><body>Vault Site</body></html>';
        zip.file("index.html", indexHtml);
        zip.file("client.css", EMBEDDED_CLIENT_CSS);
        zip.file("client.js", EMBEDDED_CLIENT_JS);

        zip.generateAsync({ type: "blob" }).then(function (content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${folderName}_website_package.zip`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            showToast(`Exported 1-Click ZIP package for "${client.fullName}"!`);
        });
    }

    function generateSampleDocCanvas(title, subtitle, colorHex) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FAF9F5';
        ctx.fillRect(0, 0, 600, 400);

        ctx.fillStyle = colorHex;
        ctx.fillRect(0, 0, 600, 16);

        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 36, 560, 344);

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, 300, 160);

        ctx.fillStyle = '#475569';
        ctx.font = '16px sans-serif';
        ctx.fillText(subtitle, 300, 210);

        ctx.fillStyle = colorHex;
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('VERIFIED DIGITAL DOCUMENT VAULT', 300, 320);

        return canvas.toDataURL('image/png');
    }

    function showToast(msg) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle text-emerald-400"></i> ${escapeHtml(msg)}`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
})();
