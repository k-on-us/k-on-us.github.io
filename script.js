document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Add staggered delay for photo items
        if (entry.target.classList.contains('photo-item')) {
          const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
          entry.target.style.transitionDelay = `${delay}ms`;
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll, .photo-item').forEach(el => {
    observer.observe(el);
  });

  // Photo hover effects with scale limitation
  const photoItems = document.querySelectorAll('.photo-item');
  photoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const img = item.querySelector('img');
      img.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
      const img = item.querySelector('img');
      img.style.transform = 'scale(1)';
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Enhanced parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');

    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;

    // Adjust opacity based on scroll
    const opacity = Math.max(0.8 - scrolled * 0.001, 0);
    hero.style.opacity = opacity;
  });

  // Add tilt effect to photo items
  const photoItems2 = document.querySelectorAll('.photo-item');

  photoItems2.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      item.style.transform = `perspective(1000px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * 5}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
});