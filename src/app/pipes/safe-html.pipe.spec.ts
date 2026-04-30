import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
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
