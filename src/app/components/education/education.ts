import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section id="education" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('edu.label') }}</span>
        <h2>{{ i18n.t('edu.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <div class="edu-grid">
        <div class="edu-column">
          <h3 class="column-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            {{ i18n.t('edu.education') }}
          </h3>
          <div class="edu-card">
            <div class="edu-date">Jun 2023</div>
            <h4>{{ i18n.t('edu.bigdata') }}</h4>
            <p class="edu-institution">Universidad Pontificia de Salamanca</p>
            <p class="edu-desc">{{ i18n.t('edu.bigdata.desc') }}</p>
          </div>
          <div class="edu-card">
            <div class="edu-date">Jun 2023</div>
            <h4>{{ i18n.t('edu.cs') }}</h4>
            <p class="edu-institution">Universidad Pontificia de Salamanca</p>
            <p class="edu-desc">{{ i18n.t('edu.cs.desc') }}</p>
          </div>
        </div>

        <div class="edu-column">
          <h3 class="column-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            {{ i18n.t('edu.hackathons') }}
          </h3>

          <div class="hack-card">
            <div class="hack-header">
              <span class="hack-position first">{{ i18n.t('edu.hack4edu23.position') }}</span>
              <span class="hack-date">Feb 2023</span>
            </div>
            <h4>Hack4Edu — UPSA, Internacional</h4>
            <p class="hack-desc">{{ i18n.t('edu.hack4edu23.desc') }}</p>
          </div>

          <div class="hack-card">
            <div class="hack-header">
              <span class="hack-position">{{ i18n.t('edu.hack4good.position') }}</span>
              <span class="hack-date">Oct 2022</span>
            </div>
            <h4>Hack4Good — Telefónica / USAL</h4>
            <p class="hack-desc">{{ i18n.t('edu.hack4good.desc') }}</p>
            <div class="hack-project">
              <span class="project-label">{{ i18n.t('edu.project_label') }}</span> {{ i18n.t('edu.hack4good.project') }}
            </div>
          </div>

          <div class="hack-card">
            <div class="hack-header">
              <span class="hack-position">{{ i18n.t('edu.hack4edu21.position') }}</span>
              <span class="hack-date">Nov 2021</span>
            </div>
            <h4>Hack4Edu — UPSA, Internacional</h4>
            <p class="hack-desc">{{ i18n.t('edu.hack4edu21.desc') }}</p>
            <div class="hack-project">
              <span class="project-label">{{ i18n.t('edu.project_label') }}</span> {{ i18n.t('edu.hack4edu21.project') }}
            </div>
          </div>

          <div class="hack-card">
            <div class="hack-header">
              <span class="hack-position talent">{{ i18n.t('edu.talent.position') }}</span>
              <span class="hack-date">Jun 2023</span>
            </div>
            <h4>Premio Talento — Proyecto Social Innovador (UPSA)</h4>
            <p class="hack-desc">{{ i18n.t('edu.talent.desc') }}</p>
          </div>
        </div>
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
    .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
    .column-title {
      font-size: 1.2rem; font-weight: 700; color: var(--text-primary);
      margin-bottom: 24px; display: flex; align-items: center; gap: 10px;
      svg { color: var(--accent); }
    }
    .edu-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 24px; margin-bottom: 16px; transition: all 0.3s ease; border-left: 3px solid var(--accent);
      &:hover { transform: translateX(8px); border-color: var(--accent); box-shadow: var(--shadow-glow); }
      .edu-date { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); margin-bottom: 8px; }
      h4 { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
      .edu-institution { font-size: 0.9rem; color: var(--accent-light); margin-bottom: 8px; font-weight: 500; }
      .edu-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }
    }
    .hack-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 24px; margin-bottom: 16px; transition: all 0.3s ease;
      &:hover { transform: translateX(8px); border-color: var(--accent); box-shadow: var(--shadow-glow); }
      .hack-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .hack-position {
        font-family: var(--font-mono); font-size: 0.75rem; padding: 4px 12px;
        background: rgba(245, 124, 0, 0.15); color: var(--accent-light);
        border-radius: 20px; font-weight: 600;
        &.first { background: rgba(255, 215, 0, 0.15); color: #ffd700; }
        &.talent { background: rgba(0, 230, 118, 0.15); color: var(--terminal-green); }
      }
      .hack-date { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); }
      h4 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
      .hack-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
      .hack-project {
        font-family: var(--font-mono); font-size: 0.8rem; color: var(--terminal-green);
        padding: 8px 12px; background: rgba(0, 230, 118, 0.08); border-radius: var(--radius-sm);
        .project-label { color: var(--text-muted); }
      }
    }
    @media (max-width: 768px) {
      .section { padding: 60px 16px; }
      .edu-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class EducationComponent {
  i18n = inject(I18nService);
}
