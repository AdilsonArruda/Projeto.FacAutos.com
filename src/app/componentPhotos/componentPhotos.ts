import { Component } from '@angular/core';

@Component({
  selector: 'Photos',
  templateUrl: './componentPhotos.html',
  styleUrls: [ './componentPhotos.css' ]
})
export class componentPhotos  {
  // TODO Buscar de uma API os menus do sistema
  menus = [{
    titulo: 'Carros',
    imagem: 'https://www.arroyodrivingschool.com/img/carros/mustang%20gris.png'
  },{
    titulo: 'Motos',
    imagem: 'https://pngimage.net/wp-content/uploads/2018/06/moto-png.png'
  }];
}
