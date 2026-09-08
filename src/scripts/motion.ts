import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const preciso = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let velocidade = 0;

function iniciarScroll() {
  if (reduzido) return null;

  const lenis = new Lenis({
    lerp: 0.075,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.8,
    smoothWheel: true,
  });

  lenis.on('scroll', (e: { velocity: number }) => {
    velocidade = e.velocity;
    ScrollTrigger.update();
  });

  gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href*="/#"]').forEach((link) => {
    link.addEventListener('click', (evento) => {
      const alvo = link.getAttribute('href')?.split('#')[1];
      if (!alvo) return;
      const destino = document.getElementById(alvo);
      if (!destino) return;
      evento.preventDefault();
      lenis.scrollTo(destino, { offset: -20 });
    });
  });

  return lenis;
}

function iniciarPreloader(lenis: Lenis | null) {
  const tela = document.getElementById('preloader');

  const liberar = () => {
    document.body.classList.add('is-loaded');
    document.dispatchEvent(new CustomEvent('mc:pronto'));
    lenis?.start();
    ScrollTrigger.refresh();
  };

  if (!tela) {
    liberar();
    return;
  }

  const contador = document.getElementById('preloader-count');
  const barra = document.getElementById('preloader-bar');
  const jaVisto = sessionStorage.getItem('mc-intro') === '1';

  if (jaVisto || reduzido) {
    tela.remove();
    liberar();
    return;
  }

  lenis?.stop();
  sessionStorage.setItem('mc-intro', '1');

  const estado = { valor: 0 };
  const linha = gsap.timeline({
    onComplete: () => {
      tela.remove();
      liberar();
    },
  });

  linha
    .to(estado, {
      valor: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(estado.valor);
        if (contador) contador.textContent = String(v);
        if (barra) barra.style.width = `${v}%`;
      },
    })
    .to(tela.querySelectorAll('span, p, svg'), {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.04,
    })
    .to(tela, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.15');
}

