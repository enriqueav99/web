import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { SkillsComponent } from './components/skills/skills';
import { OpensourceComponent } from './components/opensource/opensource';
import { HomelabComponent } from './components/homelab/homelab';
import { EducationComponent } from './components/education/education';
import { BlogComponent } from './components/blog/blog';
import { ContactComponent } from './components/contact/contact';
import { CommandPaletteComponent } from './components/command-palette/command-palette';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    OpensourceComponent,
    HomelabComponent,
    EducationComponent,
    BlogComponent,
    ContactComponent,
    CommandPaletteComponent,
  ],
  template: `
    <a class="skip-link" href="#about">Skip to content</a>
    <div class="cursor-glow" aria-hidden="true"></div>
    <div class="cmd-hint" aria-hidden="true">
      <kbd>Ctrl</kbd><span>+</span><kbd>K</kbd>
    </div>
    <button
      type="button"
      class="cmd-fab"
      aria-label="Open terminal"
      (click)="palette.toggle()">
      <span class="cmd-fab-prompt">&gt;_</span>
    </button>
    <app-navbar />
    <app-command-palette #palette />
    <main role="main">
      <app-hero />
      <div class="fade-section"><app-about /></div>
      <div class="fade-section"><app-skills /></div>
      <div class="fade-section"><app-opensource /></div>
      <div class="fade-section"><app-homelab /></div>
      <div class="fade-section"><app-blog /></div>
      <div class="fade-section"><app-experience /></div>
      <div class="fade-section"><app-education /></div>
      <div class="fade-section"><app-contact /></div>
    </main>
  `,
  styles: [`
    .skip-link {
      position: fixed; top: -100%; left: 16px; z-index: 9999;
      padding: 12px 24px; background: var(--accent); color: var(--bg-primary);
      font-weight: 700; font-size: 0.9rem; border-radius: var(--radius-sm);
      text-decoration: none; transition: top 0.2s;
      &:focus { top: 16px; }
    }

    main {
    }

    .fade-section {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s ease, transform 0.8s ease;

      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cmd-hint {
      position: fixed; bottom: 24px; right: 30px; z-index: 50;
      display: flex; align-items: center; gap: 5px; opacity: 0.5;
      transition: all 0.3s ease; cursor: pointer;
      padding: 6px 10px; border-radius: 6px;
      background: var(--bg-card); border: 1px solid var(--border);
      backdrop-filter: blur(8px);
      &:hover { opacity: 1; border-color: var(--accent); box-shadow: 0 0 12px rgba(245, 124, 0, 0.15); }
      kbd {
        font-family: var(--font-mono); font-size: 0.7rem; padding: 2px 6px;
        background: var(--bg-primary); border: 1px solid var(--border);
        border-radius: 3px; color: var(--accent);
        box-shadow: 0 1px 0 var(--border);
      }
      span { font-size: 0.65rem; color: var(--text-muted); }
    }
    @media (max-width: 768px) {
      .cmd-hint { display: none; }
    }

    .cmd-fab {
      display: none;
      position: fixed;
      right: 18px;
      bottom: calc(20px + env(safe-area-inset-bottom));
      z-index: 60;
      width: 56px; height: 56px;
      border-radius: 50%;
      border: 1px solid var(--accent);
      background: var(--bg-card);
      color: var(--accent);
      font-family: var(--font-mono);
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 16px rgba(245, 124, 0, 0.25);
      backdrop-filter: blur(8px);
      transition: transform 0.15s ease, box-shadow 0.2s ease;
      &:active { transform: scale(0.92); }
    }
    .cmd-fab-prompt { display: inline-block; transform: translateY(-1px); }
    @media (max-width: 768px), (pointer: coarse) {
      .cmd-fab { display: inline-flex; align-items: center; justify-content: center; }
    }

    .cursor-glow {
      position: fixed; top: 0; left: 0; width: 600px; height: 600px;
      pointer-events: none; z-index: 0;
      background: radial-gradient(circle, rgba(245, 124, 0, 0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      opacity: 0;
    }
  `]
})
export class App implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private tiltMoveHandler: ((e: MouseEvent) => void) | null = null;
  private tiltLeaveHandler: ((e: MouseEvent) => void) | null = null;

  ngAfterViewInit() {
    console.log('%c🐸', 'font-size:1px;opacity:0.01;');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const glow = document.querySelector('.cursor-glow') as HTMLElement;
    if (glow && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
      this.mouseMoveHandler = (e: MouseEvent) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
      };
      window.addEventListener('mousemove', this.mouseMoveHandler);

      this.tiltMoveHandler = (e: MouseEvent) => {
        const card = (e.target as HTMLElement).closest('.tilt-card') as HTMLElement;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--rx', (y * -8) + 'deg');
        card.style.setProperty('--ry', (x * 8) + 'deg');
      };
      document.addEventListener('mousemove', this.tiltMoveHandler);

      this.tiltLeaveHandler = (e: MouseEvent) => {
        const card = (e.target as HTMLElement).closest?.('.tilt-card') as HTMLElement;
        if (card) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
      };
      document.addEventListener('mouseleave', this.tiltLeaveHandler, true);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-section').forEach(el => {
      this.observer.observe(el);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.mouseMoveHandler) window.removeEventListener('mousemove', this.mouseMoveHandler);
    if (this.tiltMoveHandler) document.removeEventListener('mousemove', this.tiltMoveHandler);
    if (this.tiltLeaveHandler) document.removeEventListener('mouseleave', this.tiltLeaveHandler, true);
  }
}
