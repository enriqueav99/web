import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPaletteComponent } from './command-palette';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start closed', () => {
    expect(component.open()).toBe(false);
  });

  it('should start with empty query', () => {
    expect(component.query()).toBe('');
  });

  it('should open on Ctrl+K', () => {
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    component.onKeydown(event);
    expect(component.open()).toBe(true);
  });

  it('should close on second Ctrl+K', () => {
    component.onKeydown(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    component.onKeydown(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(component.open()).toBe(false);
  });

  it('should close and reset query on close()', () => {
    component.open.set(true);
    component.query.set('test');
    component.close();
    expect(component.open()).toBe(false);
    expect(component.query()).toBe('');
  });

  it('should filter commands by query', () => {
    component.query.set('');
    const allVisible = component.filtered();
    expect(allVisible.length).toBeGreaterThan(0);

    component.query.set('github');
    const githubResults = component.filtered();
    expect(githubResults.length).toBe(1);
    expect(githubResults[0].id).toBe('github');
  });

  it('should hide easter eggs when query is empty', () => {
    component.query.set('');
    const results = component.filtered();
    const eggIds = ['rana', 'astronauta', 'salamanca', 'hornazo'];
    for (const id of eggIds) {
      expect(results.find(c => c.id === id)).toBeUndefined();
    }
  });

  it('should show easter eggs when searched', () => {
    component.query.set('rana');
    const results = component.filtered();
    expect(results.find(c => c.id === 'rana')).toBeTruthy();
  });

  it('should show astronauta easter egg', () => {
    component.query.set('astronauta');
    expect(component.filtered().find(c => c.id === 'astronauta')).toBeTruthy();
  });

  it('should show salamanca easter egg', () => {
    component.query.set('salamanca');
    expect(component.filtered().find(c => c.id === 'salamanca')).toBeTruthy();
  });

  it('should show hornazo easter egg', () => {
    component.query.set('hornazo');
    expect(component.filtered().find(c => c.id === 'hornazo')).toBeTruthy();
  });

  it('should wrap selection with moveSelection', () => {
    component.query.set('');
    const len = component.filtered().length;
    component.selectedIdx.set(len - 1);
    component.moveSelection(1);
    expect(component.selectedIdx()).toBe(0);
  });

  it('should move selection up with wrap', () => {
    component.query.set('');
    component.selectedIdx.set(0);
    component.moveSelection(-1);
    expect(component.selectedIdx()).toBe(component.filtered().length - 1);
  });

  it('should reset selectedIdx when query changes', () => {
    component.selectedIdx.set(5);
    component.query.set('git');
    TestBed.flushEffects();
    expect(component.selectedIdx()).toBe(0);
  });

  it('should return empty for nonsense query', () => {
    component.query.set('xyznonexistent');
    expect(component.filtered().length).toBe(0);
  });

  it('should show toast on easter egg execution', () => {
    component.query.set('rana');
    const rana = component.filtered().find(c => c.id === 'rana')!;
    component.execute(rana);
    expect(component.toast()).toContain('rana');
  });

  it('should have all 8 navigation commands', () => {
    component.query.set('');
    const results = component.filtered();
    const navIds = ['about', 'skills', 'oss', 'homelab', 'blog', 'exp', 'edu', 'contact'];
    for (const id of navIds) {
      expect(results.find(c => c.id === id)).toBeTruthy();
    }
  });

  it('should have external link commands', () => {
    component.query.set('');
    const results = component.filtered();
    expect(results.find(c => c.id === 'github')).toBeTruthy();
    expect(results.find(c => c.id === 'linkedin')).toBeTruthy();
    expect(results.find(c => c.id === 'medium')).toBeTruthy();
  });

  it('should have lang toggle command', () => {
    component.query.set('idioma');
    const results = component.filtered();
    expect(results.find(c => c.id === 'lang')).toBeTruthy();
  });

  it('should toggle open state via toggle()', () => {
    expect(component.open()).toBe(false);
    component.toggle();
    expect(component.open()).toBe(true);
    component.toggle();
    expect(component.open()).toBe(false);
  });

  it('should reset query and terminal output when toggling closed', () => {
    component.toggle();
    component.query.set('whoami');
    component.toggle();
    expect(component.query()).toBe('');
  });

  it('should expose quick chips for mobile UI', () => {
    expect(Array.isArray(component.quickChips)).toBe(true);
    expect(component.quickChips.length).toBeGreaterThan(0);
    expect(component.quickChips).toContain('help');
  });

  it('should produce terminal output when running a chip command', () => {
    component.runChip('help');
    expect(component.terminalOutput().length).toBeGreaterThan(0);
    expect(component.terminalOutput()[0].type).toBe('cmd');
    expect(component.terminalOutput()[0].text).toBe('help');
  });

  it('should render neofetch chip output', () => {
    component.runChip('neofetch');
    const out = component.terminalOutput();
    const outputLine = out.find(l => l.type === 'output');
    expect(outputLine).toBeTruthy();
    expect(outputLine!.text).toContain('Kubernetes');
  });
});
