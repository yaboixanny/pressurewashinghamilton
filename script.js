document.addEventListener('DOMContentLoaded', function(){
  // Set current year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // Scroll animations
  const observerOptions = {threshold: 0.15, rootMargin: '0px 0px -100px 0px'};
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });

  // Accordion behavior
  document.querySelectorAll('[data-accordion] .accordion-item').forEach(item => {
    const btn = item.querySelector('.accordion-toggle');
    const panel = item.querySelector('.accordion-panel');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close others if needed
      item.parentElement.querySelectorAll('.accordion-toggle').forEach(b=>{
        b.setAttribute('aria-expanded','false');
        b.nextElementSibling.style.maxHeight = null;
      });
      if(!expanded){
        btn.setAttribute('aria-expanded','true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
    // initialize collapsed
    btn.setAttribute('aria-expanded','false');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // Contact form handler (stub)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      if(!name || !phone){
        alert('Please provide your name and phone number.');
        return;
      }
      // TODO: replace with real submission (fetch to server or form provider)
      form.reset();
      alert('Thanks! Your request was sent. We will contact you shortly.');
    });
  }
});
