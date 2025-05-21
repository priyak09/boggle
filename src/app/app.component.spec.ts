import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
   beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'boggle' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('boggle');
  });

 it('should call createLetters method', () => {
  spyOn(component, 'createLetters');
    component.ngOnInit();
  expect(component.createLetters).toHaveBeenCalled();
 });

 it('should create a grid with 16 numbers', () => {
  component.createLetters();
  expect(component.letterObjArr.length).toBe(16);
 });

 it('should select a letter on click', () => {
  const letter = {value: 'A', selected: false, id: 0, row: 0, col: 0 };
  component.captureLetter(letter);
  expect(letter.selected).toBeTruthy();
 });

 it('should not select a letter if it is not adjacent', () => {
    const letter = {value: 'A', selected: false, id: 0, row: 0, col: 0 };
   component.prevLetter = null;
   let res = component.checkAdjacent(letter);
    expect(res).toBeTruthy();
    component.prevLetter = {value: 'A', selected: false, id: 0, row: 0, col: 1 }; //same row test
      res = component.checkAdjacent(letter);
expect(res).toBeTruthy();
  component.prevLetter = {value: 'A', selected: false, id: 0, row: 1, col: 0 }; //same column test
      res = component.checkAdjacent(letter);
expect(res).toBeTruthy();
 component.prevLetter = {value: 'A', selected: false, id: 0, row: 1, col: 1 };  //diagonal cell test
      res = component.checkAdjacent(letter);
expect(res).toBeTruthy();
  component.prevLetter = {value: 'A', selected: false, id: 15, row: 3, col: 3 };
  component.captureLetter(letter);
  expect(letter.selected).toBeFalsy();
 });

 it('should generate the word on clicking enter', () => {
  component.word = "the";
  component.wordArr = [];
  component.enterWord();
  expect(component.wordArr.length).toBe(1);
  expect(component.prevLetter).toBeNull();
 });

 it('should compute the total score', () => {
  component.wordArr = ["the", "angle"];
  component.wordList(component.wordArr);
  expect(component.totalScore).toBe(3);
 });

 it('should refresh the grid when starting new game', () => {
    spyOn(component, 'startTimer');
  component.refreshGrid();
  expect(component.startTimer).toHaveBeenCalled();
 });

});
