import { Component, OnDestroy, signal, ElementRef, ViewChild, AfterViewInit, inject, effect } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="hero">
      <canvas #particles class="particles-canvas" aria-hidden="true"></canvas>
      <div class="hero-content">
        <div class="terminal-tag">
          <span class="terminal-prompt">~$</span> cat about_me.yml
        </div>
        <h1>
          <span class="greeting">{{ i18n.t('hero.greeting') }}</span>
          <span class="name glitch" data-text="Enrique Andrés Villar">Enrique Andrés Villar</span>
        </h1>
        <div class="typed-container">
          <span class="typed-prefix">&gt;&nbsp;</span>
          <span class="typed-text">{{ displayText() }}</span>
          <span class="cursor" aria-hidden="true">|</span>
        </div>
        <p class="hero-description" [innerHTML]="i18n.t('hero.description')"></p>
        <div class="hero-actions">
          <a href="#about" class="btn-primary">{{ i18n.t('hero.about') }}</a>
          <a href="https://github.com/enriqueav99" target="_blank" rel="noopener" class="btn-secondary">GitHub</a>
        </div>
      </div>
      <div class="scroll-indicator" aria-hidden="true">
        <div class="mouse"><div class="wheel"></div></div>
        <span>scroll</span>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 24px;
      overflow: hidden;
    }
    .particles-canvas {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }
    .terminal-tag {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--terminal-green);
      margin-bottom: 24px;
      padding: 8px 16px;
      background: rgba(0, 230, 118, 0.08);
      border: 1px solid rgba(0, 230, 118, 0.2);
      border-radius: var(--radius-sm);
      display: inline-block;
      .terminal-prompt { color: var(--accent); margin-right: 8px; }
    }
    h1 {
      margin-bottom: 20px;
      .greeting {
        display: block;
        font-size: clamp(1rem, 2.5vw, 1.3rem);
        font-weight: 400;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }
      .name {
        display: block;
        font-size: clamp(2.5rem, 7vw, 4.5rem);
        font-weight: 900;
        line-height: 1.1;
        background: var(--gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;
        cursor: default;
      }
      .glitch {
        &:hover {
          animation: glitch 0.4s linear;
        }
        &::before, &::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; opacity: 0;
        }
        &::before {
          -webkit-text-fill-color: #f57c00;
          color: #f57c00;
          z-index: -1;
        }
        &::after {
          -webkit-text-fill-color: #ffb74d;
          color: #ffb74d;
          z-index: -1;
        }
        &:hover::before {
          animation: glitch-top 0.4s linear; opacity: 0.7;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        &:hover::after {
          animation: glitch-bottom 0.4s linear; opacity: 0.7;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }
      }
    }
    .typed-container {
      font-family: var(--font-mono);
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      color: var(--text-secondary);
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      .typed-prefix { color: var(--accent); }
      .cursor { animation: blink 1s infinite; color: var(--accent); margin-left: 2px; }
    }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    .hero-description {
      font-size: 1.1rem;
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 36px;
      max-width: 600px;
    }
    :host ::ng-deep .hero-description strong { color: var(--text-primary); font-weight: 600; }
    :host ::ng-deep .hero-description .accent { color: var(--accent); }
    .hero-actions { display: flex; gap: 16px; margin-bottom: 50px; flex-wrap: wrap; }
    .btn-primary {
      padding: 14px 36px;
      background: var(--accent);
      color: var(--bg-primary);
      font-weight: 600;
      border-radius: var(--radius-sm);
      font-size: 0.95rem;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      &::before {
        content: ''; position: absolute; top: 50%; left: 50%;
        width: 0; height: 0; background: rgba(255,255,255,0.2);
        border-radius: 50%; transform: translate(-50%, -50%);
        transition: width 0.5s, height 0.5s;
      }
      &:hover {
        background: var(--accent-light);
        transform: translateY(-3px);
        box-shadow: 0 0 40px rgba(245, 124, 0, 0.3);
        color: var(--bg-primary);
        &::before { width: 300px; height: 300px; }
      }
    }
    .btn-secondary {
      padding: 14px 36px;
      border: 1px solid var(--border);
      color: var(--text-primary);
      font-weight: 600;
      border-radius: var(--radius-sm);
      font-size: 0.95rem;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      &::before {
        content: ''; position: absolute; top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(245, 124, 0, 0.1), transparent);
        transition: left 0.5s;
      }
      &:hover {
        border-color: var(--accent); color: var(--accent); transform: translateY(-3px);
        &::before { left: 100%; }
      }
    }
    .scroll-indicator {
      position: absolute;
      bottom: 30px; left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      opacity: 0.4;
      animation: float 2s ease-in-out infinite;
      span { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; }
    }
    .mouse {
      width: 24px; height: 38px;
      border: 2px solid var(--text-muted);
      border-radius: 12px;
      position: relative;
      &::after {
        content: ''; position: absolute; inset: -6px;
        border-radius: 16px; border: 1px solid var(--accent);
        opacity: 0; animation: mouse-pulse 2s ease-in-out infinite;
      }
      .wheel {
        position: absolute; top: 8px; left: 50%;
        transform: translateX(-50%);
        width: 3px; height: 8px;
        background: var(--accent);
        border-radius: 2px;
        animation: scroll-wheel 2s ease-in-out infinite;
      }
    }
    @keyframes mouse-pulse { 0%, 100% { opacity: 0; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.1); } }
    @keyframes float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
    @keyframes scroll-wheel { 0% { opacity: 1; top: 8px; } 100% { opacity: 0; top: 20px; } }
    @keyframes glitch {
      0%, 100% { transform: translate(0); filter: none; }
      10% { transform: translate(-3px, 2px); }
      20% { transform: translate(3px, -1px); }
      30% { transform: translate(-2px, -2px); filter: hue-rotate(20deg); }
      40% { transform: translate(2px, 1px); }
      50% { transform: translate(-1px, 2px); filter: hue-rotate(-10deg); }
      60% { transform: translate(3px, -1px); }
      70% { transform: translate(-3px, 1px); filter: hue-rotate(15deg); }
      80% { transform: translate(2px, -2px); }
      90% { transform: translate(-1px, 1px); }
    }
    @keyframes glitch-top {
      0%, 100% { transform: translate(0); }
      15% { transform: translate(6px, -2px); }
      30% { transform: translate(-5px, 0); }
      45% { transform: translate(4px, 1px); }
      60% { transform: translate(-3px, -1px); }
      75% { transform: translate(5px, 0); }
      90% { transform: translate(-4px, 1px); }
    }
    @keyframes glitch-bottom {
      0%, 100% { transform: translate(0); }
      15% { transform: translate(-5px, 1px); }
      30% { transform: translate(6px, 0); }
      45% { transform: translate(-4px, -1px); }
      60% { transform: translate(3px, 2px); }
      75% { transform: translate(-6px, 0); }
      90% { transform: translate(4px, -1px); }
    }
    @media (max-width: 768px) {
      .hero { padding: 0 16px; }
    }
  `]
})
export class HeroComponent implements OnDestroy, AfterViewInit {
  @ViewChild('particles') canvasRef!: ElementRef<HTMLCanvasElement>;
  i18n = inject(I18nService);
  displayText = signal('');

  private phrasesEs = [
    'Platform Engineer @ Inditex',
    'Especialista en Kubernetes & OpenShift',
    'Infraestructura DevOps & Cloud',
    'Contribuidor Open Source',
    'CI/CD & GitOps',
  ];
  private phrasesEn = [
    'Platform Engineer @ Inditex',
    'Kubernetes & OpenShift Specialist',
    'DevOps & Cloud Infrastructure',
    'Open Source Contributor',
    'CI/CD & GitOps Enthusiast',
  ];
  private animFrame = 0;
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
  private resizeHandler: (() => void) | null = null;
  private heroObserver: IntersectionObserver | null = null;
  private isVisible = true;
  private reducedMotion = typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    effect(() => {
      this.i18n.lang();
      if (this.typingTimeout) clearTimeout(this.typingTimeout);
      if (this.reducedMotion) {
        this.displayText.set(this.phrases[0]);
        return;
      }
      this.displayText.set('');
      this.typeLoop(0);
    });
  }

  ngAfterViewInit() {
    if (!this.reducedMotion) {
      this.initParticles();
      this.setupVisibilityObserver();
    }
  }

  ngOnDestroy() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    cancelAnimationFrame(this.animFrame);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    this.heroObserver?.disconnect();
  }

  private get phrases() {
    return this.i18n.lang() === 'es' ? this.phrasesEs : this.phrasesEn;
  }

  private typeLoop(phraseIdx: number) {
    const phrase = this.phrases[phraseIdx % this.phrases.length];
    let i = 0;
    const type = () => {
      if (i <= phrase.length) {
        this.displayText.set(phrase.substring(0, i));
        i++;
        this.typingTimeout = setTimeout(type, 60);
      } else {
        this.typingTimeout = setTimeout(() => this.eraseLoop(phraseIdx), 2000);
      }
    };
    type();
  }

  private eraseLoop(phraseIdx: number) {
    const current = this.displayText();
    if (current.length > 0) {
      this.displayText.set(current.substring(0, current.length - 1));
      this.typingTimeout = setTimeout(() => this.eraseLoop(phraseIdx), 30);
    } else {
      this.typingTimeout = setTimeout(() => this.typeLoop(phraseIdx + 1), 400);
    }
  }

  private setupVisibilityObserver() {
    const section = this.canvasRef.nativeElement.parentElement;
    if (!section) return;
    this.heroObserver = new IntersectionObserver(
      ([entry]) => { this.isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    this.heroObserver.observe(section);
  }

  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.resizeHandler = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);

    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1, opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      this.animFrame = requestAnimationFrame(animate);
      if (!this.isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 124, 0, ${p.opacity})`;
        ctx.fill();
      });
      this.particles.forEach((p, i) => {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = p.x - this.particles[j].x;
          const dy = p.y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.strokeStyle = `rgba(245, 124, 0, ${0.08 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      });
    };
    animate();
  }
}
