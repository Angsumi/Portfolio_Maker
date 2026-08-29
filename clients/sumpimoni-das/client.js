
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
    setupLightbox();
    setupPdfBinder(docs);
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
    gridEl.innerHTML = stats.map(stat => `
        <div class="stat-box">
            <div class="stat-val">${escapeHtml(stat.value)}</div>
            <div class="stat-lbl">${escapeHtml(stat.label)}</div>
        </div>
    `).join('');
}

function renderCategories(docs) {
    const categoryBar = document.getElementById('categoryBar');
    if (!categoryBar) return;
    const categories = ['All', ...new Set(docs.map(d => d.category))];
    categoryBar.innerHTML = categories.map((cat, i) => `
        <button class="filter-pill-btn ${i === 0 ? 'active' : ''}" data-cat="${escapeHtml(cat)}">
            ${escapeHtml(cat)} (${cat === 'All' ? docs.length : docs.filter(d => d.category === cat).length})
        </button>
    `).join('');
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
        return `
            <div class="client-doc-card">
                <div class="card-header-box">
                    ${isPdf ? `
                        <div class="card-icon-big"><i class="fas fa-file-pdf text-rose-500"></i></div>
                    ` : `
                        <img src="${thumbUrl}" class="card-img-preview" alt="${escapeHtml(doc.title)}">
                    `}
                    <span class="card-cat-tag">${escapeHtml(doc.category)}</span>
                </div>
                <div class="card-body-box">
                    <div class="card-doc-title">${escapeHtml(doc.title)}</div>
                    <div class="card-doc-meta">
                        ${doc.authority ? `<span><i class="fas fa-building"></i> ${escapeHtml(doc.authority)}</span>` : ''}
                        ${doc.issueDate ? `<span><i class="fas fa-calendar-alt"></i> Issued: ${escapeHtml(doc.issueDate)}</span>` : ''}
                        ${doc.expiryDate ? `<span><i class="fas fa-hourglass-end"></i> Expires: ${escapeHtml(doc.expiryDate)}</span>` : ''}
                    </div>
                </div>
                <div class="card-action-bar">
                    <button class="btn-card preview-btn" data-url="${thumbUrl}" data-title="${escapeHtml(doc.title)}" data-type="${isPdf ? 'pdf' : 'img'}">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <a href="${thumbUrl}" download="${escapeHtml(doc.title)}.${doc.fileType || 'pdf'}" class="btn-card">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', () => openLightbox(btn.dataset.url, btn.dataset.title, btn.dataset.type));
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

function setupLightbox() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('closeLightbox');
    if (!modal) return;
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
}

function openLightbox(url, title, type) {
    const modal = document.getElementById('lightboxModal');
    const titleEl = document.getElementById('lightboxTitle');
    const bodyEl = document.getElementById('lightboxBody');
    if (!modal) return;
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) {
        if (type === 'pdf') {
            bodyEl.innerHTML = `<iframe src="${url}" style="width: 100%; height: 75vh; border: none; border-radius: 8px;"></iframe>`;
        } else {
            bodyEl.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: 8px;">`;
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
            binderList.innerHTML = docs.map(d => `
                <label style="display: flex; align-items: center; gap: 0.75rem; background: var(--bg-canvas); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer;">
                    <input type="checkbox" class="binder-checkbox" value="${d.id}" checked>
                    <div>
                        <strong style="display: block; font-size: 0.9rem; color: var(--text-main);">${escapeHtml(d.title)}</strong>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(d.category)}</span>
                    </div>
                </label>
            `).join('');
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
                    doc.text(`${i + 1}. ${d.title} (${d.category})`, 14, yPos);
                    yPos += 8;
                    if (d.authority) doc.text(`   Authority: ${d.authority}`, 14, yPos), yPos += 6;
                    if (d.issueDate) doc.text(`   Issued: ${d.issueDate}`, 14, yPos), yPos += 6;
                    yPos += 10;
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });

                doc.save(`${(window.CLIENT_DATA && window.CLIENT_DATA.profile ? window.CLIENT_DATA.profile.fullName : 'Client').replace(/\s+/g, '_')}_Document_Dossier.pdf`);
                binderModal.classList.remove('active');
            } else {
                alert('PDF compilation library ready.');
            }
        });
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
