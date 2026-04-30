import { Component, inject, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('exp.label') }}</span>
        <h2>{{ i18n.t('exp.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <div class="timeline">
        <div class="timeline-track"></div>

        <div class="timeline-item" #timelineItem>
          <div class="commit-dot">
            <div class="commit-inner"></div>
          </div>
          <div class="timeline-card">
            <div class="card-header">
              <span class="date">{{ i18n.t('exp.inditex.date') }}</span>
              <span class="badge current">{{ i18n.t('exp.current') }}</span>
            </div>
            <h3>Platform Engineer / DevOps</h3>
            <h4>INDITEX <span class="location">— Arteixo, ES</span></h4>
            <ul>
              <li>{{ i18n.t('exp.inditex.p1') }}</li>
              <li>{{ i18n.t('exp.inditex.p2') }}</li>
              <li>{{ i18n.t('exp.inditex.p3') }}</li>
            </ul>
            <div class="tech-tags">
              @for (t of inditexTech; track t; let i = $index) {
                <span class="tag" [style.transition-delay]="(i * 0.05) + 's'">{{ t }}</span>
              }
            </div>
          </div>
        </div>

        <div class="timeline-item right" #timelineItem>
          <div class="commit-dot">
            <div class="commit-inner"></div>
          </div>
          <div class="timeline-card">
            <div class="card-header">
              <span class="date">{{ i18n.t('exp.profuturo.date') }}</span>
              <span class="badge past">{{ i18n.t('exp.finished') }}</span>
            </div>
            <h3>Data Scientist & Data Engineer</h3>
            <h4>Profuturo (Fundación Telefónica) <span class="location">— Remote</span></h4>
            <ul>
              <li>{{ i18n.t('exp.profuturo.p1') }}</li>
              <li>{{ i18n.t('exp.profuturo.p2') }}</li>
            </ul>
            <div class="tech-tags">
              @for (t of profuturoTech; track t; let i = $index) {
                <span class="tag" [style.transition-delay]="(i * 0.05) + 's'">{{ t }}</span>
              }
            </div>
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
    .timeline {
      position: relative; max-width: 900px; margin: 0 auto;
    }
    .timeline-track {
      position: absolute; left: 50%; transform: translateX(-50%); top: 0; bottom: 0; width: 2px;
      background: var(--border);
      &::after {
        content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 0%;
        background: linear-gradient(180deg, var(--accent), var(--accent-light));
        transition: height 1.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
    }
    .timeline.track-revealed .timeline-track::after {
      height: 100%;
    }
    .timeline-item {
      position: relative; width: 50%; padding-right: 50px; padding-bottom: 50px;
      &.right { margin-left: 50%; padding-right: 0; padding-left: 50px; }
    }

    /* Commit dot — git node style */
    .commit-dot {
      position: absolute; right: -11px; top: 24px; width: 22px; height: 22px;
      background: var(--bg-primary); border: 3px solid var(--border);
      border-radius: 50%; z-index: 2;
      display: flex; align-items: center; justify-content: center;
      transform: scale(0); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.5s ease;
      .right & { right: auto; left: -11px; }
    }
    .commit-inner {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--border);
      transition: background 0.5s ease;
    }
    .timeline-item.revealed .commit-dot {
      transform: scale(1);
      border-color: var(--accent);
    }
    .timeline-item.revealed .commit-inner {
      background: var(--accent);
    }

    /* Card — slide in from side */
    .timeline-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px;
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      opacity: 0; transform: translateX(-30px);
      .right & { transform: translateX(30px); }
      &:hover { border-color: var(--accent); transform: translateY(-6px) !important; box-shadow: 0 0 40px rgba(245, 124, 0, 0.2), var(--shadow-glow); }
    }
    .timeline-item.revealed .timeline-card {
      opacity: 1; transform: translateX(0);
    }

    /* Tags — stagger fade in */
    .tech-tags .tag {
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .timeline-item.revealed .tech-tags .tag {
      opacity: 1; transform: translateY(0);
    }

    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .date { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); }
    .badge {
      font-size: 0.7rem; padding: 4px 10px; border-radius: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
      &.current { background: rgba(0, 230, 118, 0.15); color: var(--terminal-green); }
      &.past { background: rgba(245, 124, 0, 0.15); color: var(--accent-light); }
    }
    h3 { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    h4 { font-size: 0.95rem; font-weight: 600; color: var(--accent); margin-bottom: 16px; .location { color: var(--text-muted); font-weight: 400; } }
    ul {
      list-style: none; margin-bottom: 16px;
      li { position: relative; padding-left: 20px; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.6; &::before { content: '▹'; position: absolute; left: 0; color: var(--accent); } }
    }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { font-family: var(--font-mono); font-size: 0.7rem; padding: 4px 10px; background: rgba(245, 124, 0, 0.1); color: var(--accent-light); border-radius: 4px; border: 1px solid rgba(245, 124, 0, 0.2); }

    @media (max-width: 768px) {
      .section { padding: 60px 16px; }
      .timeline-track { left: 20px; }
      .timeline-item { width: 100%; padding-right: 0; padding-left: 50px; &.right { margin-left: 0; padding-left: 50px; } }
      .commit-dot { right: auto; left: 9px; .right & { left: 9px; } }
      .timeline-card { transform: translateX(20px); .right & { transform: translateX(20px); } }
    }

    @media (prefers-reduced-motion: reduce) {
      .commit-dot { transform: scale(1); transition: none; }
      .timeline-card { opacity: 1; transform: none !important; transition: none; }
      .tech-tags .tag { opacity: 1; transform: none; transition: none; }
      .timeline-track::after { height: 100% !important; transition: none; }
    }
  `]
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef<HTMLElement>>;
  i18n = inject(I18nService);
  inditexTech = ['Kubernetes', 'OpenShift', 'Docker', 'ArgoCD', 'Terraform', 'Ansible', 'Golang', 'Grafana', 'Prometheus'];
  profuturoTech = ['Python', 'R', 'ETL', 'TIBCO Spotfire', 'Bash', 'Data Engineering'];

  private observer: IntersectionObserver | null = null;
  private trackRevealed = false;

  ngAfterViewInit() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.revealAll();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);

            if (!this.trackRevealed) {
              this.trackRevealed = true;
              entry.target.closest('.timeline')?.classList.add('track-revealed');
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    this.timelineItems.forEach(item => {
      this.observer!.observe(item.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private revealAll() {
    setTimeout(() => {
      this.timelineItems.forEach(item => item.nativeElement.classList.add('revealed'));
      const timeline = this.timelineItems.first?.nativeElement.closest('.timeline');
      timeline?.classList.add('track-revealed');
    });
  }
}
