import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#hero')).toBeTruthy();
  });

  it('should render the boot-log container for mobile', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.boot-log')).toBeTruthy();
  });

  it('should start with empty boot lines (only populated on coarse pointer)', () => {
    expect(component.bootLines()).toEqual([]);
  });

  it('should expose glitchActive signal that starts as false', () => {
    expect(component.glitchActive()).toBe(false);
  });

  it('should activate glitch when triggered', async () => {
    component.triggerGlitch();
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    expect(component.glitchActive()).toBe(true);
  });
});
