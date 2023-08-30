import { Storage } from '@ionic/storage-angular';
import { Injectable, OnInit } from '@angular/core';
import { MovieDetail } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private movies: MovieDetail[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private toastController: ToastController ) {

    this.init();
    this.getFavorites();
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

  }

  public setMovie( pelicula:MovieDetail ) {
    let existe = false;
    let mensaje = '';
    for ( const peli of this.movies ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    };
    if ( existe ) {
      this.movies = this.movies.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.movies.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }

    this._storage?.set('peliculas', this.movies);
    this.presentToast( mensaje );

    return !existe;
  }

  public async getFavorites() {
    const peliculas = await this._storage?.get('peliculas');
    this.movies = peliculas || [];

    return this.movies;
  }

  public async movieExist( id: number ) {
    await this.getFavorites();
    const existe = this.movies.find( peli => peli.id === id );
    return ( existe ) ? true : false;
  }

}
