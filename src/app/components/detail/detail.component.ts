import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, MovieDetail, Video } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { TrailerComponent } from '../trailer/trailer.component';
import { RespVideo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {

  @Input() id!: number;
  public movie!: MovieDetail;
  public oculto = 150;
  public actores: Cast[] = [];
  public existe = false;
  public star = 'star-outline';
  public idTrailer = '';

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController,
    private dataLocalService: DataLocalService,
    private ctrModalControler: ModalController  ) { }

  async ngOnInit() {
    this.dataLocalService.movieExist( this.id )
      .then( existe => this.star =  ( existe ) ? 'star' : 'star-outline' );


    this.moviesService.getMovieDetalle( this.id )
    .subscribe( resp => {
      this.movie = resp;
    } );

    this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp => {
      this.actores = resp.cast;
    } );

    this.moviesService.getIdTrailerYoutube( this.id )
      .subscribe( ( resp:any )=> {
        this.idTrailer = resp.results.filter(( video: Video) => video.type === 'Trailer')[0].key;
    });
  }

  regresar(){
    this.modalController.dismiss();
  }

  favorito(){
    const existe = this.dataLocalService.setMovie( this.movie )
    this.star = ( existe ) ? 'star' : 'star-outline';
  }

  async watchTrailer(){

      const modal = await this.ctrModalControler.create({
        component: TrailerComponent,
        componentProps: {
          idTrailer: this.idTrailer
        }
      }).then( modal => modal.present() );


  }

}
