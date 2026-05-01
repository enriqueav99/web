import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-homelab',
  standalone: true,
  template: `
    <section id="homelab" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('homelab.label') }}</span>
        <h2>{{ i18n.t('homelab.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <p class="subtitle">{{ i18n.t('homelab.subtitle') }}</p>

      <div class="terminal-bar">
        <div class="terminal-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <span class="terminal-cmd">~$ docker compose ps && kubectl get pods -A</span>
      </div>

      <div class="services-grid">
        @for (cat of categories; track cat.titleKey) {
          <div class="service-group">
            <div class="group-header">
              <span class="group-icon" [innerHTML]="cat.icon"></span>
              <h3>{{ i18n.t(cat.titleKey) }}</h3>
              <span class="service-count">{{ cat.services.length }}</span>
            </div>
            <div class="service-list">
              @for (svc of cat.services; track svc) {
                <span class="service-chip">{{ svc }}</span>
              }
            </div>
          </div>
        }
      </div>

      <div class="source-link">
        <a href="https://github.com/enriqueav99/server" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          {{ i18n.t('homelab.source') }}
          <span class="arrow">→</span>
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
      line-height: 1.7; max-width: 600px; margin: 0 auto 40px;
    }
    .terminal-bar {
      display: flex; align-items: center; gap: 16px;
      background: var(--bg-secondary); border: 1px solid var(--border);
      border-radius: 8px 8px 0 0; padding: 12px 20px; margin-bottom: 0;
      font-family: var(--font-mono); font-size: 0.8rem; color: var(--terminal-green);
    }
    .terminal-dots { display: flex; gap: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }
    .terminal-cmd { opacity: 0.8; }
    .services-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0;
      border: 1px solid var(--border); border-top: none;
      border-radius: 0 0 8px 8px; overflow: hidden;
    }
    .service-group {
      padding: 24px; border-bottom: 1px solid var(--border); border-right: 1px solid var(--border);
      background: var(--bg-card); transition: all 0.3s ease;
      border-left: 3px solid transparent;
      &:hover { background: var(--bg-card-hover); border-left-color: var(--accent); padding-left: 28px; }
    }
    .group-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
      h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
    }
    .group-icon { color: var(--accent); display: flex; align-items: center; }
    .service-count {
      font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent);
      background: rgba(245, 124, 0, 0.1); padding: 2px 8px; border-radius: 10px;
      margin-left: auto;
    }
    .service-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .service-chip {
      font-family: var(--font-mono); font-size: 0.75rem; padding: 5px 12px;
      background: rgba(245, 124, 0, 0.06); border: 1px solid rgba(245, 124, 0, 0.12);
      border-radius: 6px; color: var(--text-secondary); transition: all 0.3s;
      &:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-1px); }
    }
    .source-link {
      text-align: center; margin-top: 32px;
      a {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: var(--font-mono); font-size: 0.85rem;
        color: var(--text-muted); text-decoration: none; transition: all 0.3s;
        padding: 12px 24px; border: 1px solid var(--border); border-radius: var(--radius-sm);
        &:hover { color: var(--accent); border-color: var(--accent); .arrow { transform: translateX(4px); } }
      }
      .arrow { transition: transform 0.3s; }
    }
    @media (max-width: 768px) {
      .section { padding: 60px 12px; }
      .services-grid { grid-template-columns: repeat(2, 1fr); }
      .service-group {
        padding: 14px 12px;
        &:hover { padding-left: 14px; }
      }
      .group-header { gap: 6px; margin-bottom: 10px; h3 { font-size: 0.78rem; } }
      .service-count { font-size: 0.6rem; padding: 1px 6px; }
      .service-list { gap: 5px; }
      .service-chip { padding: 3px 7px; font-size: 0.65rem; }
      .service-group { border-right: none; }
      .terminal-bar { font-size: 0.7rem; }
    }
  `]
})
export class HomelabComponent {
  i18n = inject(I18nService);

  categories = [
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#f57c00" stroke-width="1.5" width="20" height="20"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
      titleKey: 'homelab.media',
      services: ['Plex', 'Sonarr', 'Radarr', 'Bazarr', 'Jackett', 'Overseerr', 'qBittorrent', 'Komga'],
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#f57c00" stroke-width="1.5" width="20" height="20"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
      titleKey: 'homelab.network',
      services: ['Traefik', 'Pi-hole', 'WireGuard', 'CrowdSec', 'Nginx', 'Authentik'],
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#f57c00" stroke-width="1.5" width="20" height="20"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm6 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14z"/></svg>',
      titleKey: 'homelab.monitoring',
      services: ['Portainer', 'Netdata', 'Vector', 'cAdvisor', 'Watchtower', 'Sysdig'],
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#f57c00" stroke-width="1.5" width="20" height="20"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>',
      titleKey: 'homelab.productivity',
      services: ['Nextcloud', 'Collabora', 'Excalidraw', 'Home Assistant', 'Homarr'],
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#f57c00" stroke-width="1.5" width="20" height="20"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
      titleKey: 'homelab.dev',
      services: ['IT-Tools', 'Composerize', 'Local-AI', 'Discord Bot', 'Puter'],
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="#f57c00" width="20" height="20"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="none" stroke="#f57c00" stroke-width="1.5"/></svg>',
      titleKey: 'homelab.k3s',
      services: ['ArgoCD', 'Grafana', 'Prometheus', 'Traefik Ingress', 'Let\'s Encrypt'],
    },
  ];
}
