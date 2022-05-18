import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('game result of panel should show correctly', () => {
    const firstSelectedNumbers = new Set<number>().add(2).add(1).add(49).add(25).add(20).add(37);
    component.numberSelectionOfPanels[0] = firstSelectedNumbers;
    const thirdSelectedNumbers = new Set<number>().add(2).add(1).add(49).add(20).add(25).add(37).add(38);
    component.numberSelectionOfPanels[2] = thirdSelectedNumbers;
    const fourthSelectedNumbers = new Set<number>().add(2);
    component.numberSelectionOfPanels[3] = fourthSelectedNumbers;
    fixture.nativeElement.querySelector('#play-button').click();
    fixture.detectChanges();
    const gameResultOfFirstPanel = fixture.nativeElement.querySelector('h2:nth-of-type(1)');
    const gameResultOfSecondPanel = fixture.nativeElement.querySelector('h2:nth-of-type(2)');
    const gameResultOfThirdPanel = fixture.nativeElement.querySelector('h2:nth-of-type(3)');
    const gameResultOfFourthPanel = fixture.nativeElement.querySelector('h2:nth-of-type(4)');
    expect(gameResultOfFirstPanel.innerText).toBe('Panel 1: 1,2,20,25,37,49');
    expect(gameResultOfSecondPanel.innerText).toBe('Panel 2: empty');
    expect(gameResultOfThirdPanel.innerText).toBe('Panel 3: Error: Please remove 1 mark');
    expect(gameResultOfFourthPanel.innerText).toBe('Panel 4: Error: 5 marks are missing');
  });
});
