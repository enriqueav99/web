import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id "about"', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#about')).toBeTruthy();
  });

  it('should render the terminal window', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.terminal-window')).toBeTruthy();
  });

  it('should render terminal dots (red, yellow, green)', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.dot.red')).toBeTruthy();
    expect(el.querySelector('.dot.yellow')).toBeTruthy();
    expect(el.querySelector('.dot.green')).toBeTruthy();
  });

  it('should render initial terminal commands', () => {
    const el = fixture.nativeElement as HTMLElement;
    const cmds = el.querySelectorAll('.cmd');
    expect(cmds.length).toBe(3);
    expect(cmds[0].textContent).toContain('whoami');
    expect(cmds[1].textContent).toContain('cat current_role.txt');
    expect(cmds[2].textContent).toContain('cat interests.txt');
  });

  it('should render the terminal input field', () => {
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('.terminal-input input') as HTMLInputElement;
    expect(input).toBeTruthy();
  });

  it('should render 4 info cards', () => {
    const el = fixture.nativeElement as HTMLElement;
    const cards = el.querySelectorAll('.info-card');
    expect(cards.length).toBe(4);
  });

  it('should display Arteixo / Salamanca in location card', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Arteixo / Salamanca');
  });

  it('should update language when toggled', () => {
    const el = fixture.nativeElement as HTMLElement;
    const titleBefore = el.querySelector('h2')?.textContent;
    component.i18n.toggle();
    fixture.detectChanges();
    const titleAfter = el.querySelector('h2')?.textContent;
    expect(titleBefore).not.toBe(titleAfter);
  });

  // Interactive terminal tests
  it('should execute "help" command and show output', () => {
    component.handleCommand('help');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('whoami');
    expect(lastOutput.textContent).toContain('help');
  });

  it('should execute "ls" command and list files', () => {
    component.handleCommand('ls');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('skills.sh');
    expect(lastOutput.textContent).toContain('contact.json');
  });

  it('should execute "cat contact.json" and show JSON', () => {
    component.handleCommand('cat contact.json');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('enriqueav1999@gmail.com');
    expect(lastOutput.textContent).toContain('github.com/enriqueav99');
  });

  it('should execute "neofetch" and show system info', () => {
    component.handleCommand('neofetch');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('Kubernetes');
    expect(lastOutput.textContent).toContain('Bash');
  });

  it('should execute "echo hello world" and repeat text', () => {
    component.handleCommand('echo hello world');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('hello world');
  });

  it('should show sudo rejection message', () => {
    component.handleCommand('sudo rm -rf /');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('Nice try');
  });

  it('should show "command not found" for unknown commands', () => {
    component.handleCommand('unknown_cmd');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const outputs = el.querySelectorAll('.output');
    const lastOutput = outputs[outputs.length - 1];
    expect(lastOutput.textContent).toContain('command not found');
    expect(lastOutput.textContent).toContain('unknown_cmd');
  });

  it('should clear terminal history on "clear" command', () => {
    component.handleCommand('clear');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cmds = el.querySelectorAll('.cmd');
    expect(cmds.length).toBe(0);
  });

  it('should ignore empty commands', () => {
    const historyBefore = component.history().length;
    component.handleCommand('   ');
    expect(component.history().length).toBe(historyBefore);
  });
});
