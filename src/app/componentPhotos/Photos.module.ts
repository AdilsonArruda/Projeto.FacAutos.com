import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { componentPhotos } from './componentPhotos';
import { PhotoComponent } from './PhotoComponent';


@NgModule({
  declarations: [componentPhotos, PhotoComponent], 
  imports:[ BrowserModule, CommonModule],
  exports: [ componentPhotos],

})
export class PhotosModule { }
