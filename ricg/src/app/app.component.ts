import { Component, OnInit, ViewChild } from '@angular/core';
import { ItaEngCurse } from './interfaces/ita-eng-curse.interface';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Text2speechService } from 'speech-synthesis-text-to-speech';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent implements OnInit {
  data!: string;
  theStructure: ItaEngCurse[] = [];
  randomInd = 0;
  randomElement: ItaEngCurse = { italian: '', english: '' };

  isLoading = true;
  constructor(
    public http: HttpClient,
    private readonly tts: Text2speechService
  ) {}

  ngOnInit() {
    const options = { responseType: 'text' as 'json' };
    this.http
      .get<string>('assets/curse_list.csv', options)
      .pipe(take(1))
      .subscribe((data) => {
        this.data = data;
        this.createStructure(data);
        this.updateElement();
        this.isLoading = false;
      });
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * 120) + 0;
  }
  createStructure(data: string) {
    const lines = data.match(/[^\r\n]+/g);
    lines?.forEach((line) => {
      const parts = line.split('|');
      this.theStructure.push({
        italian: parts[0],
        english: parts[1],
      });
    });
  }
  updateElement(): void {
    this.randomInd = this.getRandomNumber();
    this.randomElement = this.theStructure[this.randomInd];
    this.say(this.randomElement.italian);
  }
  say(stuff: string): void {
    const voices = window.speechSynthesis.getVoices();
    this.tts.StartSynthesis(stuff, {
      voiceObj: voices[0],
      lang: 'ita',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    });
  }
}
