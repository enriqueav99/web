import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-opensource',
  standalone: true,
  template: `
    <section id="opensource" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('oss.label') }}</span>
        <h2>{{ i18n.t('oss.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <div class="projects-grid">
        @for (project of projects; track project.title) {
          <a class="project-card" [href]="project.github" target="_blank" rel="noopener">
            <div class="card-top">
              <div class="folder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
              </div>
              <div class="card-links">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </div>
            <h3>{{ project.title }}</h3>
            <p class="project-org">{{ project.org }}</p>
            <p class="project-desc">{{ i18n.t(project.descKey) }}</p>
            <div class="tech-tags">
              @for (tech of project.tech; track tech) {
                <span class="tag">{{ tech }}</span>
              }
            </div>
            @if (project.highlight) {
              <div class="highlight-badge">{{ project.highlight }}</div>
            }
          </a>
        }
      </div>

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
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 48px; }
    .project-card {
      display: block; text-decoration: none; color: inherit;
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px;
      transition: all 0.3s ease; position: relative;
      &:hover { border-color: var(--accent); transform: translateY(-10px); box-shadow: 0 0 40px rgba(245, 124, 0, 0.2), var(--shadow-glow); color: inherit; }
    }
    .card-top {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
      .folder-icon { color: var(--accent); }
      .card-links a { color: var(--text-muted); transition: color 0.3s ease; &:hover { color: var(--accent); } }
    }
    h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    .project-org { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); margin-bottom: 12px; }
    .project-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px; }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { font-family: var(--font-mono); font-size: 0.7rem; padding: 4px 10px; background: rgba(245, 124, 0, 0.1); color: var(--accent-light); border-radius: 4px; border: 1px solid rgba(245, 124, 0, 0.2); }
    .highlight-badge {
      position: absolute; top: 16px; right: 16px;
      font-family: var(--font-mono); font-size: 0.65rem; padding: 4px 10px;
      background: rgba(0, 230, 118, 0.15); color: var(--terminal-green);
      border-radius: 20px; font-weight: 600; text-transform: uppercase;
    }
    @media (max-width: 768px) {
      .section { padding: 60px 16px; }
      .projects-grid { grid-template-columns: 1fr; }
      .writing-card { flex-direction: column; text-align: center; .arrow { display: none; } }
    }
  `]
})
export class OpensourceComponent {
  i18n = inject(I18nService);

  projects = [
    {
      title: 'ArgoCD Operator — Contributor',
      org: 'argoproj-labs',
      descKey: 'oss.argocd.desc',
      github: 'https://github.com/argoproj-labs/argocd-operator/pull/1532',
      tech: ['Go', 'Kubernetes', 'ArgoCD', 'Operator SDK'],
      highlight: 'Merged PR',
    },
    {
      title: 'k8s-overcommit-operator',
      org: 'InditexTech',
      descKey: 'oss.overcommit.desc',
      github: 'https://github.com/InditexTech/k8s-overcommit-operator',
      tech: ['Go', 'Kubernetes', 'Operator SDK', 'Helm'],
      highlight: 'Author',
    },
  ];
}
