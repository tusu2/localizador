/**
 * Viernes — Presentación Web
 * Ecosistema Jarvis de Gael Adrián de Santiago Uribe
 * 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initHelpCards();
  initSmoothScroll();
  initNavBackground();
  initIntersectionObserver();
});

/* ===== PARTÍCULAS DE FONDO ANIMADAS ===== */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Posición horizontal aleatoria
    particle.style.left = Math.random() * 100 + '%';

    // Tamaño aleatorio
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Duración de animación aleatoria
    const duration = Math.random() * 15 + 10;
    particle.style.animationDuration = duration + 's';

    // Retraso aleatorio para que no todas empiecen a la vez
    particle.style.animationDelay = Math.random() * 15 + 's';

    // Color aleatorio dentro del esquema
    const hue = Math.random() > 0.5 ? 260 : 280;
    particle.style.background = `hsl(${hue}, 70%, ${60 + Math.random() * 20}%)`;

    container.appendChild(particle);
  }
}

/* ===== CARDS INTERACTIVAS FLIP ===== */
function initHelpCards() {
  const cards = document.querySelectorAll('.help-card');

  cards.forEach((card) => {
    // Click: voltear
    card.addEventListener('click', (e) => {
      // Evitar múltiples clicks rápidos
      if (card.dataset.animating === 'true') return;
      card.dataset.animating = 'true';

      card.classList.toggle('flipped');

      // Cerrar otras cards abiertas
      cards.forEach((other) => {
        if (other !== card && other.classList.contains('flipped')) {
          other.classList.remove('flipped');
        }
      });

      setTimeout(() => {
        card.dataset.animating = 'false';
      }, 600);
    });

    // Teclado: Enter o Space para accesibilidad
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    // Hacer las cards focusables para accesibilidad
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');

    // Actualizar aria-expanded al flippear
    card.addEventListener('click', () => {
      const isFlipped = card.classList.contains('flipped');
      card.setAttribute('aria-expanded', isFlipped);
    });
  });

  // Cerrar card al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.help-card')) {
      cards.forEach((card) => {
        if (card.classList.contains('flipped') && card.dataset.animating !== 'true') {
          card.classList.remove('flipped');
          card.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

/* ===== NAVEGACIÓN SUAVE ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ===== NAVBAR: EFECTO DE OPACIDAD AL SCROLL ===== */
function initNavBackground() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.7)';
    }
  });
}

/* ===== INTERSECTION OBSERVER PARA ANIMACIONES DE ENTRADA ===== */
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar cards de capacidades
  document.querySelectorAll('.capability-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Observar cards de about
  document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Observar help cards
  document.querySelectorAll('.help-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

/* ===== TYPING EFFECT EN TERMINAL (solo visual, ya está en HTML) ===== */
// La terminal ya tiene el efecto visual con clases CSS.
// El cursor blink se maneja vía CSS.

/* ===== LOG CONSOLE (sutil, para desarrolladores) ===== */
console.log(
  '%c💻 Viernes %c| Asistente de Desarrollo e Ingeniería de Software',
  'font-size: 1.2em; font-weight: bold; color: #a29bfe;',
  'color: #e8e8ed;'
);
console.log(
  '%cCreado por Gael Adrián de Santiago Uribe — Proyecto Jarvis %c🚀',
  'color: #a0a0b8;',
  ''
);
console.log(
  '%c¿Eres developer? ¡Hola! Si estás viendo esto, eres de los nuestros. 👋',
  'color: #6b6b80; font-style: italic;'
);
