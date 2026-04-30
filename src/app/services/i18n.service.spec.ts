import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('should default to Spanish', () => {
    expect(service.lang()).toBe('es');
  });

  it('should toggle from es to en', () => {
    service.toggle();
    expect(service.lang()).toBe('en');
  });

  it('should toggle back from en to es', () => {
    service.toggle();
    service.toggle();
    expect(service.lang()).toBe('es');
  });

  it('should update document.documentElement.lang on toggle', () => {
    service.toggle();
    expect(document.documentElement.lang).toBe('en');
    service.toggle();
    expect(document.documentElement.lang).toBe('es');
  });

  it('should return Spanish translation by default', () => {
    expect(service.t('nav.about')).toBe('Sobre mí');
  });

  it('should return English translation after toggle', () => {
    service.toggle();
    expect(service.t('nav.about')).toBe('About');
  });

  it('should return the key itself for missing translations', () => {
    expect(service.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('should translate all nav keys in both languages', () => {
    const navKeys = [
      'nav.about', 'nav.experience', 'nav.skills', 'nav.opensource',
      'nav.homelab', 'nav.education', 'nav.blog', 'nav.contact',
    ];
    for (const key of navKeys) {
      expect(service.t(key)).not.toBe(key);
    }
    service.toggle();
    for (const key of navKeys) {
      expect(service.t(key)).not.toBe(key);
    }
  });

  it('should translate hero keys', () => {
    expect(service.t('hero.greeting')).toBe('Hola, soy');
    service.toggle();
    expect(service.t('hero.greeting')).toBe("Hi, I'm");
  });

  it('should support HTML content in translations', () => {
    const desc = service.t('hero.description');
    expect(desc).toContain('<strong>');
    expect(desc).toContain('Kubernetes');
  });
});
