import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en';

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.about': { es: 'Sobre mí', en: 'About' },
  'nav.experience': { es: 'Experiencia', en: 'Experience' },
  'nav.skills': { es: 'Skills', en: 'Skills' },
  'nav.opensource': { es: 'Open Source', en: 'Open Source' },
  'nav.homelab': { es: 'Homelab', en: 'Homelab' },
  'nav.education': { es: 'Formación', en: 'Education' },
  'nav.blog': { es: 'Blog', en: 'Blog' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },

  // Hero
  'hero.greeting': { es: 'Hola, soy', en: "Hi, I'm" },
  'hero.description': {
    es: 'Platform/DevOps Engineer construyendo infraestructura escalable con <strong>Kubernetes</strong> & <strong>OpenShift</strong> en <strong class="accent">Inditex</strong>',
    en: 'Platform/DevOps Engineer building scalable infrastructure with <strong>Kubernetes</strong> & <strong>OpenShift</strong> at <strong class="accent">Inditex</strong>',
  },
  'hero.about': { es: 'Conóceme', en: 'About me' },

  // About
  'about.label': { es: '// 01. Sobre mí', en: '// 01. About me' },
  'about.title': { es: '¿Quién soy?', en: 'Who am I?' },
  'about.whoami': {
    es: 'Platform/DevOps Engineer con más de 3 años de experiencia construyendo infraestructura cloud y on-premise escalable y de alta disponibilidad.',
    en: 'Platform/DevOps Engineer with 3+ years of experience building scalable, high-availability cloud and on-premise infrastructure.',
  },
  'about.role': {
    es: '<span class="highlight">Platform Engineer</span> en <span class="accent">Inditex</span> (Arteixo), operando plataformas basadas en contenedores con Kubernetes y OpenShift.',
    en: '<span class="highlight">Platform Engineer</span> at <span class="accent">Inditex</span> (Arteixo), operating container-based platforms with Kubernetes & OpenShift.',
  },
  'about.interests': {
    es: 'Apasionado por la automatización, GitOps, observabilidad, y mejorar la developer experience. Contribuidor open source.',
    en: 'Passionate about automation, GitOps, observability, and improving developer experience. Open source contributor.',
  },
  'about.location': { es: 'Ubicación', en: 'Location' },
  'about.education': { es: 'Educación', en: 'Education' },
  'about.edu_value': { es: 'Ing. Informática + Experto Big Data (UPSA)', en: 'Computer Science + Big Data Expert (UPSA)' },
  'about.languages': { es: 'Idiomas', en: 'Languages' },
  'about.lang_value': { es: 'Español (nativo) · Inglés (profesional)', en: 'Spanish (native) · English (professional)' },
  'about.achievements': { es: 'Logros', en: 'Achievements' },
  'about.achieve_value': { es: '4 premios en hackathons · Contribuidor OSS', en: '4 hackathon awards · OSS Contributor' },

  // About — Interactive Terminal
  'about.terminal.placeholder': { es: 'Escribe un comando...', en: 'Type a command...' },
  'about.terminal.help': {
    es: 'Comandos disponibles:\n  whoami          — Quién soy\n  cat current_role.txt — Mi rol actual\n  cat interests.txt    — Intereses\n  cat skills.sh        — Tech stack\n  cat contact.json     — Contacto\n  ls                   — Listar ficheros\n  neofetch             — Info del sistema\n  echo [texto]         — Repetir texto\n  clear                — Limpiar terminal\n  help                 — Esta ayuda',
    en: 'Available commands:\n  whoami          — Who I am\n  cat current_role.txt — My current role\n  cat interests.txt    — Interests\n  cat skills.sh        — Tech stack\n  cat contact.json     — Contact info\n  ls                   — List files\n  neofetch             — System info\n  echo [text]          — Repeat text\n  clear                — Clear terminal\n  help                 — This help',
  },
  'about.terminal.skills': {
    es: '#!/bin/bash\n# Tech stack principal\nCONTAINERS="Kubernetes OpenShift Docker"\nIAC="Terraform Ansible ArgoCD"\nOBS="Grafana Prometheus Loki Vector"\nLANG="Python Bash Golang Java C"\nCLOUD="AWS Azure Linux"\necho "Ready to deploy 🚀"',
    en: '#!/bin/bash\n# Main tech stack\nCONTAINERS="Kubernetes OpenShift Docker"\nIAC="Terraform Ansible ArgoCD"\nOBS="Grafana Prometheus Loki Vector"\nLANG="Python Bash Golang Java C"\nCLOUD="AWS Azure Linux"\necho "Ready to deploy 🚀"',
  },
  'about.terminal.neofetch': {
    es: '       ╭──────────────────────╮\n  ●    │ OS:    Kubernetes v1.31│\n ╱│╲   │ Shell: Bash 5.2       │\n  │    │ IDE:   Neovim + tmux  │\n ╱ ╲   │ Cloud: AWS / Azure    │\n       │ Uptime: 3+ años       │\n       ╰──────────────────────╯',
    en: '       ╭──────────────────────╮\n  ●    │ OS:    Kubernetes v1.31│\n ╱│╲   │ Shell: Bash 5.2       │\n  │    │ IDE:   Neovim + tmux  │\n ╱ ╲   │ Cloud: AWS / Azure    │\n       │ Uptime: 3+ years      │\n       ╰──────────────────────╯',
  },
  'about.terminal.notfound': { es: 'command not found', en: 'command not found' },
  'about.terminal.sudo': { es: 'Nice try 😏 No tienes permisos de superusuario aquí.', en: 'Nice try 😏 You have no superuser privileges here.' },

  // Experience
  'exp.label': { es: '// 06. Experiencia', en: '// 06. Experience' },
  'exp.title': { es: 'Dónde trabajo', en: 'Where I work' },
  'exp.current': { es: 'Actual', en: 'Current' },
  'exp.finished': { es: 'Finalizado', en: 'Finished' },
  'exp.inditex.date': { es: 'Oct 2023 — Actualidad', en: 'Oct 2023 — Present' },
  'exp.inditex.p1': {
    es: 'Opero y mejoro plataformas de contenedores de alta disponibilidad con Kubernetes (K8s), OpenShift (OCP) y Docker en entornos cloud y on-premise.',
    en: 'Operate and improve high-availability container platforms using Kubernetes (K8s), OpenShift (OCP), and Docker across cloud and on-premise environments.',
  },
  'exp.inditex.p2': {
    es: 'Gestión del ciclo CI/CD con ArgoCD y GitHub Actions; automatización de infraestructura con Ansible y Terraform (IaC); participación en guardias resolviendo incidencias de producción.',
    en: 'Manage CI/CD lifecycle with ArgoCD and GitHub Actions; automate infrastructure with Ansible and Terraform (IaC); participate in on-call rotations resolving production incidents.',
  },
  'exp.inditex.p3': {
    es: 'Desarrollo y publicación de un Kubernetes Operator open source (Operator SDK/Golang) para gobernanza de recursos — publicado en InditexTech en GitHub.',
    en: 'Built and released an open-source Kubernetes Operator (Operator SDK/Golang) to enforce resource governance — published under InditexTech on GitHub.',
  },
  'exp.inditex.p4': {
    es: 'Amplio conocimiento del stack de observabilidad (Grafana, Prometheus, Loki, Vector, Netdata) — métricas en tiempo real, alerting y agregación de logs.',
    en: 'Deep knowledge of the observability stack (Grafana, Prometheus, Loki, Vector, Netdata) — real-time metrics, alerting, and log aggregation.',
  },
  'exp.profuturo.date': { es: 'Jun 2022 — Jun 2023', en: 'Jun 2022 — Jun 2023' },
  'exp.profuturo.p1': {
    es: 'Diseño e implementación de pipelines ETL con Python y R; modelos predictivos y visualización con TIBCO Spotfire.',
    en: 'Designed and implemented ETL pipelines using Python and R; built predictive models and visualised results via TIBCO Spotfire dashboards.',
  },
  'exp.profuturo.p2': {
    es: 'Desarrollo de soluciones de scripting y automatización de workflows de datos.',
    en: 'Developed scripting solutions and automated data workflows.',
  },

  // Skills
  'skills.label': { es: '// 02. Tech Stack', en: '// 02. Tech Stack' },
  'skills.title': { es: 'Skills & Tecnologías', en: 'Skills & Technologies' },
  'skills.containers': { es: 'Contenedores & Orquestación', en: 'Containers & Orchestration' },
  'skills.iac': { es: 'IaC & CI/CD', en: 'IaC & CI/CD' },
  'skills.observability': { es: 'Observabilidad', en: 'Observability' },
  'skills.languages': { es: 'Lenguajes & Scripting', en: 'Languages & Scripting' },
  'skills.cloud': { es: 'Cloud & Networking', en: 'Cloud & Networking' },
  'skills.data': { es: 'Data Engineering', en: 'Data Engineering' },
  'skills.ai': { es: 'AI & Agentes', en: 'AI & Agents' },

  // Open Source
  'oss.label': { es: '// 03. Open Source', en: '// 03. Open Source' },
  'oss.title': { es: 'Contribuciones', en: 'Contributions' },
  'oss.argocd.desc': {
    es: 'Contribución de una feature que permite la inyección de labels/annotations custom en pods desplegados por el ArgoCD Operator.',
    en: 'Contributed a feature enabling injection of custom labels/annotations into pods deployed by the ArgoCD Operator.',
  },
  'oss.overcommit.desc': {
    es: 'Operador K8s que aplica automáticamente políticas de overcommit de recursos basadas en quality tiers, mejorando la eficiencia del cluster.',
    en: 'K8s operator that automatically applies resource overcommit policies based on quality tiers, improving cluster efficiency.',
  },
  'oss.writing': { es: 'Technical Writing — Medium', en: 'Technical Writing — Medium' },
  'oss.article1': {
    es: '"Install ArgoCD in K3s with certManager and Traefik" — guía paso a paso cubriendo TLS, HTTP/gRPC routing, y CI/CD setup.',
    en: '"Install ArgoCD in K3s with certManager and Traefik" — step-by-step guide covering TLS, HTTP/gRPC routing, and CI/CD setup.',
  },
  'oss.article2': {
    es: '"Certmonger + Vault: Building a Self-Renewing PKI Pipeline on Linux" — pipeline PKI auto-renovable con HashiCorp Vault y certmonger.',
    en: '"Certmonger + Vault: Building a Self-Renewing PKI Pipeline on Linux" — self-renewing PKI pipeline with HashiCorp Vault and certmonger.',
  },

  // Homelab
  'homelab.label': { es: '// 04. Homelab', en: '// 04. Homelab' },
  'homelab.title': { es: 'Mi Servidor', en: 'My Server' },
  'homelab.subtitle': {
    es: 'Laboratorio personal donde experimento con tecnologías, self-hosting y automatización.',
    en: 'Personal lab where I experiment with technologies, self-hosting, and automation.',
  },
  'homelab.media': { es: 'Media', en: 'Media' },
  'homelab.network': { es: 'Red & Seguridad', en: 'Network & Security' },
  'homelab.infra': { es: 'Infra & Ops', en: 'Infra & Ops' },
  'homelab.monitoring': { es: 'Monitorización', en: 'Monitoring' },
  'homelab.productivity': { es: 'Productividad', en: 'Productivity' },
  'homelab.dev': { es: 'Dev & Tools', en: 'Dev & Tools' },
  'homelab.k3s': { es: 'K3s Cluster', en: 'K3s Cluster' },
  'homelab.source': { es: 'Ver configs en GitHub', en: 'View configs on GitHub' },

  // Education
  'edu.label': { es: '// 07. Formación & Premios', en: '// 07. Education & Awards' },
  'edu.title': { es: 'Educación & Hackathons', en: 'Education & Hackathons' },
  'edu.education': { es: 'Educación', en: 'Education' },
  'edu.hackathons': { es: 'Hackathons & Premios', en: 'Hackathons & Awards' },
  'edu.bigdata': { es: 'Experto en Big Data (Postgrado)', en: 'Big Data Expert (Postgraduate)' },
  'edu.bigdata.desc': {
    es: 'Proyecto final nota 10/10: "Deployment of applications in Kubernetes under a GitOps philosophy". Matrícula de Honor en Sistemas de Información.',
    en: 'Final project grade 10/10: "Deployment of applications in Kubernetes under a GitOps philosophy". Distinction (highest honors) in Information Systems.',
  },
  'edu.cs': { es: 'Ingeniería Informática (Grado)', en: 'Computer Science & Engineering (Degree)' },
  'edu.cs.desc': {
    es: 'Becado para el postgrado tras ganar un hackathon universitario.',
    en: 'Awarded a postgraduate scholarship after winning a university hackathon.',
  },
  'edu.hack4good.desc': {
    es: 'Hackathon de innovación social promovido por Telefónica en toda España.',
    en: 'Social innovation hackathon promoted by Telefónica across Spain.',
  },
  'edu.hack4good.project': { es: 'AquaWise — solución de gestión del agua', en: 'AquaWise — water management solution' },
  'edu.hack4edu21.desc': {
    es: 'Competición internacional multidisciplinar sobre retos de educación digital.',
    en: 'International multidisciplinary competition on digital education challenges.',
  },
  'edu.hack4edu21.project': {
    es: 'Aplicación de priorización de ayuda para ProFuturo',
    en: 'Application for prioritizing aid in ProFuturo project',
  },
  'edu.hack4edu23.desc': {
    es: 'Competición internacional multidisciplinar sobre retos de educación digital — Edición Senior.',
    en: 'International multidisciplinary competition on digital education challenges — Senior Edition.',
  },
  'edu.talent.desc': {
    es: 'Reconocido en el Plan de Talento (TCUE) por "Reality Warping", proyecto tutorizado y seleccionado por su impacto social.',
    en: 'Recognized under the Talent Plan (TCUE) for "Reality Warping", a student project selected for its social innovation impact.',
  },
  'edu.hack4edu23.position': { es: '🥇 1er Puesto', en: '🥇 1st Place' },
  'edu.hack4good.position': { es: '🥉 3er Puesto', en: '🥉 3rd Place' },
  'edu.hack4edu21.position': { es: '🥉 3er Puesto Senior', en: '🥉 3rd Place Senior' },
  'edu.talent.position': { es: '🏅 Premiado', en: '🏅 Awarded' },
  'edu.project_label': { es: 'Proyecto:', en: 'Project:' },

  // Blog
  'blog.label': { es: '// 05. Blog', en: '// 05. Blog' },
  'blog.title': { es: 'Artículos', en: 'Articles' },
  'blog.subtitle': {
    es: 'Guías técnicas y aprendizajes que comparto en Medium.',
    en: 'Technical guides and learnings I share on Medium.',
  },
  'blog.article1': {
    es: 'Instalación de ArgoCD en un cluster K3s con Traefik como ingress y cert-manager para TLS automático con Let\'s Encrypt.',
    en: 'Installing ArgoCD on a K3s cluster with Traefik as ingress and cert-manager for automatic TLS via Let\'s Encrypt.',
  },
  'blog.article2': {
    es: 'Pipeline PKI auto-renovable con HashiCorp Vault y certmonger.',
    en: 'Self-renewing PKI pipeline with HashiCorp Vault and certmonger.',
  },
  'blog.read': { es: 'Leer artículo', en: 'Read article' },

  // Contact
  'contact.label': { es: '// 08. Contacto', en: '// 08. Contact' },
  'contact.title': { es: '¿Hablamos?', en: "Let's talk?" },
  'contact.text': {
    es: 'Si te mola algo de lo que hago, quieres colaborar en open source o simplemente echar un rato hablando de tecnología, escríbeme.',
    en: "If you like what I do, want to collaborate on open source, or just chat about tech, drop me a line.",
  },
  'contact.cta': { es: 'Escríbeme', en: 'Get in touch' },
  'contact.footer.by': { es: 'Diseñado & desarrollado por', en: 'Designed & built by' },
  'contact.footer.a11y': {
    es: 'Navegable por teclado · Respeta prefers-reduced-motion · Screen reader friendly',
    en: 'Keyboard navigable · Respects prefers-reduced-motion · Screen reader friendly',
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>('es');

  toggle() {
    this.lang.update(l => {
      const next = l === 'es' ? 'en' : 'es';
      document.documentElement.lang = next;
      return next;
    });
  }

  t(key: string): string {
    const entry = translations[key];
    if (!entry) return key;
    return entry[this.lang()] ?? key;
  }
}
