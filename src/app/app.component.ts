import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'boggle';
  letterObjArr: {value: string, selected: boolean, id: number, row: number, col: number}[] = [];
  word="";
  wordArr: string[] = [];
  totalScore = 0;
  prevLetter: any = null;


  ngOnInit(): void {
      this.createLetters();
  }

  createLetters() {
  for (let i=0; i<16; i++) { //for 16 dice values
    let  ascii = Math.floor(Math.random() * 25) + 65;  //65-90 ASCII values of A-Z, code referred from https://coreui.io/blog/how-to-generate-a-random-number-in-javascript/
    let alpha = String.fromCharCode(ascii);
    let col = i%4;
    let row = Math.floor(i/4);
    console.log(alpha);
    // this.letterArr.push({alpha: 0});
    this.letterObjArr.push({value: alpha, selected: false, id: i, row: row, col: col}); //row and col to check adjacent
  }
  
}

captureLetter(letter: any) {
  if (this.prevLetter === null || (this.prevLetter?.id !== letter.id && this.checkAdjacent(letter))) {
    this.word=this.word+letter.value;
    letter.selected = true;
    this.prevLetter = JSON.parse(JSON.stringify(letter)); //immutably copy object
  } else {
    window.alert("Invalid letter!");
  }

}

checkAdjacent(letter: any) {
  if (!this.prevLetter) {
    return true;  //returns true if its the first letter of the word
  } 
  if ((letter.row === this.prevLetter.row) && (Math.abs(letter.col - this.prevLetter.col) === 1)) { //same row cells condition
    return true;
  } else if ((letter.col === this.prevLetter.col) && (Math.abs(letter.row - this.prevLetter.row) === 1)) {  //same column cells condition
    return true;
  } else if ((Math.abs(letter.row - this.prevLetter.row) === 1) && (Math.abs(letter.col - this.prevLetter.col) === 1)) {  //diagonal cells condition
    return true;
  } else {
    return false;
  }


}

enterWord() {
  if (this.word.length > 2) {
    this.wordArr.push(this.word);
  } else {
    window.alert("Minimum 3 characters required");
  }
  this.word="";
  this.prevLetter = null;
  this.letterObjArr.forEach(obj => {
    obj.selected = false;
  })
}

//Word list score function
wordList() {
let score = 0;
this.wordArr.forEach((word: string) => {
    if (word.length >= 3) {
        switch (word.length) {
            case 3: score = score+1;
            break;
            case 4: score = score+1;
            break;
            case 5: score = score+2;
            break;
            case 6: score = score+3;
            break;
            case 7: score = score+5;
            break;
            default: score = score+11;
        }
    }
});
this.totalScore = score;
}


}



