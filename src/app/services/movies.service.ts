import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Genre, MovieDetail, ResponseMovieDB, RespuestaCredits } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

private popularesPage = 0;
private generos: Genre[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<ResponseMovieDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<ResponseMovieDB>(query);
  }

  getMovieDetalle( id: number ) {
    return this.ejecutarQuery<MovieDetail>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula( id: number ) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  buscarPeliculas( texto: string ) {
    return this.ejecutarQuery<ResponseMovieDB>(`/search/movie?query=${ texto }`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe( ( resp: any ) => {
          this.generos = resp['genres'];
          resolve(this.generos);
        });
    });
  }

  getIdTrailerYoutube( id: number ) {
    return this.ejecutarQuery(`/movie/${ id }/videos?a=1`);
  }
}
