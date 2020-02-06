import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { componentPhotos } from './componentPhotos';


@NgModule({
  declarations: [componentPhotos], 
  imports:[ BrowserModule],
  exports: [ componentPhotos],

})
export class PhotosModule { }
