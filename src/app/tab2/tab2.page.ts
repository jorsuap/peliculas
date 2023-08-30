import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public textoBuscar = '';
  public ideas: string[] = ['Spiderman', 'Superman', 'Avengers', 'La vida es bella']
  public peliculas: Pelicula[] = [];
  public isLoading = false;

  constructor(
    private serviceMovie: MoviesService,
    private ctrModalControler: ModalController  ) {};

  buscar( event: any ) {
    this.textoBuscar = event.detail.value;
    this.searchMovie();
  }

  sugerido( pelicula:string ){
    this.textoBuscar = pelicula;
    this.searchMovie();
  }

  searchMovie(){

    if ( this.textoBuscar.length === 0 ) {
      this.peliculas = [];
      return;
    };

    this.isLoading = true;
    this.serviceMovie.buscarPeliculas( this.textoBuscar ).subscribe( resp => {
      this.isLoading = false;
      this.peliculas = resp.results;
    });
  }

  async verDetalle( id: number ){
    const modal = await this.ctrModalControler.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    }).then( modal => modal.present() );
  }

}
