import { Component, OnInit, ViewChild } from '@angular/core';
import { ItaEngCurse } from './interfaces/ita-eng-curse.interface';
import { HttpClient } from '@angular/common/http';

import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from '@kamiazya/ngx-speech-synthesis';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SpeechSynthesisUtteranceFactoryService]
})
export class AppComponent implements OnInit {
  data: string;
  theStructure: ItaEngCurse[] = [];
  randomInd = 0;
  randomElement: ItaEngCurse = {italian: '', english: ''};
  isLoading = true;
  constructor(
    public http: HttpClient,
    public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService) { }

  ngOnInit() {
    const options = { responseType: 'text' as 'json' };
    this.http.get<string>('assets/curse_list.csv', options)
      .subscribe(
        data => {
          this.data = data;
          this.createStructure(data);
          this.updateElement();
          this.isLoading = false;
        },
        error => {
          console.log(error);
        }
      );
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * 120) + 0;
  }
  createStructure(data: string) {
    const lines = data.match(/[^\r\n]+/g);
    lines.forEach(line => {
      const parts = line.split('|');
      this.theStructure.push({
        italian: parts[0],
        english: parts[1]
      });
    });
  }
  updateElement(): void {
    this.randomInd = this.getRandomNumber();
    this.randomElement = this.theStructure[this.randomInd];
    this.say(this.randomElement.italian);
  }
  say(stuff: string): void {
    const v = this.f.text(stuff);
    this.svc.speak(this.f.text(stuff));
  }
}
