import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { interval, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'boggle';
  letterObjArr: {
    value: string;
    selected: boolean;
    id: number;
    row: number;
    col: number;
  }[] = [];
  word = '';
  wordArr: string[] = [];
  totalScore = 0;
  prevLetter: any = null;
  gameEnded = false;
  public timeLeft$;
  private stopTimer$ = new Subject<void>();
  multiPlayer = false;
  wordArr1: string[] = [];
  wordArr2: string[] = [];
  switchPlayer = true;
  activePlayer = 0;
  scores = new Map();

  constructor() {
    let endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 3); //for 3 minutes timer
    endDate.setSeconds(endDate.getSeconds() + 2); //to compensate for delay in loading the page
    console.log(endDate);
    this.timeLeft$ = interval(1000).pipe(
      map((x) => this.calcDateDiff(endDate)),
      takeUntil(this.stopTimer$)
    );
  }

  ngOnInit(): void {
    this.createLetters();
  }

  startTimer() {
    let endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 3); //for 3 minutes timer
    endDate.setSeconds(endDate.getSeconds() + 2); //to compensate for delay in loading the page
    this.timeLeft$ = interval(1000).pipe(
      map((x) => this.calcDateDiff(endDate)),
      takeUntil(this.stopTimer$)
    );
  }

  createLetters() {
    for (let i = 0; i < 16; i++) {
      //for 16 dice values
      let ascii = Math.floor(Math.random() * 25) + 65; //65-90 ASCII values of A-Z, code referred from https://coreui.io/blog/how-to-generate-a-random-number-in-javascript/
      let alpha = String.fromCharCode(ascii);
      let col = i % 4;
      let row = Math.floor(i / 4);
      this.letterObjArr.push({
        value: alpha,
        selected: false,
        id: i,
        row: row,
        col: col,
      }); //row and col to check adjacent
    }
  }

  captureLetter(letter: any) {
    if (!this.gameEnded) {
      if (
        this.prevLetter === null ||
        (this.prevLetter?.id !== letter.id && this.checkAdjacent(letter))
      ) {
        this.word = this.word + letter.value;
        letter.selected = true;
        this.prevLetter = JSON.parse(JSON.stringify(letter)); //copy object immutably
      } else {
        window.alert('Invalid letter!');
      }
    }
  }

  checkAdjacent(letter: any) {
    if (!this.prevLetter) {
      return true; //returns true if its the first letter of the word
    }
    if (
      letter.row === this.prevLetter.row &&
      Math.abs(letter.col - this.prevLetter.col) === 1
    ) {
      //same row cells condition
      return true;
    } else if (
      letter.col === this.prevLetter.col &&
      Math.abs(letter.row - this.prevLetter.row) === 1
    ) {
      //same column cells condition
      return true;
    } else if (
      Math.abs(letter.row - this.prevLetter.row) === 1 &&
      Math.abs(letter.col - this.prevLetter.col) === 1
    ) {
      //diagonal cells condition
      return true;
    } else {
      return false;
    }
  }

  enterWord() {
    if (!this.gameEnded) {
      if (this.word.length > 2) {
        if (!this.multiPlayer) {
          this.wordArr.push(this.word);
        } else if (this.multiPlayer && this.activePlayer === 1) {
          this.wordArr1.push(this.word);
        } else if (this.multiPlayer && this.activePlayer === 2) {
          this.wordArr2.push(this.word);
        }
      } else {
        window.alert('Minimum 3 characters required');
      }
      this.word = '';
      this.prevLetter = null;
      this.letterObjArr.forEach((obj) => {
        obj.selected = false;
      });
    }
  }

  checkScore() {
    if (this.multiPlayer) {
      let multiPlayerList = [
        { player1: this.wordArr1 },
        { player2: this.wordArr2 },
      ];
      this.multiPlayerScore(multiPlayerList);
    } else {
      this.wordList(this.wordArr);
    }
  }

  //Word list score function
  wordList(wordArr: any) {
    let score = 0;
    wordArr.forEach((word: string) => {
      if (word.length >= 3) {
        switch (word.length) {
          case 3:
            score = score + 1;
            break;
          case 4:
            score = score + 1;
            break;
          case 5:
            score = score + 2;
            break;
          case 6:
            score = score + 3;
            break;
          case 7:
            score = score + 5;
            break;
          default:
            score = score + 11;
        }
      }
    });
    if (this.multiPlayer) {
      return score;
    } else {
      this.totalScore = score;
      return null;
    }
  }

  //code adapted from https://henrikmassow.medium.com/implement-a-countdown-timer-with-rxjs-in-angular-61600d1af00c
  calcDateDiff(endDay: any) {
    const dDay = endDay.valueOf();

    const milliSecondsInASecond = 1000;
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;

    const timeDifference = dDay - Date.now();

    const minutesToDday = Math.floor(
      (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        secondsInAMinute
    );

    const secondsToDday =
      Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;
    if (secondsToDday === -1 && minutesToDday === -1) {
      //-1 so that it doesn't stop in the last 1 second
      window.alert('Game over!');
      this.stopTimer$.next();
      this.stopTimer$.complete();
      this.checkScore();
      this.word = '';
      this.prevLetter = null;
      this.letterObjArr.forEach((obj) => {
        obj.selected = false;
      });
      this.gameEnded = true;
    }
    return { secondsToDday, minutesToDday };
  }

  refreshGrid() {
    this.gameEnded = false;
    this.word = '';
    this.prevLetter = null;
    this.letterObjArr = [];
    this.wordArr = [];
    this.wordArr1 = [];
    this.wordArr2 = [];
    this.totalScore = 0;
    this.createLetters();
    this.startTimer();
  }

  enableMultiPlayer() {
    this.multiPlayer = true;
    this.refreshGrid();
  }

  enableSinglePlayer() {
    this.multiPlayer = false;
    this.refreshGrid();
  }

  switchActivePlayer(player: number) {
    this.activePlayer = player;
  }

  multiPlayerScore(wordLists: any) {
    let wordSet = new Set();
    let dupWords = new Set();
    let playerArr = ['player1', 'player2'];
    let i = 0;
    wordLists.forEach((item: any) => {
      //find duplicates adapted from https://www.geeksforgeeks.org/javascript-program-to-find-duplicate-elements-in-an-array/
      item[playerArr[i]].forEach((word: any) => {
        if (wordSet.has(word)) {
          dupWords.add(word);
        } else {
          wordSet.add(word);
        }
      });
      i++;
    });
    i = 0;
    wordLists.forEach((item: any) => {
      let wordArr: any = [];

      item[playerArr[i]].forEach((word: any) => {
        if (!dupWords.has(word)) {
          wordArr.push(word);
        }
      });
      let totalScore = this.wordList(wordArr);
      this.scores.set(playerArr[i], totalScore);
      i++;
    });
  }
}
