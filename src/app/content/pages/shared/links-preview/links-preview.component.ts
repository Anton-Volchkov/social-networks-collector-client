import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ComponentBase } from "../../../../core/components/abstractions/component-base";


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
  public links: string[] = [];

  public previews: LinkPreview[] = []

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

}
