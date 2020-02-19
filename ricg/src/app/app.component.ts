import { Component, OnInit, ViewChild } from '@angular/core';
import { ItaEngCurse } from './interfaces/ita-eng-curse.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: string;
  theStructure: ItaEngCurse[] = [];

  constructor(public http: HttpClient) {}
  ngOnInit() {
    const options = {responseType: 'text' as 'json' };
    this.http.get<string>('assets/data.txt', options)
      .subscribe(
          data => {
              this.data = data;
              console.log(data);
              this.createStructure(data);
              console.log(this.theStructure);
          },
          error => {
              console.log(error);
          }
      );
  }
  createStructure(data: string) {
    const lines = data.match(/[^\r\n]+/g);
    lines.forEach(line => {
      this.theStructure.push({
        italian: line.split(',')[0],
        english: line.split(',')[1]
      });
    });
  }
}
