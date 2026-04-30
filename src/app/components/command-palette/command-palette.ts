import { Component, HostListener, signal, computed, inject, ElementRef, ViewChild, effect } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface Command {
  id: string;
  icon: string;
  label: string;
  section?: string;
  action: () => void;
}

interface TerminalLine {
  type: 'cmd' | 'output';
  text: string;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  template: `
    @if (toast()) {
      <div class="toast" (click)="toast.set('')">{{ toast() }}</div>
    }
    @if (open()) {
      <div class="overlay" (click)="close()">
        <div class="palette" (click)="$event.stopPropagation()">
          <div class="search-bar">
            <span class="prompt">~$</span>
            <input #input
              type="text"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              [placeholder]="i18n.lang() === 'es' ? 'Escribe un comando...' : 'Type a command...'"
              [value]="query()"
              (input)="query.set(input.value)"
              (keydown.escape)="close()"
              (keydown.arrowdown)="moveSelection(1)"
              (keydown.arrowup)="moveSelection(-1)"
              (keydown.enter)="handleEnter()"
            />
            <button class="close-btn" type="button" (click)="close()" aria-label="Close">×</button>
            <kbd>ESC</kbd>
          </div>

          <div class="quick-chips" aria-label="Quick commands">
            @for (chip of quickChips; track chip) {
              <button class="chip" type="button" (click)="runChip(chip)">{{ chip }}</button>
            }
          </div>

          @if (terminalOutput().length > 0) {
            <div class="terminal-output">
              @for (line of terminalOutput(); track $index) {
                @if (line.type === 'cmd') {
                  <p class="term-cmd"><span class="term-prompt">$</span> {{ line.text }}</p>
                } @else {
                  <pre class="term-out">{{ line.text }}</pre>
                }
              }
            </div>
          }

          @if (terminalOutput().length === 0) {
            <div class="results">
              @for (cmd of filtered(); track cmd.id; let i = $index) {
                <button class="result-item" [class.active]="i === selectedIdx()"
                  (click)="execute(cmd)" (mouseenter)="selectedIdx.set(i)">
                  <span class="result-icon">{{ cmd.icon }}</span>
                  <span class="result-label">{{ cmd.label }}</span>
                  @if (cmd.section) {
                    <span class="result-section">{{ cmd.section }}</span>
                  }
                </button>
              }
              @if (filtered().length === 0) {
                <div class="no-results">
                  {{ i18n.lang() === 'es' ? 'command not found — pulsa Enter para ejecutar' : 'command not found — press Enter to execute' }}
                </div>
              }
            </div>
          }

          <div class="footer">
            <span><kbd>↑↓</kbd> {{ i18n.lang() === 'es' ? 'navegar' : 'navigate' }}</span>
            <span><kbd>↵</kbd> {{ i18n.lang() === 'es' ? 'ejecutar' : 'execute' }}</span>
            <span><kbd>esc</kbd> {{ i18n.lang() === 'es' ? 'cerrar' : 'close' }}</span>
            <span class="footer-hint">{{ i18n.lang() === 'es' ? 'Prueba: ls, cat, whoami, help' : 'Try: ls, cat, whoami, help' }}</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);
      display: flex; align-items: flex-start; justify-content: center;
      padding-top: 20vh;
      animation: fadeIn 0.15s ease;
    }
    .palette {
      width: 100%; max-width: 580px;
      background: var(--bg-secondary); border: 1px solid var(--border);
      border-radius: var(--radius); box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      overflow: hidden; animation: slideDown 0.2s ease;
      display: flex; flex-direction: column;
    }
    .close-btn {
      display: none;
      background: none; border: none; color: var(--text-muted);
      font-size: 1.6rem; line-height: 1; padding: 0 4px; cursor: pointer;
      &:hover, &:focus { color: var(--accent); }
    }
    .quick-chips {
      display: none;
      gap: 8px; padding: 10px 16px; border-bottom: 1px solid var(--border);
      overflow-x: auto; -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }
    .chip {
      flex-shrink: 0;
      font-family: var(--font-mono); font-size: 0.78rem;
      padding: 6px 12px; border-radius: 999px;
      background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text-secondary); cursor: pointer;
      transition: all 0.15s ease;
      &:hover, &:active { border-color: var(--accent); color: var(--accent); }
    }
    .search-bar {
      display: flex; align-items: center; gap: 12px;
      padding: 16px 20px; border-bottom: 1px solid var(--border);
      .prompt { font-family: var(--font-mono); color: var(--terminal-green); font-weight: 700; }
      input {
        flex: 1; background: none; border: none; outline: none;
        font-family: var(--font-mono); font-size: 1rem; color: var(--text-primary);
        &::placeholder { color: var(--text-muted); }
      }
      kbd {
        font-family: var(--font-mono); font-size: 0.65rem; padding: 3px 6px;
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 4px; color: var(--text-muted);
      }
    }
    .results {
      max-height: 320px; overflow-y: auto; padding: 8px;
    }
    .terminal-output {
      max-height: 320px; overflow-y: auto; padding: 16px 20px;
      font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.7;
      .term-cmd {
        color: var(--terminal-green); margin-bottom: 4px;
        .term-prompt { color: var(--accent); margin-right: 8px; }
      }
      pre {
        color: var(--text-secondary); margin-bottom: 12px;
        white-space: pre-wrap; word-break: break-word;
        padding-left: 16px; border-left: 2px solid var(--border);
      }
    }
    .result-item {
      display: flex; align-items: center; gap: 12px; width: 100%;
      padding: 12px 16px; border: none; background: none; border-radius: 8px;
      cursor: pointer; text-align: left; transition: background 0.1s;
      &.active { background: rgba(245, 124, 0, 0.1); }
      .result-icon { font-size: 1.1rem; width: 24px; text-align: center; }
      .result-label { flex: 1; font-size: 0.9rem; color: var(--text-primary); font-weight: 500; }
      .result-section {
        font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);
        padding: 2px 8px; background: var(--bg-card); border-radius: 4px;
      }
    }
    .no-results {
      padding: 24px; text-align: center;
      font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);
    }
    .footer {
      display: flex; gap: 16px; padding: 12px 20px;
      border-top: 1px solid var(--border); flex-wrap: wrap;
      span { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
      .footer-hint { margin-left: auto; color: var(--accent); opacity: 0.7; }
      kbd {
        font-family: var(--font-mono); font-size: 0.6rem; padding: 2px 5px;
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 3px; color: var(--text-muted);
      }
    }
    .toast {
      position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
      z-index: 10000; padding: 16px 28px;
      background: var(--bg-card); border: 1px solid var(--accent);
      border-radius: var(--radius); box-shadow: 0 8px 32px rgba(245, 124, 0, 0.2);
      font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-primary);
      cursor: pointer; animation: toastIn 0.3s ease, toastOut 0.3s ease 3.7s forwards;
      white-space: nowrap;
    }
    @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    @keyframes toastOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 768px), (pointer: coarse) {
      .overlay { padding-top: 0; align-items: stretch; }
      .palette {
        max-width: 100%; height: 100dvh; max-height: 100dvh;
        border-radius: 0; border-left: none; border-right: none;
        animation: fadeIn 0.2s ease;
      }
      .close-btn { display: inline-flex; }
      .search-bar kbd { display: none; }
      .quick-chips { display: flex; }
      .results, .terminal-output { flex: 1; max-height: none; }
      .footer { display: none; }
    }
  `]
})
export class CommandPaletteComponent {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;
  i18n = inject(I18nService);

