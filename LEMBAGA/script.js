document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // MENU MOBILE & SMOOTH SCROLL
    // ==========================================================================
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mainNav = document.getElementById("main-nav");
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }
    document.querySelectorAll('#main-nav a[href^="#"], .hero-buttons a[href^="#"], .quick-card[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                if (mainNav.classList.contains("active")) {
                    mainNav.classList.remove("active");
                }
                const headerOffset = document.getElementById('main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // ==========================================================================
    // TEMA GELAP / TERANG (DARK MODE TOGGLE)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // ==========================================================================
    // OWL MASCOT SYSTEM INTERAKTIF
    // ==========================================================================
    const OWL_IMAGES = [
        'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787852921/Desain_tanpa_judul-removebg-preview_rg07lx.png', 
        'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880579/Gemini_Generated_Image_2id6wx2id6wx2id6-removebg-preview_olwtbr.png', 
        'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880580/Gemini_Generated_Image_cc0pxrcc0pxrcc0p-removebg-preview_ttafa4.png', 
        'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880581/Gemini_Generated_Image_iihwgkiihwgkiihw-removebg-preview_idqap9.png', 
        'https://res.cloudinary.com/drxc5e7gf/image/upload/v1787880580/Gemini_Generated_Image_kginynkginynkgin-removebg-preview_iunykg.png'  
    ];
    const OWL_EFFECTS = [' ✨ ', ' ❓ ', ' ❗ ', ' ☁️ ', ' 💨 ', ''];
    
    let currentOwlIndex = 0;
    let owlSideLog = -1;
    const sysContainer = document.getElementById('owl-system');
    const wrap = document.getElementById('owl-wrapper');
    const img = document.getElementById('owl-img');
    const fx = document.getElementById('owl-fx');
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    function runOwlCycle() {
        if(isReducedMotion || !sysContainer) return;
        img.src = OWL_IMAGES[currentOwlIndex];
        currentOwlIndex = (currentOwlIndex + 1) % OWL_IMAGES.length;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const owlSize = vw < 768 ? 90 : 120;
        
        img.style.width = owlSize + 'px';
        img.style.height = owlSize + 'px';
        let side;
        do { side = randInt(0, 3); } while (side === owlSideLog);
        owlSideLog = side;
        let startX, startY, endX, endY, rot;
        let scaleX = 1;
        const marginPadding = rand(20, 150);
        const edgeMargin = 15;
        if(side === 0) { // ATAS
            startX = rand(marginPadding, vw - owlSize - marginPadding);
            startY = -owlSize - 50;
            endX = startX; endY = edgeMargin;
            rot = 180 + rand(-15, 15);
        } else if (side === 1) { // KANAN
            startX = vw + 50;
            startY = rand(marginPadding, vh - owlSize - marginPadding);
            endX = vw - owlSize - edgeMargin; endY = startY;
            rot = -90 + rand(-15, 15);
            if (Math.random() > 0.5) scaleX = -1;
        } else if (side === 2) { // BAWAH
            startX = rand(marginPadding, vw - owlSize - marginPadding);
            startY = vh + 50;
            endX = startX; endY = vh - owlSize - edgeMargin;
            rot = rand(-15, 15);
        } else if (side === 3) { // KIRI
            startX = -owlSize - 50;
            startY = rand(marginPadding, vh - owlSize - marginPadding);
            endX = edgeMargin; endY = startY;
            rot = 90 + rand(-15, 15);
            if (Math.random() > 0.5) scaleX = -1;
        }
        const animDuration = randInt(300, 600);
        const holdDuration = randInt(1000, 3000);
        const delayBeforeNext = randInt(2000, 5000);
        wrap.style.transition = 'none';
        wrap.style.transform = `translate(${startX}px, ${startY}px)`;
        wrap.style.opacity = '0';
        wrap.classList.remove('owl-sway');
        img.style.transform = `scaleX(${scaleX}) rotate(${rot}deg)`;
        
        fx.className = ''; fx.innerHTML = '';
        void wrap.offsetWidth; 
        wrap.style.transition = `all ${animDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
        wrap.style.transform = `translate(${endX}px, ${endY}px)`;
        wrap.style.opacity = '1';
        const chosenFx = OWL_EFFECTS[randInt(0, OWL_EFFECTS.length - 1)];
        if (chosenFx !== '') {
            setTimeout(() => {
                fx.innerHTML = chosenFx;
                fx.style.top = (side === 2) ? '10%' : '80%';
                fx.className = 'owl-fx-pop';
            }, animDuration / 2);
        }
        setTimeout(() => { wrap.classList.add('owl-sway'); }, animDuration);
        
        setTimeout(() => {
            wrap.classList.remove('owl-sway');
            wrap.style.transition = `all ${animDuration}ms ease-in`;
            wrap.style.transform = `translate(${startX}px, ${startY}px)`;
            img.style.transform = `scaleX(${scaleX}) scaleY(0.5) rotate(${rot}deg)`;
            wrap.style.opacity = '0';
            
            setTimeout(() => { runOwlCycle(); }, animDuration + delayBeforeNext);
        }, animDuration + holdDuration);
    }
    setTimeout(runOwlCycle, 2000);

    // ==========================================================================
    // LOGIN MODAL LOGIC
    // ==========================================================================
    const loginModal = document.getElementById("login-modal");
    const btnOpenLogin = document.getElementById("btn-open-login");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const btnCancelLogin = document.getElementById("btn-cancel-login");
    if (btnOpenLogin) { btnOpenLogin.addEventListener("click", () => { loginModal.style.display = "flex"; }); }
    const closeModal = () => { loginModal.style.display = "none"; };
    if(btnCloseModal) btnCloseModal.addEventListener("click", closeModal);
    if(btnCancelLogin) btnCancelLogin.addEventListener("click", closeModal);
});