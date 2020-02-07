import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-menu',
  templateUrl: 'photo.component.html',
  host: {
    'class': 'col-12 col-sm-6'
  }
})
export class PhotoComponent {
  @Input() url: string;
}