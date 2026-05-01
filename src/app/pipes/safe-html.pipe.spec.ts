import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = TestBed.runInInjectionContext(() => new SafeHtmlPipe());
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a SafeHtml value', () => {
    const result = pipe.transform('<strong>test</strong>');
    expect(result).toBeTruthy();
    expect(result.toString()).toContain('test');
  });

  it('should handle empty strings', () => {
    const result = pipe.transform('');
    expect(result).toBeTruthy();
  });

  it('should pass through HTML with special characters', () => {
    const html = '<span class="accent">Inditex</span>';
    const result = pipe.transform(html);
    expect(result).toBeTruthy();
  });
});
