import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {PhotosModule} from './componentPhotos/Photos.modules';
import { AppComponent } from './app.component';

@NgModule({
  imports:[ 
    BrowserModule, 
    FormsModule,
    PhotosModule 
  ],
  declarations: [ 
   
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
