import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  constructor( private ctrModalControler: ModalController ) { }

  ngOnInit() {}

  async verDetaller( id: number ){
    const modal = await this.ctrModalControler.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    }).then( modal => modal.present() );
  }
}
