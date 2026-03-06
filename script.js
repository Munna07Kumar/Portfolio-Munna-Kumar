/* ============================================
   PORTFOLIO WEBSITE — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ————————————————————————————————
  // 1. TYPEWRITER EFFECT
  // ————————————————————————————————
  const typewriterEl = document.getElementById('typewriter');
  const phrases = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Open-Source Contributor',
    'Problem Solver',
    'Lifelong Learner',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_TYPING = 2000;
  const PAUSE_AFTER_DELETING = 500;

  function typewrite() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typewrite, PAUSE_AFTER_TYPING);
        return;
      }
      setTimeout(typewrite, TYPING_SPEED);
    } else {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typewrite, PAUSE_AFTER_DELETING);
        return;
      }
      setTimeout(typewrite, DELETING_SPEED);
    }
  }

  typewrite();

  // ————————————————————————————————
  // 2. NAVBAR — scroll effect & active link
  // ————————————————————————————————
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    // Scrolled state
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let currentSection = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ————————————————————————————————
  // 3. MOBILE NAV TOGGLE
  // ————————————————————————————————
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  // ————————————————————————————————
  // 4. SCROLL REVEAL (AOS-like)
  // ————————————————————————————————
  const aosElements = document.querySelectorAll('[data-aos]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  aosElements.forEach((el) => revealObserver.observe(el));

  // ————————————————————————————————
  // 5. SMOOTH SCROLL for anchor links
  // ————————————————————————————————
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ————————————————————————————————
  // 6. CONTACT FORM (demo handler)
  // ————————————————————————————————
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    // Simulate sending (replace with real API call)
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      showToast('Message sent successfully! 🎉', 'success');
      contactForm.reset();
      btn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      btn.disabled = false;
    }, 1500);
  });

  // ————————————————————————————————
  // 7. TOAST NOTIFICATION
  // ————————————————————————————————
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Styles
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      padding: '14px 28px',
      borderRadius: '12px',
      fontSize: '0.95rem',
      fontWeight: '600',
      zIndex: '9999',
      opacity: '0',
      transition: 'all 0.4s ease',
      background: type === 'success' ? '#1a1a2e' : '#2e1a1a',
      color: type === 'success' ? '#a78bfa' : '#f87171',
      border: `1px solid ${type === 'success' ? 'rgba(124,92,252,0.3)' : 'rgba(248,113,113,0.3)'}`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Animate out
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ————————————————————————————————
  // 8. PARALLAX on hero shapes
  // ————————————————————————————————
  const shapes = document.querySelectorAll('.shape');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 12;
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

});