function iniciarReveals() {
  const alvos = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!alvos.length) return;

  alvos.forEach((alvo) => {
    alvo.querySelectorAll<HTMLElement>('.reveal-line, .fade-up').forEach((filho, i) => {
      filho.style.setProperty('--d', `${i * 90}ms`);
    });
  });

  if (reduzido) {
    alvos.forEach((alvo) => alvo.classList.add('is-ready'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-ready');
        observador.unobserve(entrada.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );

  alvos.forEach((alvo) => {
    if (alvo.dataset.reveal === 'hero') {
      document.addEventListener('mc:pronto', () => alvo.classList.add('is-ready'), { once: true });
      return;
    }
    observador.observe(alvo);
  });
}

function iniciarParallax() {
  if (reduzido) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((alvo) => {
    const forca = Number(alvo.dataset.parallax || 60);
    gsap.fromTo(
      alvo,
      { y: -forca },
      {
        y: forca,
        ease: 'none',
        scrollTrigger: {
          trigger: alvo.parentElement,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

function iniciarImagens() {
  if (reduzido) return;

  document.querySelectorAll<HTMLElement>('[data-img]').forEach((moldura) => {
    const midia = moldura.querySelector<HTMLElement>('img, video');
    if (!midia) return;

    gsap.fromTo(
      moldura,
      { clipPath: 'inset(14% 14% 14% 14%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: moldura,
          scrub: 0.6,
          start: 'top 92%',
          end: 'top 42%',
          invalidateOnRefresh: true,
        },
      },
    );

    gsap.fromTo(
      midia,
      { scale: 1.3 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: moldura,
          scrub: 0.6,
          start: 'top bottom',
          end: 'top 25%',
          invalidateOnRefresh: true,
        },
      },
    );
  });

  document.querySelectorAll<HTMLElement>('[data-scale]').forEach((alvo) => {
    gsap.fromTo(
      alvo,
      { scale: 1.25 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: alvo, scrub: true, start: 'top bottom', end: 'top 25%' },
      },
    );
  });
}

function iniciarSkew() {
  const alvos = document.querySelectorAll<HTMLElement>('[data-skew]');
  if (!alvos.length || reduzido) return;

  const aplicar = Array.from(alvos).map((alvo) =>
    gsap.quickTo(alvo, 'skewY', { duration: 0.6, ease: 'power3' }),
  );

  gsap.ticker.add(() => {
    const angulo = gsap.utils.clamp(-5, 5, velocidade * 0.32);
    aplicar.forEach((set) => set(angulo));
  });
}

function iniciarHorizontal() {
  document.querySelectorAll<HTMLElement>('[data-horizontal]').forEach((secao) => {
    const trilho = secao.querySelector<HTMLElement>('[data-horizontal-track]');
    const viewport = secao.querySelector<HTMLElement>('[data-horizontal-viewport]');
    if (!trilho || !viewport) return;

    if (reduzido || !window.matchMedia('(min-width: 768px)').matches) {
      secao.classList.add('is-nativo');
      return;
    }

    const distancia = () => Math.max(0, trilho.scrollWidth - viewport.clientWidth);

    gsap.to(trilho, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: () => `+=${distancia() + window.innerHeight * 0.4}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });

    const legenda = secao.querySelector<HTMLElement>('[data-horizontal-progress]');
    if (legenda) {
      gsap.to(legenda, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: secao,
          start: 'top top',
          end: () => `+=${distancia() + window.innerHeight * 0.4}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }
  });
}

function iniciarProgresso() {
  const barra = document.getElementById('scroll-progress');
  if (!barra) return;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => gsap.set(barra, { scaleX: self.progress }),
  });
}

function iniciarCursor() {
  const cursor = document.getElementById('cursor');
  const anel = document.getElementById('cursor-ring');
  const ponto = document.getElementById('cursor-dot');
  const rotulo = document.getElementById('cursor-label');
  if (!cursor || !anel || !ponto || !rotulo || !preciso || reduzido) return;

  gsap.set([anel, ponto], { xPercent: -50, yPercent: -50 });

  const anelX = gsap.quickTo(anel, 'x', { duration: 0.55, ease: 'power3' });
  const anelY = gsap.quickTo(anel, 'y', { duration: 0.55, ease: 'power3' });
  const pontoX = gsap.quickTo(ponto, 'x', { duration: 0.12, ease: 'power3' });
  const pontoY = gsap.quickTo(ponto, 'y', { duration: 0.12, ease: 'power3' });

  let visivel = false;
  let px = -1;
  let py = -1;

  const base =
    'absolute left-0 top-0 grid place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';

  const estados: Record<string, { classe: string; rotulo: string }> = {
    padrao: { classe: 'size-10 border-ink/35', rotulo: '' },
    link: { classe: 'size-16 border-ink/20 bg-ink/5', rotulo: '' },
    view: { classe: 'size-24 border-lime bg-lime', rotulo: 'Ver' },
    drag: { classe: 'size-24 border-lime bg-lime', rotulo: 'Arraste' },
  };

  let atual = '';

  const aplicar = (chave: string) => {
    if (chave === atual) return;
    atual = chave;
    const estado = estados[chave] ?? estados.padrao;
    anel.className = `${base} ${estado.classe}`;
    rotulo.textContent = estado.rotulo;
    gsap.to(ponto, { opacity: estado.rotulo ? 0 : 1, duration: 0.2 });
    gsap.to(rotulo, {
      opacity: estado.rotulo ? 1 : 0,
      scale: estado.rotulo ? 1 : 0.75,
      duration: 0.3,
    });
  };

  aplicar('padrao');

  const resolver = () => {
    if (px < 0) return;
    const sob = document.elementFromPoint(px, py);
    const alvo = sob?.closest<HTMLElement>('[data-cursor], a, button');
    if (!alvo || alvo.hasAttribute('disabled')) {
      aplicar('padrao');
      return;
    }
    aplicar(alvo.dataset.cursor || 'link');
  };

  let agendado = false;
  const agendar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      resolver();
    });
  };

  window.addEventListener('mousemove', (evento) => {
    px = evento.clientX;
    py = evento.clientY;
    if (!visivel) {
      visivel = true;
      gsap.set([anel, ponto], { x: px, y: py });
      cursor.classList.remove('opacity-0');
    }
    anelX(px);
    anelY(py);
    pontoX(px);
    pontoY(py);
    agendar();
  });

  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar);
  document.addEventListener('mc:pronto', agendar);

  document.addEventListener('mouseleave', () => {
    px = -1;
    py = -1;
    aplicar('padrao');
    cursor.classList.add('opacity-0');
    visivel = false;
  });

  document.addEventListener('mouseenter', () => {
    if (px >= 0) cursor.classList.remove('opacity-0');
  });
}

