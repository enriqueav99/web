import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section id="contact" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('contact.label') }}</span>
        <h2>{{ i18n.t('contact.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <div class="contact-content">
        <p class="contact-text">{{ i18n.t('contact.text') }}</p>

        <div class="contact-cards">
          <a href="mailto:enriqueav1999@gmail.com" class="contact-card">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="contact-label">Email</span>
            <span class="contact-value">enriqueav1999&#64;gmail.com</span>
          </a>

          <a href="https://www.linkedin.com/in/enrique-andres-villar" target="_blank" rel="noopener" class="contact-card">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span class="contact-label">LinkedIn</span>
            <span class="contact-value">enrique-andres-villar</span>
          </a>

          <a href="https://github.com/enriqueav99" target="_blank" rel="noopener" class="contact-card">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span class="contact-label">GitHub</span>
            <span class="contact-value">enriqueav99</span>
          </a>
        </div>

        <a href="mailto:enriqueav1999@gmail.com" class="cta-button">
          {{ i18n.t('contact.cta') }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <footer class="footer">
        <p>{{ i18n.t('contact.footer.by') }} <span class="accent">Enrique Andrés Villar</span></p>
        <p class="footer-tech">Built with Angular · {{ currentYear }} <span class="rana" title="🐸">·</span></p>
        <p class="footer-a11y">{{ i18n.t('contact.footer.a11y') }}</p>
      </footer>
    </section>
  `,
  styles: [`
    .section { padding: 100px 24px; max-width: var(--max-width); margin: 0 auto; }
    .section-header {
      margin-bottom: 60px; text-align: center;
      .section-label { font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; display: block; }
      h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .section-line { width: 60px; height: 3px; background: var(--accent); margin: 16px auto 0; border-radius: 2px; }
    }
    .contact-content { text-align: center; max-width: 800px; margin: 0 auto; }
    .contact-text { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 48px; }
    .contact-cards {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px;
    }
    .contact-card {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 28px 20px; background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius); text-decoration: none; transition: all 0.3s ease; cursor: pointer;
      &:hover { border-color: var(--accent); transform: translateY(-6px); box-shadow: var(--shadow-glow);
        .contact-icon { box-shadow: 0 0 20px rgba(245, 124, 0, 0.3); background: rgba(245, 124, 0, 0.2); }
      }
      .contact-icon {
        color: var(--accent); width: 52px; height: 52px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(245, 124, 0, 0.1); border-radius: 50%;
      }
      .contact-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
      .contact-value { font-size: 0.85rem; color: var(--text-primary); font-weight: 500; word-break: break-all; text-align: center; }
    }
    .cta-button {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 16px 40px; background: var(--accent); color: var(--bg-primary);
      font-weight: 700; font-size: 1rem; border-radius: var(--radius-sm);
      text-decoration: none; transition: all 0.3s ease;
      &:hover { background: var(--accent-light); transform: translateY(-2px); box-shadow: var(--shadow-glow); color: var(--bg-primary); }
    }
    .footer {
      text-align: center; margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--border);
      p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px; }
      .accent { color: var(--accent); }
      .footer-tech { font-family: var(--font-mono); font-size: 0.75rem; }
      .footer-a11y { font-size: 0.7rem; color: var(--text-muted); margin-top: 8px; opacity: 0.6; }
      .rana { cursor: default; transition: all 0.3s; }
      .rana:hover { font-size: 0; &::after { content: '🐸'; font-size: 0.75rem; } }
    }
    @media (max-width: 768px) {
      .section { padding: 60px 16px; }
      .contact-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .contact-card {
        padding: 18px 12px; gap: 8px;
        .contact-icon { width: 40px; height: 40px; }
        .contact-icon svg { width: 22px; height: 22px; }
        .contact-label { font-size: 0.7rem; }
        .contact-value { font-size: 0.72rem; word-break: break-word; }
      }
      .contact-card:last-child { grid-column: 1 / -1; }
    }
  `]
})
export class ContactComponent {
  i18n = inject(I18nService);
  currentYear = new Date().getFullYear();
}
