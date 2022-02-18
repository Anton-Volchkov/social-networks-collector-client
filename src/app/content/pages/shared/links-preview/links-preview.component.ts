import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {fromFetch} from "rxjs/fetch";
import {ComponentBase} from "../../../../core/components/abstractions/component-base";
import {takeUntil} from "rxjs";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../../../environments/environment";

export interface LinkPreview {
  description: string;
  image: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-links-preview',
  templateUrl: './links-preview.component.html',
  styleUrls: ['./links-preview.component.scss']
})
export class LinksPreviewComponent extends ComponentBase implements OnInit {

  @Input()
  public links: string[];

  public previews: LinkPreview[] = []

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {

    this.links.forEach(link => {
      const api = `https://api.linkpreview.net/?key=${environment.linkPreviewKey}&q=${link}`;

      this.httpClient.get(api)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe({
          next: (preview: LinkPreview) => {
            if (preview.title) {
              preview.title = preview.url;
            }

            debugger;
            this.previews.push(preview);
          }
        });
    })


  }

}
