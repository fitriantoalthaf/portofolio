/* script.js
   Interactions:
   - Hamburger menu
   - Smooth scrolling with sticky offset
   - Typing effect in hero
   - Reveal on scroll (Intersection Observer)
   - Progress bar animation
   - Contact form validation + simulated sending
   - Theme toggle (light/dark) persisted
   - Navbar change on scroll & scroll-to-top button
*/

/* Short helpers */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = $('#hamburger');
  const nav = $('#nav');
  const navLinks = $$('.nav-link');
  const themeToggle = $('#theme-toggle');
  const body = document.body;
  const typedEl = $('#typed');
  const revealEls = $$('.reveal');
  const progressEls = $$('.progress');
  const contactForm = $('#contact-form');
  const submitBtn = $('#submit-btn');
  const formFeedback = $('#form-feedback');
  const scrollTopBtn = $('#scrollTop');
  const navbar = $('#navbar');

  /* Hamburger */
  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      nav.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* Smooth scroll with navbar offset */
  function scrollToSection(evt){
    const a = evt.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    evt.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = navbar.offsetHeight;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset + 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', scrollToSection));

  /* Typing effect */
  const typedTexts = [
    'Digital Creative',
    'Graphic Designer',
    'Video Editor',
    'Content Creator'
  ];
  let tIndex = 0, cIndex = 0, forward = true;
  function typeLoop(){
    const text = typedTexts[tIndex];
    if (forward){ cIndex++; if (cIndex > text.length){ forward = false; setTimeout(typeLoop, 1200); return; } }
    else { cIndex--; if (cIndex < 0){ forward = true; tIndex = (tIndex+1) % typedTexts.length; setTimeout(typeLoop, 200); return; } }
    typedEl.textContent = text.substring(0, cIndex);
    setTimeout(typeLoop, forward ? 80 : 35);
  }
  if (typedEl) typeLoop();

  /* Reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('active');
        if (entry.target.matches('.progress')){
          const v = entry.target.dataset.value || 0;
          const bar = entry.target.querySelector('.progress-bar');
          if (bar) bar.style.width = `${v}%`;
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
  progressEls.forEach(el => io.observe(el));

  /* Contact form validation and simulate send */
  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.textContent = '';
    let hasError = false;
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    $('#error-name').textContent = '';
    $('#error-email').textContent = '';
    $('#error-message').textContent = '';

    if (!name){ $('#error-name').textContent = 'Nama wajib diisi.'; hasError = true; }
    if (!email || !validateEmail(email)){ $('#error-email').textContent = 'Email tidak valid.'; hasError = true; }
    if (!message || message.length < 10){ $('#error-message').textContent = 'Pesan minimal 10 karakter.'; hasError = true; }
    if (hasError) return;

    submitBtn.classList.add('loading');
    submitBtn.setAttribute('disabled', 'true');

    try {
      await new Promise(res => setTimeout(res, 1400)); // simulasi
      formFeedback.textContent = 'Pesan berhasil dikirim. Terima kasih!';
      formFeedback.style.color = 'var(--accent-2)';
      contactForm.reset();
    } catch (err) {
      formFeedback.textContent = 'Terjadi kesalahan, coba lagi.';
      formFeedback.style.color = '#cc3b2a';
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.removeAttribute('disabled');
    }
  });

  /* Theme toggle */
  function setTheme(mode){
    if (mode === 'dark') body.classList.add('dark');
    else body.classList.remove('dark');
    localStorage.setItem('portfolio-theme', mode);
  }
  const saved = localStorage.getItem('portfolio-theme') || 'light';
  setTheme(saved);
  themeToggle?.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  /* Navbar scrolled & active link & scroll top */
  function onScroll(){
    const y = window.scrollY;
    if (y > 40) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');

    if (y > 360) scrollTopBtn.style.display = 'flex'; else scrollTopBtn.style.display = 'none';

    const sections = ['home','about','projects','contact'];
    let current = 'home';
    for (const id of sections){
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= navbar.offsetHeight + 12) current = id;
    }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Footer year */
  $('#footer-year').textContent = new Date().getFullYear();

  /* Accessibility: close mobile nav on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){ nav.classList.remove('open'); hamburger?.setAttribute('aria-expanded', 'false'); }
  });
});