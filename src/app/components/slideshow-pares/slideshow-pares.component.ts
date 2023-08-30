import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  constructor( private ctrModalControler: ModalController ) { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
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
