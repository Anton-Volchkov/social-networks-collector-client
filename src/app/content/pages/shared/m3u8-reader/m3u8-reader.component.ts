import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

declare const Hls: any;

@Component({
  selector: 'app-m3u8-reader',
  templateUrl: './m3u8-reader.component.html',
  styleUrls: ['./m3u8-reader.component.scss']
})
export class M3u8ReaderComponent implements AfterViewInit {

  @Input()
  public src: string;

  @ViewChild("videoElement")
  public videoElement: ElementRef;

  ngAfterViewInit(): void {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.src);
      hls.attachMedia(this.videoElement.nativeElement);
    } else if (this.videoElement.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoElement.nativeElement.src = this.src;
    }
  }

}
