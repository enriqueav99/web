import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should default to dark theme', () => {
    expect(service.theme()).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    service.toggle();
    expect(service.theme()).toBe('light');
  });

  it('should toggle back from light to dark', () => {
    service.toggle();
    service.toggle();
    expect(service.theme()).toBe('dark');
  });

  it('should set data-theme attribute on html element', () => {
    service.toggle();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    service.toggle();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should persist to localStorage', () => {
    service.toggle();
    expect(localStorage.getItem('theme')).toBe('light');
    service.toggle();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should restore from localStorage on creation', () => {
    localStorage.setItem('theme', 'light');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const fresh = TestBed.inject(ThemeService);
    expect(fresh.theme()).toBe('light');
  });

  it('should update meta theme-color', () => {
    const meta = document.querySelector('meta[name="theme-color"]')
      || document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', '#0a0a0f');
    if (!meta.parentElement) document.head.appendChild(meta);

    service.toggle();
    expect(meta.getAttribute('content')).toBe('#f5f5f5');
    service.toggle();
    expect(meta.getAttribute('content')).toBe('#0a0a0f');
  });
});