  open = signal(false);
  query = signal('');
  selectedIdx = signal(0);
  toast = signal('');
  terminalOutput = signal<TerminalLine[]>([]);

  private commands: Command[] = [];

  constructor() {
    effect(() => {
      if (this.open()) {
        setTimeout(() => this.inputRef?.nativeElement.focus(), 50);
      }
    });

    effect(() => {
      this.query();
      this.selectedIdx.set(0);
    });

    this.commands = [
      { id: 'about', icon: '👤', label: 'Sobre mí / About', section: '#about', action: () => this.goto('about') },
      { id: 'skills', icon: '⚡', label: 'Tech Stack', section: '#skills', action: () => this.goto('skills') },
      { id: 'oss', icon: '🔓', label: 'Open Source', section: '#opensource', action: () => this.goto('opensource') },
      { id: 'homelab', icon: '🖥️', label: 'Homelab', section: '#homelab', action: () => this.goto('homelab') },
      { id: 'blog', icon: '✍️', label: 'Blog / Artículos', section: '#blog', action: () => this.goto('blog') },
      { id: 'exp', icon: '💼', label: 'Experiencia', section: '#experience', action: () => this.goto('experience') },
      { id: 'edu', icon: '🎓', label: 'Educación', section: '#education', action: () => this.goto('education') },
      { id: 'contact', icon: '✉️', label: 'Contacto', section: '#contact', action: () => this.goto('contact') },
      { id: 'github', icon: '🐙', label: 'GitHub', section: 'link', action: () => window.open('https://github.com/enriqueav99', '_blank') },
      { id: 'linkedin', icon: '🔗', label: 'LinkedIn', section: 'link', action: () => window.open('https://www.linkedin.com/in/enrique-andres-villar', '_blank') },
      { id: 'medium', icon: '📝', label: 'Medium', section: 'link', action: () => window.open('https://medium.com/@enriqueav1999', '_blank') },
      { id: 'lang', icon: '🌐', label: 'Cambiar idioma / Toggle language', action: () => { this.i18n.toggle(); this.close(); } },
      { id: 'top', icon: '🔝', label: 'Ir arriba / Scroll to top', action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); this.close(); } },
      { id: 'rana', icon: '🐸', label: '???', action: () => { this.close(); this.showEgg('🐸 Has encontrado la rana de la Universidad! Buena suerte en los exámenes.'); } },
      { id: 'astronauta', icon: '👨‍🚀', label: '???', action: () => { this.close(); this.showEgg('👨‍🚀 El astronauta de la Catedral Nueva de Salamanca te saluda desde 1992.'); } },
      { id: 'salamanca', icon: '🏛️', label: '???', action: () => { this.close(); this.showEgg('🏛️ Lo que natura non da, Salmantica non praesta.'); } },
      { id: 'hornazo', icon: '🥧', label: '???', action: () => { this.close(); this.showEgg('🥧 Lunes de Aguas sin hornazo no es Lunes de Aguas.'); } },
    ];
  }

  private eggIds = new Set(['rana', 'astronauta', 'salamanca', 'hornazo']);

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.commands.filter(c => !this.eggIds.has(c.id));
    return this.commands.filter(c =>
      c.label.toLowerCase().includes(q) || c.id.includes(q)
    );
  });

  readonly quickChips = ['help', 'whoami', 'ls', 'cat about', 'skills', 'contact', 'neofetch'];

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.toggle();
    }
  }

  toggle() {
    this.open.set(!this.open());
    this.query.set('');
    this.terminalOutput.set([]);
  }

  close() {
    this.open.set(false);
    this.query.set('');
    this.terminalOutput.set([]);
  }

  runChip(chip: string) {
    if (chip === 'cat about') {
      const aboutCmd = this.commands.find(c => c.id === 'about');
      if (aboutCmd) { this.execute(aboutCmd); return; }
    }
    if (chip === 'skills') {
      const skillsCmd = this.commands.find(c => c.id === 'skills');
      if (skillsCmd) { this.execute(skillsCmd); return; }
    }
    if (chip === 'contact') {
      const contactCmd = this.commands.find(c => c.id === 'contact');
      if (contactCmd) { this.execute(contactCmd); return; }
    }
    this.query.set(chip);
    this.runTerminal(chip);
  }

  moveSelection(delta: number) {
    const len = this.filtered().length;
    if (!len) return;
    this.selectedIdx.set((this.selectedIdx() + delta + len) % len);
    setTimeout(() => {
      const active = this.inputRef?.nativeElement
        .closest('.palette')
        ?.querySelector('.result-item.active');
      active?.scrollIntoView({ block: 'nearest' });
    });
  }

  private terminalCommands = new Set([
    'help', 'whoami', 'pwd', 'ls', 'dir', 'cat', 'neofetch',
    'echo', 'clear', 'date', 'uptime', 'hostname', 'uname', 'sudo', 'rm'
  ]);

  private isTerminalCommand(input: string): boolean {
    const first = input.toLowerCase().trim().split(/\s+/)[0];
    return this.terminalCommands.has(first);
  }

  handleEnter() {
    const q = this.query().trim();

    if (!q) {
      const cmds = this.filtered();
      if (cmds.length > 0) {
        this.execute(cmds[this.selectedIdx()]);
      }
      return;
    }

    if (this.terminalOutput().length > 0 || this.isTerminalCommand(q)) {
      this.runTerminal(q);
      return;
    }

    const cmds = this.filtered();
    if (cmds.length > 0) {
      this.execute(cmds[this.selectedIdx()]);
      return;
    }

    this.runTerminal(q);
  }

  private runTerminal(raw: string) {
    const result = this.resolveTerminalCommand(raw);
    if (result === null) return;
    const lines = [...this.terminalOutput(), { type: 'cmd' as const, text: raw }, { type: 'output' as const, text: result }];
    this.terminalOutput.set(lines);
    this.query.set('');
  }

  executeSelected() {
    this.handleEnter();
  }

  execute(cmd: Command) {
    cmd.action();
  }

  private resolveTerminalCommand(raw: string): string | null {
    const cmd = raw.toLowerCase().trim();
    const isEs = this.i18n.lang() === 'es';

    if (cmd === 'help') {
      return isEs
        ? 'Comandos disponibles:\n  whoami            — Quién soy\n  ls               — Listar ficheros\n  cat <archivo>    — Ver contenido\n  pwd              — Directorio actual\n  neofetch         — Info del sistema\n  echo [texto]     — Repetir texto\n  clear            — Limpiar salida\n  help             — Esta ayuda\n\nArchivos: current_role.txt interests.txt skills.sh contact.json'
        : 'Available commands:\n  whoami            — Who I am\n  ls               — List files\n  cat <file>       — View contents\n  pwd              — Current directory\n  neofetch         — System info\n  echo [text]      — Repeat text\n  clear            — Clear output\n  help             — This help\n\nFiles: current_role.txt interests.txt skills.sh contact.json';
    }

    if (cmd === 'whoami') {
      return isEs
        ? 'Enrique Andrés Villar — Platform/DevOps Engineer @ Inditex'
        : 'Enrique Andrés Villar — Platform/DevOps Engineer @ Inditex';
    }

    if (cmd === 'pwd') {
      return '/home/enrique/eav-site';
    }

    if (cmd === 'ls' || cmd === 'ls -la' || cmd === 'ls -l' || cmd === 'ls -a' || cmd === 'dir') {
      return 'current_role.txt  interests.txt  skills.sh  contact.json  README.md';
    }

    if (cmd === 'cat current_role.txt' || cmd === 'cat ./current_role.txt') {
      return isEs
        ? 'Platform Engineer en Inditex (Arteixo)\nOperando plataformas basadas en contenedores con Kubernetes y OpenShift.\nCI/CD con ArgoCD y GitHub Actions. IaC con Terraform y Ansible.'
        : 'Platform Engineer at Inditex (Arteixo)\nOperating container-based platforms with Kubernetes & OpenShift.\nCI/CD with ArgoCD and GitHub Actions. IaC with Terraform and Ansible.';
    }

    if (cmd === 'cat interests.txt' || cmd === 'cat ./interests.txt') {
      return isEs
        ? 'Automatización, GitOps, Observabilidad, Developer Experience.\nContribuidor open source. Homelab enthusiast.'
        : 'Automation, GitOps, Observability, Developer Experience.\nOpen source contributor. Homelab enthusiast.';
    }

    if (cmd === 'cat skills.sh' || cmd === 'cat ./skills.sh') {
      return '#!/bin/bash\nCONTAINERS="Kubernetes OpenShift Docker"\nIAC="Terraform Ansible ArgoCD"\nOBS="Grafana Prometheus Loki Vector"\nLANG="Python Bash Golang Java C"\nCLOUD="AWS Azure Linux"\necho "Ready to deploy 🚀"';
    }

    if (cmd === 'cat contact.json' || cmd === 'cat ./contact.json') {
      return '{\n  "email": "enriqueav1999@gmail.com",\n  "github": "github.com/enriqueav99",\n  "linkedin": "linkedin.com/in/enrique-andres-villar",\n  "medium": "medium.com/@enriqueav1999"\n}';
    }

    if (cmd === 'cat readme.md' || cmd === 'cat ./readme.md') {
      return isEs
        ? '# Enrique Andrés Villar\nPlatform/DevOps Engineer con +3 años de experiencia.\nEspecializado en Kubernetes, OpenShift, CI/CD y observabilidad.\n4 premios en hackathons. Contribuidor OSS.'
        : '# Enrique Andrés Villar\nPlatform/DevOps Engineer with 3+ years of experience.\nSpecialized in Kubernetes, OpenShift, CI/CD and observability.\n4 hackathon awards. OSS contributor.';
    }

    if (cmd === 'neofetch') {
      return '       ╭──────────────────────────╮\n  ●    │ OS:    Kubernetes v1.31  │\n ╱│╲   │ Shell: Bash 5.2         │\n  │    │ IDE:   Neovim + tmux    │\n ╱ ╲   │ Cloud: AWS / Azure      │\n       │ Uptime: 3+ years        │\n       │ Langs: Go, Python, Bash │\n       ╰──────────────────────────╯';
    }

    if (cmd.startsWith('echo ')) {
      return raw.substring(5);
    }

    if (cmd === 'clear') {
      this.terminalOutput.set([]);
      return null;
    }

    if (cmd.startsWith('sudo')) {
      return isEs ? 'Nice try 😏 No tienes permisos de superusuario aquí.' : 'Nice try 😏 No superuser privileges here.';
    }

    if (cmd.startsWith('rm ') || cmd === 'rm') {
      return isEs ? '🚫 Operación no permitida. Esto es una landing page, no un servidor real.' : '🚫 Operation not permitted. This is a landing page, not a real server.';
    }

    if (cmd.startsWith('cat ')) {
      const file = cmd.substring(4).trim();
      return isEs ? `cat: ${file}: No existe el fichero o directorio` : `cat: ${file}: No such file or directory`;
    }

    if (cmd === 'date') {
      return new Date().toString();
    }

    if (cmd === 'uptime') {
      return isEs ? 'up 3 años, 7 meses — desde Oct 2023 (Inditex)' : 'up 3 years, 7 months — since Oct 2023 (Inditex)';
    }

    if (cmd === 'hostname') {
      return 'eav-site.dev';
    }

    if (cmd === 'uname' || cmd === 'uname -a') {
      return 'K8s 1.31.0 enrique-cluster #1 SMP aarch64 GNU/Linux';
    }

    return `${isEs ? 'command not found' : 'command not found'}: ${raw.split(' ')[0]}\n${isEs ? 'Escribe "help" para ver comandos disponibles.' : 'Type "help" to see available commands.'}`;
  }

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  private goto(id: string) {
    this.close();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private showEgg(msg: string) {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast.set(msg);
    this.toastTimer = setTimeout(() => this.toast.set(''), 4000);
  }
}
