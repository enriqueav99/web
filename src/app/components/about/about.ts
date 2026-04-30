import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, effect } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface TermLine {
  type: 'cmd' | 'output';
  text: string;
  html?: boolean;
}

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="section">
      <div class="section-header">
        <span class="section-label">{{ i18n.t('about.label') }}</span>
        <h2>{{ i18n.t('about.title') }}</h2>
        <div class="section-line"></div>
      </div>

      <div class="about-grid">
        <div class="about-text">
          <div class="terminal-window">
            <div class="terminal-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="terminal-title">enrique&#64;devops ~ %</span>
            </div>
            <div class="terminal-body" #terminalBody>
              @for (line of history(); track $index) {
                @if (line.type === 'cmd') {
                  <p><span class="cmd">{{ line.text }}</span></p>
                } @else if (line.html) {
                  <p class="output" [innerHTML]="line.text"></p>
                } @else {
                  <pre class="output">{{ line.text }}</pre>
                }
              }
              <div class="terminal-input">
                <span class="prompt">$&nbsp;</span>
                <input #termInput
                  type="text"
                  [placeholder]="i18n.t('about.terminal.placeholder')"
                  (keydown.enter)="handleCommand(termInput.value); termInput.value = ''"
                  spellcheck="false"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="about-cards">
          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div class="card-content">
              <h4>{{ i18n.t('about.location') }}</h4>
              <p>Arteixo / Salamanca, ES</p>
            </div>
          </div>
          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            </div>
            <div class="card-content">
              <h4>{{ i18n.t('about.education') }}</h4>
              <p>{{ i18n.t('about.edu_value') }}</p>
            </div>
          </div>
          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
            </div>
            <div class="card-content">
              <h4>{{ i18n.t('about.languages') }}</h4>
              <p>{{ i18n.t('about.lang_value') }}</p>
            </div>
          </div>
          <div class="info-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            </div>
            <div class="card-content">
              <h4>{{ i18n.t('about.achievements') }}</h4>
              <p>{{ i18n.t('about.achieve_value') }}</p>
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
    .about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: start; }
    .terminal-window {
      background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; position: relative;
      &::after {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(180deg, transparent 40%, rgba(245, 124, 0, 0.03) 50%, transparent 60%);
        animation: scanline 6s linear infinite; pointer-events: none;
        will-change: transform;
      }
    }
    @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
    .terminal-header {
      display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(42, 42, 58, 0.5); border-bottom: 1px solid var(--border);
      .dot { width: 12px; height: 12px; border-radius: 50%; &.red { background: #ff5f56; } &.yellow { background: #ffbd2e; } &.green { background: #27c93f; } }
      .terminal-title { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-left: 8px; }
    }
    .terminal-body {
      padding: 24px; font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.8;
      max-height: 420px; overflow-y: auto; scroll-behavior: smooth;
      position: relative; z-index: 1;
      p { margin-bottom: 12px; }
      pre { margin-bottom: 12px; font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
      .cmd { color: var(--terminal-green); &::before { content: '$ '; color: var(--accent); } }
      .output { color: var(--text-secondary); padding-left: 16px; border-left: 2px solid var(--border); margin-left: 4px; }
    }
    :host ::ng-deep .terminal-body .highlight { color: var(--text-primary); font-weight: 600; }
    :host ::ng-deep .terminal-body .accent { color: var(--accent); font-weight: 600; }
    .terminal-input {
      display: flex; align-items: center; gap: 0; margin-top: 8px;
      .prompt { color: var(--accent); font-weight: 700; white-space: pre; }
      input {
        flex: 1; background: none; border: none; outline: none;
        font-family: var(--font-mono); font-size: 0.85rem; color: var(--terminal-green);
        caret-color: var(--accent); line-height: 1.8;
        &::placeholder { color: var(--text-muted); opacity: 0.5; }
      }
    }
    .about-cards { display: flex; flex-direction: column; gap: 16px; }
    .info-card {
      display: flex; align-items: center; gap: 16px; padding: 20px;
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
      transition: all 0.3s ease;
      &:hover { border-color: var(--accent); transform: translateX(8px); box-shadow: var(--shadow-glow); }
      .card-icon {
        width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
        background: rgba(245, 124, 0, 0.1); border-radius: var(--radius-sm); flex-shrink: 0; color: var(--accent);
      }
      h4 { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
      p { font-size: 0.85rem; color: var(--text-secondary); }
    }
    @media (max-width: 768px) {
      .section { padding: 60px 16px; }
      .about-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('terminalBody') terminalBody!: ElementRef<HTMLDivElement>;
  i18n = inject(I18nService);

  history = signal<TermLine[]>(this.getInitialHistory());

  constructor() {
    effect(() => {
      this.i18n.lang();
      this.history.set(this.getInitialHistory());
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  handleCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    if (cmd === 'clear') {
      this.history.set([]);
      return;
    }

    const lines: TermLine[] = [...this.history(), { type: 'cmd', text: cmd }];
    const output = this.resolve(cmd);
    lines.push(...output);
    this.history.set(lines);

    setTimeout(() => this.scrollToBottom());
  }

  private resolve(raw: string): TermLine[] {
    const cmd = raw.toLowerCase().trim();

    if (cmd === 'help') {
      return [{ type: 'output', text: this.i18n.t('about.terminal.help') }];
    }
    if (cmd === 'whoami') {
      return [{ type: 'output', text: this.i18n.t('about.whoami') }];
    }
    if (cmd === 'cat current_role.txt') {
      return [{ type: 'output', text: this.i18n.t('about.role'), html: true }];
    }
    if (cmd === 'cat interests.txt') {
      return [{ type: 'output', text: this.i18n.t('about.interests') }];
    }
    if (cmd === 'ls') {
      return [{ type: 'output', text: 'current_role.txt  interests.txt  skills.sh  contact.json' }];
    }
    if (cmd === 'cat skills.sh') {
      return [{ type: 'output', text: this.i18n.t('about.terminal.skills') }];
    }
    if (cmd === 'cat contact.json') {
      return [{ type: 'output', text: '{\n  "email": "enriqueav1999@gmail.com",\n  "github": "github.com/enriqueav99",\n  "linkedin": "linkedin.com/in/enrique-andres-villar"\n}' }];
    }
    if (cmd === 'neofetch') {
      return [{ type: 'output', text: this.i18n.t('about.terminal.neofetch') }];
    }
    if (cmd.startsWith('echo ')) {
      return [{ type: 'output', text: raw.substring(5) }];
    }
    if (cmd.startsWith('sudo')) {
      return [{ type: 'output', text: this.i18n.t('about.terminal.sudo') }];
    }
    return [{ type: 'output', text: `${this.i18n.t('about.terminal.notfound')}: ${raw.split(' ')[0]}` }];
  }

  private getInitialHistory(): TermLine[] {
    return [
      { type: 'cmd', text: 'whoami' },
      { type: 'output', text: this.i18n.t('about.whoami') },
      { type: 'cmd', text: 'cat current_role.txt' },
      { type: 'output', text: this.i18n.t('about.role'), html: true },
      { type: 'cmd', text: 'cat interests.txt' },
      { type: 'output', text: this.i18n.t('about.interests') },
    ];
  }

  private scrollToBottom() {
    const el = this.terminalBody?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
