(function () {
    /* Prevent pinch-zoom on iOS at the JS level */
    document.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
    }, { passive: false });

    /* ─── Helpers ─── */
    function scrollToContact() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
    window.scrollToContact = scrollToContact;

    /* ─── Theme ─── */
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    function updateThemeIcons(theme) {
        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        if (themeToggle) themeToggle.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i>`;
        if (mobileThemeToggle) mobileThemeToggle.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i>`;
    }

    function toggleTheme() {
        const current = htmlEl.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    /* ─── AOS ─── */
    AOS.init({ duration: 800, once: false, offset: 80, easing: 'ease-out-cubic', mirror: true });

    /* ─── Loader ─── */
    window.addEventListener('load', () => {
        setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1200);
        setTimeout(triggerSplashAnimation, 150);
    });

    /* ─── Nav scroll ─── */
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        progressBar.style.width = Math.min(scrolled * 100, 100) + '%';
    }, { passive: true });

    /* ─── Splash Animation ─── */
    function triggerSplashAnimation() {
        ['splashBadge', 'splashGreeting', 'splashName', 'splashTitle', 'splashCta', 'splashHint']
            .forEach(id => document.getElementById(id)?.classList.add('visible'));
    }

    /* ─── Mobile Nav ─── */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');

    function openMobileNav() {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }

    function closeMobileNav() {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    window.closeMobileNav = closeMobileNav;

    mobileToggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openMobileNav(); });
    mobileClose.addEventListener('click', closeMobileNav);
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));
    mobileNav.addEventListener('click', (e) => { if (e.target === mobileNav) closeMobileNav(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileNav.classList.contains('open')) closeMobileNav();
            if (document.getElementById('lightbox').classList.contains('open')) closeLightbox();
        }
        if (document.getElementById('lightbox').classList.contains('open')) {
            if (e.key === 'ArrowLeft') lbStep(-1);
            if (e.key === 'ArrowRight') lbStep(1);
        }
    });

    /* ─── Marquee ─── */
    const items = ['UI Design', 'Brand Identity', 'Typography', 'Visual Storytelling', 'Figma', 'Illustration', 'User Experience', 'Creative Direction', 'Graphic Design', 'Color Theory'];
    const track = document.getElementById('marqueeTrack');
    const html = items.map(t => `<span class="marquee-item">${t} <span class="marquee-sep">✦</span></span>`).join('');
    track.innerHTML = html + html;

    /* ─── Photo Switch ─── */
    const photos = ['images/biju.jpeg', 'images/girl.jpeg'];
    let photoIdx = 0;
    const profileImg = document.getElementById('profileImg');
    profileImg.addEventListener('click', function () {
        photoIdx = (photoIdx + 1) % photos.length;
        this.style.opacity = '0';
        setTimeout(() => { this.src = photos[photoIdx]; this.style.opacity = '1'; }, 300);
    });

    /* ─── Designs Data ─── */
    const designs = [
        { image: "images/design1.jpeg", title: "Autumn Cosmetics", cat: "branding", featured: true },
        { image: "images/design2.jpeg", title: "Special Burger", cat: "branding", featured: false },
        { image: "images/design3.jpeg", title: "Victoria's Secret", cat: "branding", featured: false },
        { image: "images/design4.jpeg", title: "Maha Shivratri", cat: "illustration", featured: false },
        { image: "images/design5.jpeg", title: "Dharan", cat: "illustration", featured: false },
        { image: "images/design6.jpeg", title: "500 Error", cat: "illustration", featured: false },
        { image: "images/design7.jpeg", title: "Goldfish", cat: "illustration", featured: false },
        { image: "images/design8.jpeg", title: "Our Gang", cat: "illustration", featured: false },
        { image: "images/kid.jpeg", title: "Kid", cat: "illustration", featured: false },
        { image: "images/monkey.jpeg", title: "Monkey", cat: "illustration", featured: false },
        { image: "images/turtle.jpeg", title: "Turtle", cat: "illustration", featured: false },
        { image: "images/animals.jpeg", title: "Animals", cat: "illustration", featured: false },
        { image: "images/banana.jpeg", title: "Monkey & Banana", cat: "illustration", featured: false },
        { image: "images/happy.jpeg", title: "Watching Pencil", cat: "illustration", featured: false },
        { image: "images/kirati.jpeg", title: "Our Culture & Values", cat: "illustration", featured: false },
        { image: "images/martin.jpeg", title: "Edward Martin", cat: "illustration", featured: false },
        { image: "images/parrot.jpeg", title: "Parrot", cat: "illustration", featured: false },
        { image: "images/pencil.jpeg", title: "Work Load", cat: "illustration", featured: false },
    ];

    const ITEMS_PER_PAGE = 6;
    let currentPage = 1, activeFilter = 'all', lbFiltered = [], lbIndex = 0;
    function getFiltered() { return activeFilter === 'all' ? designs : designs.filter(d => d.cat === activeFilter); }

    /* ─── Lightbox ─── */
    window.openLightbox = (list, idx) => {
        lbFiltered = list; lbIndex = idx;
        const d = lbFiltered[lbIndex];
        const img = document.getElementById('lbImg');
        img.src = d.image;
        img.alt = d.title;
        document.getElementById('lbCaption').textContent = d.title;
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        document.getElementById('lightbox').classList.remove('open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    function lbStep(dir) {
        lbIndex = (lbIndex + dir + lbFiltered.length) % lbFiltered.length;
        const d = lbFiltered[lbIndex];
        const img = document.getElementById('lbImg');
        img.style.opacity = '0';
        setTimeout(() => { img.src = d.image; img.alt = d.title; document.getElementById('lbCaption').textContent = d.title; img.style.opacity = '1'; }, 280);
    }

    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    document.getElementById('lbPrev').addEventListener('click', (e) => { e.stopPropagation(); lbStep(-1); });
    document.getElementById('lbNext').addEventListener('click', (e) => { e.stopPropagation(); lbStep(1); });
    document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });

    /* Swipe support */
    let touchX = null;
    document.getElementById('lightbox').addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    document.getElementById('lightbox').addEventListener('touchend', (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1);
        touchX = null;
    });

    /* ─── Project Grid ─── */
    function renderGrid() {
        const filtered = getFiltered();
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) currentPage = 1;
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const slice = filtered.slice(start, start + ITEMS_PER_PAGE);
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = '';

        slice.forEach((d, i) => {
            const card = document.createElement('div');
            card.className = 'project-card' + (i === 0 && d.featured && activeFilter === 'all' ? ' featured' : '');
            card.setAttribute('role', 'listitem');
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-duration', '600');
            card.setAttribute('data-aos-offset', '60');
            card.setAttribute('data-aos-mirror', 'true');
            card.setAttribute('data-aos-delay', String(i * 80));
            card.innerHTML = `
            <div class="project-img-wrap">
              <img src="${d.image}" alt="${d.title} – ${d.cat} design by Bijay Rai" loading="lazy"
                onerror="this.src='https://placehold.co/600x400/e9d5ff/5e4b6e?text=${encodeURIComponent(d.title)}'">
              <div class="project-overlay">
                <div class="overlay-expand"><i class="fas fa-expand-alt" aria-hidden="true"></i></div>
              </div>
            </div>
            <div class="project-body">
              <div class="project-title">${d.title}</div>
              <div class="project-cat">${d.cat}</div>
            </div>`;
            card.addEventListener('click', () => openLightbox(filtered, start + i));
            grid.appendChild(card);
        });

        setTimeout(() => AOS.refresh(), 150);

        const wrap = document.getElementById('paginationWrap');
        if (totalPages <= 1) {
            wrap.innerHTML = `<div class="pg-info">${filtered.length} design${filtered.length !== 1 ? 's' : ''}</div>`;
            return;
        }

        let pgHtml = `<button class="pg-btn pg-arrow" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})" aria-label="Previous page"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>`;
        for (let p = 1; p <= totalPages; p++) {
            if (totalPages > 5 && p > 2 && p < totalPages - 1 && Math.abs(p - currentPage) > 1) {
                if (p === 3 || p === totalPages - 2) pgHtml += `<span class="pg-info">…</span>`;
                continue;
            }
            pgHtml += `<button class="pg-btn ${p === currentPage ? 'active' : ''}" onclick="changePage(${p})" aria-label="Page ${p}">${p}</button>`;
        }
        pgHtml += `<button class="pg-btn pg-arrow" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})" aria-label="Next page"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>`;
        pgHtml += `<span class="pg-info">${start + 1}–${Math.min(start + ITEMS_PER_PAGE, filtered.length)} of ${filtered.length}</span>`;
        wrap.innerHTML = pgHtml;
    }

    window.changePage = (p) => {
        currentPage = p;
        renderGrid();
        document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.getElementById('workFilter').addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeFilter = e.target.dataset.filter;
        currentPage = 1;
        renderGrid();
    });

    renderGrid();

})();
