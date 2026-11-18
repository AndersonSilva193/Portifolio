/* Portfólio Anderson Silva: barra, aviso de cópia, sequências de quadros e cenas com GSAP. */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  /* ---------- Barra: sai do caminho ao descer, volta ao subir ---------- */
  const bar = document.getElementById('bar');
  let lastY = window.scrollY;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    bar.classList.toggle('is-scrolled', y > 8);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 160 && !bar.contains(document.activeElement)) bar.classList.add('is-hidden');
    else if (goingUp || y < 160) bar.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  bar.addEventListener('focusin', () => bar.classList.remove('is-hidden'));

  /* Link da seção atual sublinhado na barra */
  const navLinks = [...document.querySelectorAll('.bar-links a')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'sites', 'sistemas', 'contato'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Aviso (toast) ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2600);
  }

  /* ---------- Copiar e-mail ---------- */
  const copyBtn = document.getElementById('copyMail');
  if (copyBtn) {
    const label = copyBtn.querySelector('span');
    const mail = copyBtn.dataset.mail;
    copyBtn.addEventListener('click', async () => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(mail);
        ok = true;
      } catch (e) {
        const t = document.createElement('textarea');
        t.value = mail; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        t.remove();
      }
      if (ok) {
        copyBtn.classList.add('is-done');
        label.textContent = 'E-mail copiado';
        say('E-mail copiado. É só colar no seu app de e-mail.');
        setTimeout(() => { copyBtn.classList.remove('is-done'); label.textContent = mail; }, 2400);
      } else {
        say('Não deu para copiar. O e-mail é ' + mail + '.');
        window.location.href = 'mailto:' + mail;
      }
    });
  }

  /* ---------- Celulares: leve inclinação seguindo o ponteiro ---------- */
  if (window.matchMedia('(pointer: fine)').matches && !reduce.matches) {
    document.querySelectorAll('.phone').forEach((ph) => {
      const glass = ph.querySelector('.phone-glass');
      ph.addEventListener('pointermove', (e) => {
        const r = ph.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        glass.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
        glass.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
      });
      ph.addEventListener('pointerleave', () => {
        glass.style.setProperty('--ry', '0deg');
        glass.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ---------- Sequência de quadros num canvas ---------- */
  const pad = (n) => String(n).padStart(3, '0');

  function FrameSeq(screenEl, step) {
    const name = screenEl.dataset.seq;
    const total = +screenEl.dataset.framesD;
    const fv = parseFloat(getComputedStyle(screenEl).getPropertyValue('--focus'));
    let focus = (Number.isNaN(fv) ? 50 : fv) / 100;
    const canvas = screenEl.querySelector('canvas');
    const g = canvas.getContext('2d');
    const ids = []; /* no celular, um quadro a cada dois */
    for (let i = 0; i < total; i += step) ids.push(i);
    if (ids[ids.length - 1] !== total - 1) ids.push(total - 1);
    const urls = ids.map((i) => `img/seq/${name}/d_${pad(i)}.webp`);
    /* Onde a captura rola a página (data-shift="i:px", medido por tools/frame_shifts.py), o quadro i+1 é o i
       deslocado para cima. Ali o canvas desliza entre os dois em vez de fundir, que dava imagem dupla e salto. */
    const shifts = {};
    (screenEl.dataset.shift || '').split(/\s+/).forEach((p) => {
      const [i, s] = p.split(':').map(Number);
      if (s > 0) shifts[i] = s;
    });
    const shiftTop = +screenEl.dataset.shiftTop || 0; /* barra fixa do site: não rola */
    const scrollBetween = (a, b) => {
      let sum = 0;
      for (let i = ids[a]; i < ids[b]; i++) { if (!shifts[i]) return 0; sum += shifts[i]; }
      return sum;
    };
    const count = urls.length;
    const imgs = new Array(count);
    let pos = 0, shown = '', extra = 1, started = false, destroyed = false, raf = 0, sliding = false;
    let idle = 0, settleTween = null, seekVersion = 0;
    const settle = { v: 0 };
    function paint(im, alpha, dy = 0, band = 0) {
      const cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      const x = (cw - w) * focus; /* cobre, alinha pelo topo e respeita o foco horizontal */
      g.globalAlpha = alpha;
      if (band) g.drawImage(im, 0, 0, im.naturalWidth, band, x, 0, w, band * s);
      else g.drawImage(im, x, dy * s, w, h);
      g.globalAlpha = 1;
    }
    /* desenha o quadro atual e funde o vizinho na proporção da posição: o movimento fica contínuo entre quadros */
    function render(force) {
      raf = 0;
      if (destroyed) return;
      /* Interpola os vizinhos já decodificados, inclusive enquanto os demais carregam. */
      let a = Math.floor(pos), b = Math.ceil(pos);
      while (a >= 0 && !imgs[a]) a--;
      while (b < count && !imgs[b]) b++;
      if (a < 0 && b >= count) return;
      if (a < 0) a = b;
      if (b >= count) b = a;
      const f = a === b ? 0 : (pos - a) / (b - a);
      const key = a + ':' + b + ':' + f.toFixed(3) + ':' + focus.toFixed(3);
      if (key === shown && !force) return;
      const roll = a === b ? 0 : scrollBetween(a, b);
      sliding = roll > 0;
      if (sliding) {
        /* b por baixo, a deslizando por cima e b de novo na proporção: o conteúdo rola sem fantasma */
        paint(imgs[b], 1, (1 - f) * roll);
        paint(imgs[a], 1, -f * roll);
        if (f > 0) paint(imgs[b], f, (1 - f) * roll);
        if (shiftTop) { paint(imgs[a], 1, 0, shiftTop); if (f > 0) paint(imgs[b], f, 0, shiftTop); }
      } else {
        paint(imgs[a], 1);
        if (f > 0) paint(imgs[b], f);
      }
      shown = key;
      screenEl.classList.add('has-frames');
    }
    function draw(force) {
      if (destroyed) return;
      if (force) { if (raf) cancelAnimationFrame(raf); render(true); return; }
      if (!raf) raf = requestAnimationFrame(() => render(false));
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const k = Math.min(dpr * extra, 2880 / Math.max(canvas.clientWidth, 1)); /* teto: 2x a largura do quadro */
      const w = Math.round(canvas.clientWidth * k);
      const h = Math.round(canvas.clientHeight * k);
      if (w < 4 || h < 4) return;
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; draw(true); }
    }
    function load(i) {
      return new Promise((res) => {
        if (destroyed || imgs[i]) return res();
        const im = new Image();
        im.decoding = 'async';
        im.onload = async () => {
          try { await im.decode(); } catch (e) { /* onload já confirmou uma imagem válida */ }
          if (!destroyed) { imgs[i] = im; draw(); }
          res();
        };
        im.onerror = () => res(); /* quadro que falhou: o vizinho cobre */
        im.src = urls[i];
      });
    }
    async function batch(ids, size = 6) {
      for (let k = 0; k < ids.length; k += size) await Promise.all(ids.slice(k, k + size).map(load));
    }
    function start() {
      if (started || destroyed) return;
      started = true;
      resize();
      (async () => {
        await load(0);
        const all = urls.map((_, i) => i);
        await batch([count - 1, ...all.filter((i) => i % 8 === 0 && i !== count - 1)]);
        await batch(all);
      })();
    }
    window.addEventListener('resize', resize);

    return {
      count,
      start,
      setExtra(v) { extra = v; resize(); },
      setFocus(v) { if (Math.abs(v - focus) > 0.002) { focus = v; draw(true); } },
      seek(p) {
        const version = ++seekVersion;
        clearTimeout(idle);
        if (settleTween) { settleTween.kill(); settleTween = null; }
        pos = Math.max(0, Math.min(count - 1, p * (count - 1)));
        draw();
        /* Ao parar, deixa um quadro nítido. Uma nova rolagem cancela esse ajuste. */
        idle = setTimeout(() => {
          /* No trecho que rola o quadro já sai nítido; ajustar ali faria a página andar sozinha. */
          if (destroyed || !window.gsap || sliding || Math.abs(pos - Math.round(pos)) < 0.002) return;
          settle.v = pos;
          settleTween = gsap.to(settle, {
            v: Math.round(pos), duration: 0.2, ease: 'power2.out',
            onUpdate: () => {
              if (destroyed || version !== seekVersion) return;
              pos = settle.v;
              draw();
            },
          });
        }, 180);
      },
      destroy() {
        destroyed = true;
        clearTimeout(idle);
        if (settleTween) settleTween.kill();
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
      },
    };
  }

  /* Começa a baixar quando a tela chega perto da viewport */
  function lazyStart(seq, el) {
    if (!('IntersectionObserver' in window)) return seq.start();
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { seq.start(); io.disconnect(); }
    }, { rootMargin: '120% 0px' });
    io.observe(el);
  }

  /* ---------- Cenas com GSAP ---------- */
  function scenes() {
    if (!window.gsap || !window.ScrollTrigger) return; /* sem GSAP, a página continua completa e estática */
    gsap.registerPlugin(ScrollTrigger);

    /* Rolagem suavizada no desktop (no toque fica a rolagem nativa do aparelho) */
    let lenis = null;
    if (window.Lenis && !reduce.matches && !saveData && window.matchMedia('(pointer: fine)').matches) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute('href');
        const target = id === '#inicio' ? 0 : document.querySelector(id);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.4 });
        history.replaceState(null, '', id);
      });
    }

    const heroScreen = document.getElementById('heroScreen');
    const heroCopy = document.getElementById('heroCopy');
    const heroCaption = document.getElementById('heroCaption');
    const heroTag = document.getElementById('heroTag');
    const heroHint = document.getElementById('heroHint');
    const heroStage = document.getElementById('heroStage');
    const chapterScreens = [...document.querySelectorAll('.chapter-screen, .scrub-screen')];

    const mm = gsap.matchMedia();

    mm.add({
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767px)',
      motion: '(prefers-reduced-motion: no-preference)',
    }, (ctx) => {
      const { desktop, motion } = ctx.conditions;
      if (!motion || saveData) return; /* movimento reduzido: pôsteres estáticos */
      const step = desktop ? 1 : 2;
      const seqs = [];

      /* Assinatura: a tela do Açaí cresce até ocupar tudo e o copo enche sob o scroll */
      const hero = FrameSeq(heroScreen, step);
      seqs.push(hero);
      hero.start();

      /* No celular, ampliar pela altura corta a captura horizontal inteira. */
      const growScale = () => desktop
        ? Math.max(window.innerWidth / heroScreen.offsetWidth, window.innerHeight / heroScreen.offsetHeight) * 1.002
        : window.innerWidth / heroScreen.offsetWidth;
      const growShift = () => desktop ? window.innerHeight / 2 - (heroScreen.offsetTop + heroScreen.offsetHeight / 2) : 0;
      hero.setExtra(growScale());

      const lastFrame = 0.8; /* para antes da seção seguinte do site */
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate() {
          const p = this.progress();
          hero.seek(p * lastFrame);
          /* O recorte acompanha o mesmo progresso suavizado que amplia a tela. */
          if (!desktop) hero.setFocus(0.37 * gsap.parseEase('power2.inOut')(gsap.utils.clamp(0, 1, (p - 0.02) / 0.42)));
        },
        scrollTrigger: {
          trigger: heroStage,
          start: 'top top',
          end: desktop ? '+=230%' : '+=170%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: () => hero.setExtra(growScale()),
        },
      });
      if (desktop) {
        tl.to(heroCopy, { yPercent: -40, opacity: 0, duration: 0.16, ease: 'power2.in' }, 0)
          .to([heroCaption, heroHint], { y: 24, opacity: 0, duration: 0.1 }, 0)
          .to(heroScreen, { '--bezel-o': 0, duration: 0.2 }, 0.02)
          .fromTo(heroTag, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power3.out' }, 0.62);
      }
      tl.to(heroScreen, {
          scale: growScale,
          y: growShift,
          borderRadius: desktop ? 0 : 14,
          boxShadow: '0 0 0 0 rgba(0,0,0,0)',
          duration: 0.42,
          ease: 'power2.inOut',
        }, 0.02)
        .to({}, { duration: 0.28 });

      /* Capítulos: a cena entra, assenta e a página pausa enquanto o site roda inteiro */
      chapterScreens.forEach((el) => {
        const seq = FrameSeq(el, step);
        seqs.push(seq);
        lazyStart(seq, el);
        const chapter = el.closest('.chapter');
        const stage = chapter || el.closest('.panel');
        const bar = stage.querySelector('.scene-progress span');
        const playhead = { p: 0 };

        if (chapter) {
          gsap.timeline({
            scrollTrigger: { trigger: chapter, start: 'top 90%', end: 'top top', scrub: 1 },
          })
            .from(chapter.querySelector('.giant'), { yPercent: 38, opacity: 0.15, ease: 'power2.out' }, 0)
            .from(el, { y: 90, scale: 0.94, ease: 'power2.out' }, 0)
            .from(chapter.querySelector('.chapter-text'), { y: 40, opacity: 0, ease: 'power2.out' }, 0.35);
        }

        gsap.to(playhead, {
          p: 1, duration: 1, ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: chapter ? 'top top' : 'center center',
            end: chapter ? (desktop ? '+=170%' : '+=130%') : (desktop ? '+=110%' : '+=90%'),
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
          },
          onUpdate: () => {
            seq.seek(playhead.p);
            if (bar) bar.style.transform = 'scaleX(' + playhead.p.toFixed(4) + ')';
          },
        });
      });

      /* Títulos de seção sobem por trás de uma máscara */
      document.querySelectorAll('.reveal-line span').forEach((s) => {
        gsap.from(s, {
          yPercent: 104, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: s.parentElement, start: 'top 86%', once: true },
        });
      });

      /* Linha de celulares: aparece como lista, um depois do outro */
      gsap.from('.phones li', {
        y: 70, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07,
        scrollTrigger: { trigger: '.phones', start: 'top 85%', once: true },
      });

      return () => seqs.forEach((s) => s.destroy());
    });

    /* Recalcula depois que fonte e imagens assentam */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scenes);
  else scenes();
})();
