import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  SpeechSynthesisModule,
} from '@kamiazya/ngx-speech-synthesis';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SpeechSynthesisModule.forRoot({
      lang: 'ita',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
