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
  letterArr: string[] = [];
  word="";
  wordArr: string[] = [];


  ngOnInit(): void {
      this.createLetters();
  }

  createLetters() {
  for (let i=1; i<17; i++) { //for 16 dice values
    let  ascii = Math.floor(Math.random() * 25) + 65;  //65-90 ASCII values of A-Z, code referred from https://coreui.io/blog/how-to-generate-a-random-number-in-javascript/
    let alpha = String.fromCharCode(ascii);
    console.log(alpha);
    this.letterArr.push(alpha);
  }
  
}

captureLetter(event: any) {
this.word=this.word+event.target.textContent;
}

enterWord() {
  if (this.word.length > 2) {
    this.wordArr.push(this.word);
  }
  this.word="";
}


}



