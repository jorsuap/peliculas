import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): unknown {

    if ( !img ) return './assets/no-image-banner.jpg';

    const imgUrl = `${ URL }/${ size }${ img }`;
    return imgUrl;
  }

}
