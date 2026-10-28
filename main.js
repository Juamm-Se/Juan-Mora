(() => {
  document.documentElement.classList.remove('no-js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Año del footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Línea tipo terminal que rota
  const roles = [
    'Desarrollador Full Stack',
    'Análisis · Diseño · Código',
    'Soluciones con IA',
    'Learning · Building · Shipping'
  ];
  const roleEl = document.getElementById('role');
  if (roleEl && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % roles.length;
      roleEl.classList.remove('swap');
      void roleEl.offsetWidth; // reinicia la animación
      roleEl.textContent = roles[i];
      roleEl.classList.add('swap');
    }, 2600);
  }

  // Parallax suave con el mouse en el hero
  const hero = document.querySelector('.hero');
  const layers = document.querySelectorAll('.par');
  if (hero && layers.length && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    let frame = null;
    const move = (x, y) => {
      layers.forEach((el) => {
        const d = parseFloat(el.dataset.depth || '0');
        el.style.transform = `translate(${(x * d).toFixed(1)}px, ${(y * d * 0.7).toFixed(1)}px)`;
      });
    };
    hero.addEventListener('mousemove', (e) => {
      const b = hero.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => move(x, y));
    });
    hero.addEventListener('mouseleave', () => move(0, 0));
  }

  // Aparición de secciones al hacer scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('visible'));
  }
})();
