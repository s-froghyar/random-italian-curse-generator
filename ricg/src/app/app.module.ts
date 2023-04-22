import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { Text2speechModule } from "speech-synthesis-text-to-speech";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, Text2speechModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
