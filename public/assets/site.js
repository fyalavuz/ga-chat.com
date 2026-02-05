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
