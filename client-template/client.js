// Standalone Client Document-Portfolio Web Engine v5 - Robust Custom Format & Size Studio

document.addEventListener('DOMContentLoaded', () => {
    const data = window.CLIENT_DATA || {};
    const profile = data.profile || {};
    const docs = data.documents || [];
    const settings = data.settings || {};

    // Security Lock Screen Check
    if (settings.securityMode === 'pin' && profile.pin) {
        checkSecurityLock(profile.pin);
    } else {
        const lockScreen = document.getElementById('lockScreen');
        if (lockScreen) lockScreen.style.display = 'none';
    }

    // Render Full Profile Details
    populateProfile(profile);

    // Render Key Statistics Grid
    renderKeyStats(profile.stats);

    // Render Categories & Document Catalog
    renderCategories(docs);
    renderDocuments(docs);

    // Filter, Lightbox, PDF Binder & Custom Download Handlers
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

    if (!stats || stats.length === 0) {
        gridEl.style.display = 'none';
        return;
    }

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
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No documents available in this category.</div>`;
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
                <div class="card-action-bar" style="flex-wrap: wrap; gap: 0.4rem;">
                    <button class="btn-card preview-btn" data-url="${thumbUrl}" data-title="${escapeHtml(doc.title)}" data-type="${isPdf ? 'pdf' : 'img'}" data-id="${doc.id}">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <button class="btn-card custom-dl-btn" data-id="${doc.id}">
                        <i class="fas fa-sliders-h text-emerald-500"></i> Custom Format/Size
                    </button>
                    <a href="${thumbUrl}" download="${escapeHtml(doc.title)}.${doc.fileType || 'pdf'}" class="btn-card">
                        <i class="fas fa-download"></i> Direct Download
                    </a>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openLightbox(btn.dataset.url, btn.dataset.title, btn.dataset.type, btn.dataset.id, docsToRender);
        });
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

    if (searchInput) {
        searchInput.addEventListener('input', () => filterDocs());
    }

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

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

function openLightbox(url, title, type, docId, docs) {
    const modal = document.getElementById('lightboxModal');
    const titleEl = document.getElementById('lightboxTitle');
    const bodyEl = document.getElementById('lightboxBody');
    if (!modal) return;

    if (titleEl) {
        titleEl.innerHTML = `
            <span>${escapeHtml(title)}</span>
            <button class="btn-card custom-dl-btn" data-id="${docId}" style="margin-left: 1rem; font-size: 0.78rem;">
                <i class="fas fa-sliders-h text-emerald-500"></i> Custom Download Options
            </button>
        `;
    }

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

    if (closeBinderBtn) {
        closeBinderBtn.addEventListener('click', () => binderModal.classList.remove('active'));
    }

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

function openCustomDownloadModalForDoc(docId, docs) {
    const modal = document.getElementById('customDownloadModal');
    const docSelect = document.getElementById('clientModalDocSelect');
    if (!modal) return;

    if (docSelect && docs && docs.length > 0) {
        docSelect.innerHTML = docs.map(d => `<option value="${d.id}" ${d.id === docId ? 'selected' : ''}>${escapeHtml(d.title)} (${d.category})</option>`).join('');
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

    // Global Header Button Listener
    if (globalOpenBtn) {
        globalOpenBtn.addEventListener('click', () => {
            const allDocs = (window.CLIENT_DATA && window.CLIENT_DATA.documents) ? window.CLIENT_DATA.documents : docs;
            if (allDocs && allDocs.length > 0) {
                openCustomDownloadModalForDoc(allDocs[0].id, allDocs);
            }
        });
    }

    // Document Selector listener
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

    // Size Preset selection listener
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

    // Aspect Ratio Lock handler
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

    // Quick scale buttons
    scaleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const scale = parseFloat(btn.dataset.scale);
            if (widthInput) widthInput.value = Math.round(origW * scale);
            if (heightInput) heightInput.value = Math.round(origH * scale);
        });
    });

    if (qualitySlider && qualityValEl) {
        qualitySlider.addEventListener('input', () => {
            qualityValEl.textContent = `${Math.round(parseFloat(qualitySlider.value) * 100)}%`;
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

            // PDF file fallback if target is PDF and already a PDF file
            if (targetFormat === 'pdf' && activeDoc.fileType === 'pdf' && activeDoc.filePath) {
                const link = document.createElement('a');
                link.href = activeDoc.filePath;
                link.download = `${activeDoc.title}.pdf`;
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
                    link.download = `${activeDoc.title}_${targetWidth}x${targetHeight}.pdf`;
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
                    link.download = `${activeDoc.title}_${targetWidth}x${targetHeight}.${ext}`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }
                modal.classList.remove('active');
            };
            img.onerror = () => {
                // Direct fallback download
                const link = document.createElement('a');
                link.href = imgSrc;
                link.download = `${activeDoc.title}.${activeDoc.fileType || 'jpg'}`;
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
