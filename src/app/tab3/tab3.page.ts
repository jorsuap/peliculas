import { Component } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Pelicula, MovieDetail } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public peliculas: any[] = [];
  public generos: any[] = [];
  public favoritoGenero: any[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService
    ) {}

  async ionViewWillEnter() {
    await this.dataLocalService.getFavorites()
    .then(
      (peliculas) => {
        this.peliculas = peliculas;
      }
    );
    this.generos = await this.moviesService.cargarGeneros();

    console.log(this.generos);

    this.setMovieByGenre(this.peliculas, this.generos);

  }



  setMovieByGenre( peliculas: MovieDetail[], generos: any[] ){
    this.favoritoGenero = [];
    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres?.find( genre => genre.id === genero.id );
        })
      });
    });
    console.log(this.favoritoGenero);
  }

}
