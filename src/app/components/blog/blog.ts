import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <section id="blog" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('blog.label') }}</span>
        <h2>{{ i18n.t('blog.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <p class="subtitle">{{ i18n.t('blog.subtitle') }}</p>

      <div class="articles">
        @for (article of articles; track article.url) {
          <a [href]="article.url" target="_blank" rel="noopener" class="article-card">
            <div class="article-number">{{ $index + 1 | number: '2.0-0' }}</div>
            <div class="article-body">
              <h3>{{ article.title }}</h3>
              <p>{{ i18n.t(article.descKey) }}</p>
              <div class="article-tags">
                @for (tag of article.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
            </div>
            <div class="article-action">
              <span class="read-link">{{ i18n.t('blog.read') }}</span>
              <span class="arrow">→</span>
            </div>
          </a>
        }
      </div>

      <div class="medium-link">
        <a href="https://medium.com/@enriqueav1999" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
          @enriqueav1999
        </a>
      </div>
    </section>
  `,
  styles: [`
    .section { padding: 100px 24px; max-width: var(--max-width); margin: 0 auto; }
    .section-header {
      margin-bottom: 24px; text-align: center;
      .section-label { font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; display: block; }
      h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .section-line { width: 60px; height: 3px; background: var(--accent); margin: 16px auto 0; border-radius: 2px; }
    }
    .subtitle {
      text-align: center; color: var(--text-secondary); font-size: 1.05rem;
      line-height: 1.7; max-width: 600px; margin: 0 auto 48px;
    }
    .articles {
      display: flex; flex-direction: column; gap: 20px; max-width: 800px; margin: 0 auto;
    }
    .article-card {
      display: flex; align-items: center; gap: 24px; padding: 28px;
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
      text-decoration: none; color: inherit; transition: all 0.3s ease;
      &:hover {
        border-color: var(--accent); transform: scale(1.02); box-shadow: var(--shadow-glow);
        .arrow { transform: translateX(4px); }
        .article-number { color: var(--accent); }
      }
    }
    .article-number {
      font-family: var(--font-mono); font-size: 2rem; font-weight: 800;
      color: var(--border); transition: color 0.3s; flex-shrink: 0; min-width: 50px; text-align: center;
    }
    .article-body {
      flex: 1;
      h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; line-height: 1.4; }
      p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
    }
    .article-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag {
      font-family: var(--font-mono); font-size: 0.65rem; padding: 3px 8px;
      background: rgba(245, 124, 0, 0.1); color: var(--accent-light);
      border-radius: 4px; border: 1px solid rgba(245, 124, 0, 0.2);
    }
    .article-action {
      display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0;
      .read-link { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; }
      .arrow { font-size: 1.2rem; color: var(--accent); transition: transform 0.3s; }
    }
    .medium-link {
      text-align: center; margin-top: 32px;
      a {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: var(--font-mono); font-size: 0.85rem;
        color: var(--text-muted); text-decoration: none; transition: all 0.3s;
        padding: 12px 24px; border: 1px solid var(--border); border-radius: var(--radius-sm);
        &:hover { color: var(--accent); border-color: var(--accent); }
      }
    }
    @media (max-width: 768px) {
      .section { padding: 60px 16px; }
      .article-card { flex-direction: column; text-align: center; }
      .article-number { min-width: auto; }
      .article-tags { justify-content: center; }
      .article-action { flex-direction: row; }
    }
  `]
})
export class BlogComponent {
  i18n = inject(I18nService);

  articles = [
    {
      title: 'Install ArgoCD in K3s with certManager and Traefik',
      descKey: 'blog.article1',
      url: 'https://medium.com/@enriqueav1999/install-argocd-in-k3s-with-certresolver-and-traefik-2ab534f40c8f',
      tags: ['ArgoCD', 'K3s', 'Traefik', 'cert-manager', 'Let\'s Encrypt'],
    },
    {
      title: 'Certmonger + Vault: Self-Renewing PKI Pipeline',
      descKey: 'blog.article2',
      url: 'https://medium.com/@enriqueav1999/certmonger-vault-building-a-self-renewing-pki-pipeline-on-linux-abfd32cfe479',
      tags: ['Vault', 'PKI', 'Linux', 'Security'],
    },
  ];
}
