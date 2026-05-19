import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {PhotosModule} from './componentPhotos/Photos.module';
import { QuizModule } from './quiz/quiz.module';
import { AppComponent } from './app.component';

@NgModule({
  imports:[ 
    BrowserModule, 
    FormsModule,
    PhotosModule,
    QuizModule
  ],
  declarations: [ 
   AppComponent
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
