(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Scroll-triggered animations using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add animation class to elements and observe them
  const animateElements = document.querySelectorAll('.features-grid, .download-card, .prompts-grid, .preview-window');
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Add staggered animation to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.classList.add('animate-on-scroll');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Add staggered animation to prompt categories
  const promptCats = document.querySelectorAll('.prompt-category');
  promptCats.forEach((cat, index) => {
    cat.classList.add('animate-on-scroll');
    cat.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(cat);
  });

  // GA Event Tracking
  const trackEvent = (action, category, label) => {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  };

  // Track download clicks
  const macDownload = document.getElementById('download-mac');
  const winDownload = document.getElementById('download-win');

  if (macDownload) {
    macDownload.addEventListener('click', () => {
      trackEvent('download', 'app', 'macos');
    });
  }

  if (winDownload) {
    winDownload.addEventListener('click', () => {
      trackEvent('download', 'app', 'windows');
    });
  }

  // Track navigation clicks
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('click', 'navigation', link.textContent.trim());
    });
  });

  // Track hero CTA clicks
  document.querySelectorAll('.hero-actions .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('click', 'cta', btn.textContent.trim());
    });
  });

  // Track feature card interactions
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || 'unknown';
      trackEvent('click', 'feature', title);
    });
  });

  // Track prompt category clicks
  document.querySelectorAll('.prompt-category').forEach(cat => {
    cat.addEventListener('click', () => {
      const label = cat.querySelector('.prompt-label')?.textContent || 'unknown';
      trackEvent('click', 'prompt_category', label);
    });
  });

  // Track scroll depth
  let scrollDepths = [25, 50, 75, 100];
  let trackedDepths = new Set();

  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        trackEvent('scroll', 'engagement', `${depth}%`);
      }
    });
  });
})();
