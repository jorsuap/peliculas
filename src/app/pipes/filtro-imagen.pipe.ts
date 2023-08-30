import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform( pelicula:any[]): any[] {

    return pelicula.filter( peli => {
      return peli.backdrop_path;
    });
  }

}
