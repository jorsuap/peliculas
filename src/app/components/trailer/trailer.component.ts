import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent  implements OnInit {

  @Input() idTrailer = '';
  safeUrl: SafeResourceUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
    private so: ScreenOrientation
    ) { }

  ngOnInit() {
    console.log(this.idTrailer);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${ this.idTrailer }?autoplay=1`);
    this.lockToLandscape()

  }

  lockToLandscape(){
    this.so.lock(this.so.ORIENTATIONS.LANDSCAPE);
  }

  unlockScreenOrientation(){
    this.so.unlock();
  }

  ngOnDestroy(): void {
    this.unlockScreenOrientation();
  }

}
