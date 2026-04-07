// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const form = document.getElementById('formKontak');
    const notif = document.getElementById('notifSukses');

    // --- 1. LOGIKA DARK MODE ---
    const checkDark = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    checkDark();

    darkModeBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });

    // --- 2. SCROLL SPY (Navigasi Menyala Saat Scroll) ---
    const onScroll = () => {
        let current = "";
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            if (scrollPos >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        // Navbar Shadow logic
        navbar.classList.toggle('nav-scrolled', scrollPos > 50);
    };

    window.addEventListener('scroll', onScroll);

    // --- 3. MOBILE MENU TOGGLE ---
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuBtn.innerHTML = isHidden ? 
            '<i class="fa-solid fa-bars-staggered"></i>' : 
            '<i class="fa-solid fa-xmark"></i>';
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        });
    });

    // --- 4. FORM HANDLING ---
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                form.classList.add('hidden');
                notif.classList.remove('hidden');
                setTimeout(() => {
                    notif.classList.add('hidden');
                    form.classList.remove('hidden');
                    btn.innerText = 'Kirim Pesan';
                    btn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }
});
