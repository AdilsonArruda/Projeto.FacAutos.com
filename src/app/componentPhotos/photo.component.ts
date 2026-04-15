import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'item-menu',
  templateUrl: 'photo.component.html',
  host: {
    'class': 'col-12 col-sm-6'
  }
})
export class PhotoComponent implements OnChanges {
  @Input() url: string;
  sanitizedUrl: string = '';

  ngOnChanges(): void {
    this.sanitizedUrl = this.isValidImageUrl(this.url) ? this.url : '';
  }

  private isValidImageUrl(url: string): boolean {
    if (!url) {
      return false;
    }
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  }
}
