import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with scrolled = false', () => {
    expect(component.scrolled()).toBe(false);
  });

  it('should start with menuOpen = false', () => {
    expect(component.menuOpen()).toBe(false);
  });

  it('should have 8 navigation links', () => {
    expect(component.links.length).toBe(8);
  });

  it('should contain all section ids', () => {
    const ids = component.links.map(l => l.id);
    expect(ids).toContain('about');
    expect(ids).toContain('skills');
    expect(ids).toContain('opensource');
    expect(ids).toContain('homelab');
    expect(ids).toContain('blog');
    expect(ids).toContain('experience');
    expect(ids).toContain('education');
    expect(ids).toContain('contact');
  });

  it('should toggle menu', () => {
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(false);
  });

  it('should close menu', () => {
    component.menuOpen.set(true);
    component.closeMenu();
    expect(component.menuOpen()).toBe(false);
  });

  it('should render the logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.logo');
    expect(logo).toBeTruthy();
    expect(logo?.textContent).toContain('EAV');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.nav-links a');
    expect(links.length).toBe(8);
  });

  it('should render the language toggle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggles = compiled.querySelectorAll('.lang-toggle');
    const langToggle = toggles[1];
    expect(langToggle).toBeTruthy();
    expect(langToggle?.textContent?.trim()).toMatch(/^(EN|ES)$/);
  });

  it('should toggle language display text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const langToggle = compiled.querySelectorAll('.lang-toggle')[1]!;
    const initial = langToggle.textContent?.trim();
    component.i18n.toggle();
    fixture.detectChanges();
    const after = langToggle.textContent?.trim();
    expect(initial).not.toBe(after);
  });

  it('should render the theme toggle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const themeToggle = compiled.querySelectorAll('.lang-toggle')[0];
    expect(themeToggle).toBeTruthy();
    expect(themeToggle?.textContent?.trim()).toMatch(/^(☀️|🌙)$/);
  });

  it('should toggle theme icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const themeToggle = compiled.querySelectorAll('.lang-toggle')[0]!;
    const initial = themeToggle.textContent?.trim();
    component.theme.toggle();
    fixture.detectChanges();
    const after = themeToggle.textContent?.trim();
    expect(initial).not.toBe(after);
  });

  it('should render hamburger button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const hamburger = compiled.querySelector('.hamburger');
    expect(hamburger).toBeTruthy();
  });

  it('each link should have a valid i18n key', () => {
    for (const link of component.links) {
      const translated = component.i18n.t(link.key);
      expect(translated).not.toBe(link.key);
    }
  });
});
