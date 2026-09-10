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
        // Cek preferensi tema yang tersimpan di localStorage agar berfungsi ketika di-online-kan/refresh
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
    // DATA IDM TABLE
    // ==========================================================================
    const idmSections = [
        {
            indexName: "SOSIAL ( IKS )", radarId: "radar-iks",
            dimensions: [
                {
                    name: "KESEHATAN",
                    indicators: [
                        { pName: "Pelayanan Kesehatan", items: [
                            { name: "Jarak ke sarana kesehatan terdekat", val: 1.00, sp: false, p: false },
                            { name: "Ketersediaan Tenaga Kesehatan (bidan, Dokter dan Nakes Lain)", val: 0.60, sp: false, p: true }
                        ]},
                        { pName: "Keberdayaan Masyarakat Untuk Kesehatan", items: [
                            { name: "Akses ke poskesdes, polindes atau posyandu", val: 1.00, sp: false, p: false },
                            { name: "Tingkat Aktivitas Posyandu", val: 1.00, sp: false, p: false }
                        ]},
                        { pName: "Jaminan Kesehatan", items: [
                            { name: "Tingkat Kepesertaan BPJS", val: 0.60, sp: false, p: true }
                        ]}
                    ]
                },
                {
                    name: "PENDIDIKAN",
                    indicators: [
                        { pName: "Akses Pendidikan Dasar-Menengah", items: [
                            { name: "Akses Pendidikan SD/MI < 3 KM", val: 1.00, sp: false, p: false },
                            { name: "Akses Pendidikan SMP/MTs < 6 KM", val: 0.20, sp: true, p: false },
                            { name: "Akses Pendidikan SMA/SMK/MA < 6 KM", val: 0.20, sp: true, p: false }
                        ]},
                        { pName: "Akses Pendidikan Non Formal", items: [
                            { name: "Kegiatan PKBM/Paket A-B-C", val: 0.20, sp: true, p: false },
                            { name: "Kegiatan Kursus", val: 0.20, sp: true, p: false }
                        ]},
                        { pName: "Akses Pengetahuan Masyarakat", items: [
                            { name: "Taman Bacaan Masyarakat atau Perpustakaan Desa", val: 0.20, sp: true, p: false }
                        ]}
                    ]
                },
                {
                    name: "MODAL SOSIAL",
                    indicators: [
                        { pName: "Solidaritas Sosial", items: [
                            { name: "Kebiasaan Gotong Royong", val: 1.00, sp: false, p: false },
                            { name: "Keterbukaan Ruang Publik", val: 1.00, sp: false, p: false },
                            { name: "Terdapat Kelompok Olahraga", val: 0.80, sp: false, p: false },
                            { name: "Terdapat Kegiatan Olahraga", val: 0.40, sp: true, p: false }
                        ]},
                        { pName: "Toleransi", items: [
                            { name: "Keragaman Suku/Etnis di Desa", val: 0.20, sp: true, p: false },
                            { name: "Bahasa Sehari-hari Warga Desa", val: 1.00, sp: false, p: false },
                            { name: "Agama Mayoritas Warga Desa", val: 0.20, sp: true, p: false }
                        ]},
                        { pName: "Rasa Aman Warga Desa", items: [
                            { name: "Tersedianya Sarana Pos Kamling di Desa", val: 1.00, sp: false, p: false },
                            { name: "Partisipasi Warga Siskamling", val: 1.00, sp: false, p: false },
                            { name: "Kejadian Perkelahian Massal di Desa", val: 1.00, sp: false, p: false }
                        ]},
                        { pName: "Kesejahteraan Sosial", items: [
                            { name: "Terdapat Akses ke Sekolah Luar Biasa", val: 0.60, sp: true, p: false },
                            { name: "Terdapat Penyandang Kesejahteraan Sosial", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                },
                {
                    name: "PERMUKIMAN",
                    indicators: [
                        { pName: "Akses Air Bersih dan Layak Minum", items: [
                            { name: "Mayoritas Warga Memiliki Sumber Air Layak Minum", val: 1.00, sp: false, p: false },
                            { name: "Akses Warga Memiliki Air Mandi dan Mencuci", val: 1.00, sp: false, p: false }
                        ]},
                        { pName: "Akses Ke Fasilitas Sanitasi", items: [
                            { name: "Mayoritas Warga Memiliki Jamban", val: 1.00, sp: false, p: false },
                            { name: "Terdapat Tempat Pembuangan Sampah", val: 0.80, sp: false, p: false }
                        ]},
                        { pName: "Akses Ke Fasilitas Listrik", items: [
                            { name: "Jumlah Keluarga yang telah memiliki aliran listrik", val: 1.00, sp: false, p: false }
                        ]},
                        { pName: "Akses Fasilitas Informasi dan Komunikasi", items: [
                            { name: "Warga Memiliki Telepon seluler dan Sinyal Kuat", val: 1.00, sp: false, p: false },
                            { name: "Akses Internet di Kantor Desa", val: 1.00, sp: false, p: false },
                            { name: "Terdapat Akses Internet untuk warga", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                }
            ]
        },
        {
            indexName: "EKONOMI ( IKE )", radarId: "radar-ike",
            dimensions: [
                {
                    name: "KERAGAMAN PRODUKSI",
                    indicators: [
                        { pName: "Keragaman Produksi Masyarakat Desa", items: [
                            { name: "Terdapat Lebih dari Satu Jenis Kegiatan Ekonomi Penduduk", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                },
                {
                    name: "PERDAGANGAN",
                    indicators: [
                        { pName: "Tersedianya Pusat Perdagangan", items: [
                            { name: "Akses Penduduk ke Pusat Perdagangan", val: 0.20, sp: true, p: false },
                            { name: "Terdapat Pasar Desa", val: 0.20, sp: true, p: false },
                            { name: "Terdapat Sektor Perdagangan (warung minimarket)", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                },
                {
                    name: "AKSES DISTRIBUSI",
                    indicators: [
                        { pName: "Akses Distribusi Logistik", items: [
                            { name: "Terdapat Kantor Pos dan Jasa Logistik", val: 0.00, sp: true, p: false }
                        ]}
                    ]
                },
                {
                    name: "AKSES KREDIT",
                    indicators: [
                        { pName: "Akses Terhadap lembaga Keuangan dan Perkreditan", items: [
                            { name: "Tersedianya Lembaga Pebankan Umum dan BPR", val: 0.00, sp: true, p: false },
                            { name: "Akses Penduduk ke Kredit", val: 0.20, sp: true, p: false }
                        ]}
                    ]
                },
                {
                    name: "LEMBAGA EKONOMI",
                    indicators: [
                        { pName: "Lembaga Ekonomi", items: [
                            { name: "Tersedianya Lembaga Ekonomi Rakyat (Koperasi)/Bumdes", val: 0.60, sp: false, p: true },
                            { name: "Terdapat Usaha Kedai makanan, Restoran, Hotel dan Penginapan", val: 0.00, sp: true, p: false }
                        ]}
                    ]
                },
                {
                    name: "KETERBUKAAN WILAYAH",
                    indicators: [
                        { pName: "Keterbukaan Wilayah", items: [
                            { name: "Terdapat Moda (Angkutan Umum, Trayek Reguler dan Jam Operasi)", val: 0.20, sp: true, p: false },
                            { name: "Jalan yang Dapat Dilalui oleh Kendaraan Bermotor Roda Empat atau lebih", val: 1.00, sp: false, p: false },
                            { name: "Kualitas Jalan Desa", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                }
            ]
        },
        {
            indexName: "LINGKUNGAN ( IKL )", radarId: "radar-ikl",
            dimensions: [
                {
                    name: "KUALITAS LINGKUNGAN",
                    indicators: [
                        { pName: "Kualitas Lingkungan", items: [
                            { name: "Pencemaran Air, Tanah dan Udara", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                },
                {
                    name: "POTENSI DAN TANGGAP BENCANA",
                    indicators: [
                        { pName: "Potensi Rawan Bencana", items: [
                            { name: "Kejadian Bencana Alam (Banjir, Tanah Longsor, Kebakaran Hutan)", val: 1.00, sp: false, p: false }
                        ]}
                    ]
                }
            ]
        }
    ];
    const tableBody = document.querySelector("#idm-table-body tbody");
    if(tableBody) {
        let htmlStr = "";
        idmSections.forEach((section) => {
            let sectionRowspan = 0;
            section.dimensions.forEach(dim => {
                let dimRowspan = 0;
                dim.indicators.forEach(ind => { dimRowspan += ind.items.length; });
                dim.rowspan = dimRowspan;
                sectionRowspan += dimRowspan;
            });
            section.rowspan = sectionRowspan;
            section.dimensions.forEach((dim, dimIdx) => {
                dim.indicators.forEach((ind, indIdx) => {
                    ind.items.forEach((item, itemIdx) => {
                        htmlStr += `<tr>`;
                        
                        if (dimIdx === 0 && indIdx === 0 && itemIdx === 0) {
                            htmlStr += `<td rowspan="${section.rowspan}" class="dim-header">
                                <strong>${section.indexName}</strong>
                                <div id="${section.radarId}" class="mini-radar-container"></div>
                            </td>`;
                        }
                        if (indIdx === 0 && itemIdx === 0) {
                            htmlStr += `<td rowspan="${dim.rowspan}">${dim.name}</td>`;
                        }
                        if (itemIdx === 0) {
                            htmlStr += `<td rowspan="${ind.items.length}">${ind.pName}</td>`;
                        }
                        
                        htmlStr += `<td>${item.name}</td>`;
                        
                        let percent = item.val * 100;
                        htmlStr += `<td>
                            <div class="idm-progress-container">
                                <div class="idm-progress-track">
                                    <div class="idm-progress-fill" style="width: ${percent}%;"></div>
                                </div>
                                <span class="idm-val-text">${item.val.toFixed(2)}</span>
                            </div>
                        </td>`;
                        
                        let check = `<i class="fas fa-check idm-check"></i>`;
                        htmlStr += `<td class="text-center">${item.sp ? check : ''}</td>`;
                        htmlStr += `<td class="text-center">${item.p ? check : ''}</td>`;
                        htmlStr += `</tr>`;
                    });
                });
            });
        });
        tableBody.innerHTML = htmlStr;
    }
    // ==========================================================================
    // RENDER HIGHCHARTS - IDM MINI PIE & RADAR
    // ==========================================================================
    if (typeof Highcharts !== 'undefined') {
        if(document.getElementById('idm-mini-pie')) {
            Highcharts.chart('idm-mini-pie', {
                chart: { type: 'pie', backgroundColor: 'transparent', margin: [0,0,0,0] },
                title: { text: null },
                plotOptions: { pie: { innerSize: '0%', dataLabels: { enabled: false }, borderWidth: 0, showInLegend: false } },
                credits: { enabled: false }, tooltip: { enabled: false },
                series: [{ data: [ { name: 'IKS', y: 40.29, color: '#6AAED6' }, { name: 'IKE', y: 24.51, color: '#6A5ACD' }, { name: 'IKL', y: 35.64, color: '#5F77C8' } ] }]
            });
        }
        
        function createRadar(id, dataPoints) {
            if(document.getElementById(id)) {
                Highcharts.chart(id, {
                    chart: { polar: true, type: 'line', backgroundColor: 'transparent', margin: [0,0,0,0] },
                    title: { text: null }, pane: { size: '75%' },
                    xAxis: { categories: dataPoints.categories, tickmarkPlacement: 'on', lineWidth: 0, labels: { style: { fontSize: '6px', color: '#64748b' } } },
                    yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max: 1, tickInterval: 0.5, labels: { enabled: false } },
                    tooltip: { enabled: false }, legend: { enabled: false }, credits: { enabled: false },
                    series: [{ data: dataPoints.data, color: 'rgba(59, 130, 246, 0.5)', lineWidth: 1, marker: { enabled: false } }]
                });
            }
        }
        createRadar('radar-iks', { categories: ['KES','PEND','MODAL','PERMUKIMAN'], data: [0.8, 0.5, 0.7, 0.9] });
        createRadar('radar-ike', { categories: ['PROD','PERDAG','DIST','KREDIT','LEMBAGA','WILAYAH'], data: [1, 0.4, 0, 0.1, 0.3, 0.7] });
        createRadar('radar-ikl', { categories: ['KUALITAS','BENCANA'], data: [1, 0.5] });
    }
    // ==========================================================================
    // RENDER SDGS GRID
    // ==========================================================================
    const sdgsData = [
        { number: 1, title: "DESA TANPA KEMISKINAN", score: 53.90, color: "#E5243B", icon: "fas fa-users" },
        { number: 2, title: "DESA TANPA KELAPARAN", score: 39.68, color: "#DDA63A", icon: "fas fa-bowl-rice" },
        { number: 3, title: "DESA SEHAT DAN SEJAHTERA", score: 47.10, color: "#4C9F38", icon: "fas fa-heartbeat" },
        { number: 4, title: "PENDIDIKAN DESA BERKUALITAS", score: 36.65, color: "#C5192D", icon: "fas fa-user-graduate" },
        { number: 5, title: "KETERLIBATAN PEREMPUAN DESA", score: 33.33, color: "#FF3A21", icon: "fas fa-venus" },
        { number: 6, title: "DESA LAYAK AIR BERSIH DAN SANITASI", score: 59.04, color: "#26BDE2", icon: "fas fa-faucet-drip" },
        { number: 7, title: "DESA BERENERGI BERSIH DAN TERBARUKAN", score: 98.75, color: "#FCC30B", icon: "fas fa-solar-panel" },
        { number: 8, title: "PERTUMBUHAN EKONOMI DESA MERATA", score: 25.50, color: "#A21942", icon: "fas fa-chart-line" },
        { number: 9, title: "INFRASTRUKTUR DAN INOVASI DESA SESUAI KEBUTUHAN", score: 26.32, color: "#FD6925", icon: "fas fa-road" },
        { number: 10, title: "DESA TANPA KESENJANGAN", score: 33.03, color: "#DD1367", icon: "fas fa-balance-scale" },
        { number: 11, title: "KAWASAN PERMUKIMAN DESA AMAN DAN NYAMAN", score: 20.40, color: "#FD9D24", icon: "fas fa-home" },
        { number: 12, title: "KONSUMSI DAN PRODUKSI DESA SADAR LINGKUNGAN", score: 0.00, color: "#BF8B2E", icon: "fas fa-recycle" },
        { number: 13, title: "DESA TANGGAP PERUBAHAN IKLIM", score: 0.00, color: "#3F7E44", icon: "fas fa-cloud-sun-rain" },
        { number: 14, title: "DESA PEDULI LINGKUNGAN LAUT", score: 0.00, color: "#0A97D9", icon: "fas fa-water" },
        { number: 15, title: "DESA PEDULI LINGKUNGAN DARAT", score: 0.00, color: "#56C02B", icon: "fas fa-tree" },
        { number: 16, title: "DESA DAMAI BERKEADILAN", score: 81.27, color: "#00689D", icon: "fas fa-dove" },
        { number: 17, title: "KEMITRAAN UNTUK PEMBANGUNAN DESA", score: 0.00, color: "#19486A", icon: "fas fa-handshake" },
        { number: 18, title: "KELEMBAGAAN DESA DINAMIS DAN BUDAYA DESA ADAPTIF", score: 23.65, color: "#007586", icon: "fas fa-users-cog" }
    ];
    function getScoreColor(score) {
        if(score >= 75) return '#16a34a';
        if(score >= 50) return '#eab308';
        return '#dc2626';
    }
    const sdgsGrid = document.getElementById("sdgs-grid");
    if (sdgsGrid) {
        let sdgsHTML = "";
        let barChartData = [];
        let barChartCategories = [];
        sdgsData.forEach((item, index) => {
            const textColor = getScoreColor(item.score);
            const animDelay = index * 0.03;
            let formattedScore = item.score.toFixed(2).replace('.', ',');
            
            sdgsHTML += `
            <div class="sdg-card hover-popup" style="animation: fadeUp 0.5s ease forwards ${animDelay}s; opacity: 0;">
                <div class="sdg-header" style="background-color: ${item.color};">
                    <div class="sdg-num">${item.number}</div>
                    <div class="sdg-title">${item.title}</div>
                    <div class="sdg-icon"><i class="${item.icon}"></i></div>
                </div>
                <div class="sdg-body">
                    <div class="sdg-score-val" style="color: ${textColor};">${formattedScore}</div>
                </div>
            </div>
            `;
            
            barChartCategories.push(item.title);
            barChartData.push({ y: item.score, color: item.color, dataLabels: { enabled: true, format: '{y:,.2f}'.replace('.', ','), style: { fontWeight: '700' } } });
        });
        sdgsGrid.innerHTML = sdgsHTML;
        if (document.getElementById('sdgs-bar-chart') && typeof Highcharts !== 'undefined') {
            Highcharts.chart('sdgs-bar-chart', {
                chart: { type: 'column', backgroundColor: 'transparent' },
                title: { text: 'Skor 18 Goals SDGs Desa', style: { fontWeight: 'bold' } },
                subtitle: { text: 'Visualisasi data Skor 18 Goals SDGs Desa menggunakan Grafik Bar', style: { fontStyle: 'italic' } },
                xAxis: { categories: barChartCategories, labels: { rotation: -45, style: { fontSize: '8px', fontWeight: '500' } } },
                yAxis: { min: 0, max: 100, title: { text: null }, gridLineColor: '#f1f5f9' },
                legend: { enabled: false }, credits: { enabled: false },
                plotOptions: { column: { borderRadius: 2, borderWidth: 0 } },
                series: [{ name: 'Skor', data: barChartData }]
            });
        }
    }
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `@keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }`;
    document.head.appendChild(styleSheet);
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