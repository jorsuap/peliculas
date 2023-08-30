import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  constructor( private ctrModalControler: ModalController ) { }

  ngOnInit() {
  }

  async verDataller( id: number ){
    const modal = await this.ctrModalControler.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    }).then( modal => modal.present() );
  }

}
