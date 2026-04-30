import { Component, HostListener, signal, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav [class.scrolled]="scrolled()">
      <div class="nav-container">
        <a href="#" class="logo" (click)="$event.preventDefault(); scrollToTop()" aria-label="Go to top">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">EAV</span>
          <span class="logo-bracket">/&gt;</span>
        </a>

        <button class="hamburger" [class.active]="menuOpen()" (click)="toggleMenu()"
                aria-label="Toggle navigation menu" [attr.aria-expanded]="menuOpen()">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav-links" [class.open]="menuOpen()">
          @for (link of links; track link.id) {
            <li>
              <a [href]="'#' + link.id" (click)="closeMenu()">{{ i18n.t(link.key) }}</a>
            </li>
          }
          <li>
            <button class="lang-toggle" (click)="theme.toggle()"
                    [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
              {{ theme.theme() === 'dark' ? '☀️' : '🌙' }}
            </button>
          </li>
          <li>
            <button class="lang-toggle" (click)="i18n.toggle()"
                    [attr.aria-label]="i18n.lang() === 'es' ? 'Switch to English' : 'Cambiar a Español'">
              {{ i18n.lang() === 'es' ? 'EN' : 'ES' }}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0 24px;
      height: var(--nav-height);
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      background: transparent;

      &.scrolled {
        background: var(--bg-nav-scrolled, rgba(10, 10, 15, 0.9));
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
      }
    }

    .nav-container {
      max-width: var(--max-width);
      margin: 0 auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 700;
      text-decoration: none;
      display: flex;
      gap: 2px;
      .logo-bracket { color: var(--accent); transition: transform 0.3s; }
      .logo-text { color: var(--text-primary); transition: text-shadow 0.3s; }
      &:hover {
        .logo-bracket:first-child { transform: translateX(-3px); }
        .logo-bracket:last-child { transform: translateX(3px); }
        .logo-text { text-shadow: 0 0 12px rgba(245, 124, 0, 0.5); }
      }
    }

    .nav-links {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 32px;

      a {
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
        text-decoration: none;
        transition: color 0.3s ease;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-light));
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        &:hover {
          color: var(--accent);
          &::after { width: 100%; }
        }
      }
    }

    .nav-cta {
      padding: 8px 20px !important;
      border: 1px solid var(--accent) !important;
      border-radius: var(--radius-sm);
      color: var(--accent) !important;
      font-family: var(--font-mono);
      font-size: 0.85rem !important;
      transition: all 0.3s ease !important;
      &::after { display: none !important; }
      &:hover {
        background: var(--accent) !important;
        color: var(--bg-primary) !important;
      }
    }

    .lang-toggle {
      padding: 6px 14px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: 1px;

      &:hover {
        border-color: var(--accent);
        color: var(--accent);
        background: rgba(245, 124, 0, 0.1);
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--text-primary);
        transition: all 0.3s ease;
      }

      &.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      &.active span:nth-child(2) { opacity: 0; }
      &.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }

      .nav-links {
        position: fixed;
        top: var(--nav-height);
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--bg-nav-scrolled, rgba(10, 10, 15, 0.98));
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        gap: 40px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        &.open { transform: translateX(0); }
        a { font-size: 1.2rem !important; }
      }
    }
  `]
})
export class NavbarComponent {
  i18n = inject(I18nService);
  theme = inject(ThemeService);
  scrolled = signal(false);
  menuOpen = signal(false);

  links = [
    { id: 'about', key: 'nav.about' },
    { id: 'skills', key: 'nav.skills' },
    { id: 'opensource', key: 'nav.opensource' },
    { id: 'homelab', key: 'nav.homelab' },
    { id: 'blog', key: 'nav.blog' },
    { id: 'experience', key: 'nav.experience' },
    { id: 'education', key: 'nav.education' },
    { id: 'contact', key: 'nav.contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuOpen.update(v => {
      const next = !v;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }

  closeMenu() {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
