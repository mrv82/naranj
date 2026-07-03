// ===== PAGE LOADER =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.querySelector('.page-loader');
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      animateHero();
    }, 2200);
  });

  // Fallback if load takes too long
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (!loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      animateHero();
    }
  }, 4000);
});

// ===== HERO ENTRANCE ANIMATION =====
function animateHero() {
  const elements = [
    { el: '.hero-badge', delay: 100 },
    { el: '.hero h1', delay: 250 },
    { el: '.hero p', delay: 400 },
    { el: '.hero-buttons', delay: 550 }
  ];

  elements.forEach(({ el, delay }) => {
    const element = document.querySelector(el);
    if (element) {
      setTimeout(() => {
        element.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay);
    }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
}, { passive: true });

// ===== MOBILE MENU =====
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== PARALLAX EFFECT =====
const heroImg = document.querySelector('.hero-bg-image img');
const parallaxSections = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (heroImg && scrollY < window.innerHeight) {
    const translateY = scrollY * 0.3;
    heroImg.style.transform = `scale(1.1) translateY(${translateY}px)`;
  }
}, { passive: true });

// ===== MAGNETIC BUTTONS =====
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.3;

    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.15s ease-out';
  });
});

// ===== 3D TILT ON SERVICE CARDS =====
const tiltCards = document.querySelectorAll('.service-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;

    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Update CSS variable for radial gradient
    card.style.setProperty('--mouse-x', `${x * 100}%`);
    card.style.setProperty('--mouse-y', `${y * 100}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease-out';
  });
});

// ===== NUMBER COUNTER ON SCROLL =====
const counters = document.querySelectorAll('[data-count]');
let countersDone = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersDone) {
      countersDone = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-bar');
if (statsSection) counterObserver.observe(statsSection);

function animateCounters() {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(start + (target - start) * easedProgress);

      counter.textContent = prefix + currentValue.toLocaleString('fa-IR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// ===== MENU TABS =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.getAttribute('data-category');

    // Filter cards with animation
    menuCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category');

      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 80);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===== MENU ADD TO CART =====
const addBtns = document.querySelectorAll('.menu-add-btn');

addBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const cardBody = btn.closest('.menu-card-body');
    const name = cardBody.querySelector('h3').textContent;

    showToast(`${name} به سبد سفارش اضافه شد`);

    // Button animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 200);
  });
});

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;

  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ===== RESERVATION FORM =====
const reservationForm = document.querySelector('#reservationForm');

if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(reservationForm);
    const name = formData.get('name');

    // Simulate submission
    const submitBtn = reservationForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'در حال ثبت...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast(`${name} عزیز، رزرو شما با موفقیت ثبت شد ✓`);
      reservationForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== HOVER GLOW ON MENU CARDS =====
document.querySelectorAll('.menu-card, .contact-card, .review-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(178,34,52,0.04) 0%, rgba(232,168,56,0.015) 50%, rgba(255,248,240,0.025) 100%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(255, 248, 240, 0.025)';
  });
});

// ===== REVIEWS AUTO SCROLL =====
const reviewsSlider = document.querySelector('.reviews-slider');
let reviewScrollInterval;

function startReviewAutoScroll() {
  if (!reviewsSlider) return;

  reviewScrollInterval = setInterval(() => {
    const maxScroll = reviewsSlider.scrollWidth - reviewsSlider.clientWidth;
    const isRTL = document.documentElement.dir === 'rtl' || getComputedStyle(document.documentElement).direction === 'rtl';

    if (isRTL) {
      if (Math.abs(reviewsSlider.scrollLeft) >= maxScroll - 10) {
        reviewsSlider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        reviewsSlider.scrollBy({ left: -424, behavior: 'smooth' });
      }
    } else {
      if (reviewsSlider.scrollLeft >= maxScroll - 10) {
        reviewsSlider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        reviewsSlider.scrollBy({ left: 424, behavior: 'smooth' });
      }
    }
  }, 4000);
}

if (reviewsSlider) {
  startReviewAutoScroll();

  reviewsSlider.addEventListener('mouseenter', () => {
    clearInterval(reviewScrollInterval);
  });

  reviewsSlider.addEventListener('mouseleave', () => {
    startReviewAutoScroll();
  });
}

// ===== INTERSECTION-BASED CLASS TOGGLING FOR SECTION HEADERS =====
document.querySelectorAll('.section-tag').forEach(tag => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.5 });

  tag.style.opacity = '0';
  tag.style.transform = 'translateY(10px)';
  tag.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  observer.observe(tag);
});

// ===== PERSIAN NUMBER UTILITY =====
function toPersianNumber(num) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, d => persianDigits[d]);
}

// ===== CURRENT YEAR IN FOOTER =====
const yearEl = document.querySelector('#currentYear');
if (yearEl) {
  yearEl.textContent = toPersianNumber(new Date().getFullYear());
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// ===== GALLERY LIGHTBOX EFFECT (simple) =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(12,10,14,0.92); display: flex;
      align-items: center; justify-content: center;
      cursor: pointer; opacity: 0; transition: opacity 0.4s ease;
      backdrop-filter: blur(16px);
    `;

    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.alt = img.alt;
    imgClone.style.cssText = `
      max-width: 90%; max-height: 90vh; object-fit: contain;
      border-radius: 16px; transform: scale(0.9);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      border: 2px solid rgba(178,34,52,0.3);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;

    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      imgClone.style.transform = 'scale(1)';
    });

    overlay.addEventListener('click', () => {
      overlay.style.opacity = '0';
      imgClone.style.transform = 'scale(0.9)';
      setTimeout(() => overlay.remove(), 400);
    });
  });
});

// ===== PERFORMANCE: Reduce animations when reduced motion preferred =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.querySelectorAll('.bg-orb, .hero-float, .scroll-indicator').forEach(el => {
    el.style.animation = 'none';
  });
}