function iniciarPreviewProjetos() {
  const indice = document.querySelector<HTMLElement>('[data-project-index]');
  const preview = document.querySelector<HTMLElement>('[data-project-preview]');
  if (!indice || !preview || !preciso || reduzido) return;

  const slides = preview.querySelectorAll<HTMLImageElement>('[data-preview-slide]');
  const linhas = indice.querySelectorAll<HTMLElement>('[data-project-row]');

  const carregar = new IntersectionObserver(
    (entradas) => {
      if (!entradas.some((entrada) => entrada.isIntersecting)) return;
      slides.forEach((slide) => {
        const fonte = slide.dataset.previewSrc;
        if (fonte && !slide.src) slide.src = fonte;
      });
      carregar.disconnect();
    },
    { rootMargin: '600px 0px' },
  );

  carregar.observe(indice);

  gsap.set(preview, { xPercent: -50, yPercent: -50 });
  const moverX = gsap.quickTo(preview, 'x', { duration: 0.8, ease: 'power3' });
  const moverY = gsap.quickTo(preview, 'y', { duration: 0.8, ease: 'power3' });
  const girar = gsap.quickTo(preview, 'rotation', { duration: 1.1, ease: 'power3' });

  window.addEventListener('mousemove', (evento) => {
    moverX(evento.clientX);
    moverY(evento.clientY);
    girar(gsap.utils.clamp(-9, 9, velocidade * 0.6));
  });

  linhas.forEach((linha) => {
    const indiceLinha = Number(linha.dataset.projectRow);

    linha.addEventListener('mouseenter', () => {
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
      slides.forEach((slide, i) => {
        gsap.to(slide, { opacity: i === indiceLinha ? 1 : 0, duration: 0.45 });
      });
      linhas.forEach((outra) => {
        gsap.to(outra, { opacity: outra === linha ? 1 : 0.28, duration: 0.4 });
      });
    });
  });

  indice.addEventListener('mouseleave', () => {
    gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.4 });
    gsap.to(linhas, { opacity: 1, duration: 0.4 });
  });
}

function iniciarMarquees() {
  const faixas = document.querySelectorAll<HTMLElement>('[data-marquee]');
  if (!faixas.length || reduzido) return;

  const itens = Array.from(faixas)
    .map((faixa) => {
      const trilha = faixa.querySelector<HTMLElement>('[data-marquee-track]');
      if (!trilha) return null;
      return {
        trilha,
        fator: Number(faixa.dataset.speed || 1),
        direcao: faixa.dataset.direction === 'reversa' ? -1 : 1,
        largura: trilha.scrollWidth / 3,
        x: 0,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  gsap.ticker.add(() => {
    itens.forEach((item) => {
      item.x -= (item.fator * 0.55 + velocidade * item.fator * 0.45) * item.direcao;
      if (item.x <= -item.largura) item.x += item.largura;
      if (item.x > 0) item.x -= item.largura;
      gsap.set(item.trilha, { x: item.x });
    });
  });

  window.addEventListener('resize', () => {
    itens.forEach((item) => {
      item.largura = item.trilha.scrollWidth / 3;
    });
  });
}

function iniciarHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let anterior = window.scrollY;

  const atualizar = () => {
    const atual = window.scrollY;
    const descendo = atual > anterior && atual > 220;
    header.style.transform = descendo ? 'translateY(-110%)' : 'translateY(0)';
    anterior = atual;
  };

  window.addEventListener('scroll', atualizar, { passive: true });
}

function iniciarMenu() {
  const botao = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-mobile');
  if (!botao || !menu) return;

  const abrir = botao.querySelector('[data-menu-open]');
  const fechar = botao.querySelector('[data-menu-close]');
  let aberto = false;

  const alternar = () => {
    aberto = !aberto;
    botao.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('hidden', false);
    menu.classList.toggle('translate-y-full', !aberto);
    abrir?.classList.toggle('hidden', aberto);
    fechar?.classList.toggle('hidden', !aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
  };

  botao.addEventListener('click', alternar);
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', alternar));
}

function iniciarAmbiente() {
  const blobs = document.querySelectorAll<HTMLElement>('[data-blob]');
  if (!blobs.length || reduzido) return;

  blobs.forEach((blob, i) => {
    const sentido = i % 2 === 0 ? 1 : -1;

    gsap.to(blob, {
      x: 54 * sentido,
      y: -38 * sentido,
      duration: 14 + i * 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(blob, {
      scale: 1.12,
      duration: 10 + i * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 1.6,
    });
  });
}

const lenis = iniciarScroll();
iniciarReveals();
iniciarPreloader(lenis);
iniciarParallax();
iniciarImagens();
iniciarSkew();
iniciarHorizontal();
iniciarProgresso();
iniciarMarquees();
iniciarCursor();
iniciarPreviewProjetos();
iniciarHeader();
iniciarMenu();
iniciarAmbiente();

window.addEventListener('load', () => ScrollTrigger.refresh());
