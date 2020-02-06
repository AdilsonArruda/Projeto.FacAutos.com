import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {componentPhotos} from './componentPhotos/componentPhotos';


@NgModule({
  imports:[ 
    BrowserModule,
  
  ],

  exports: [ componentPhotos],
  
  declarations: [componentPhotos], 


 
})
export class PhotosModule { }
