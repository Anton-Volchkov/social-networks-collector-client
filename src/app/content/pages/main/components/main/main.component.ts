import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs';
import { ComponentBase } from 'src/app/core/components/abstractions/component-base';
import { MessagesService, NetworkMessage } from 'src/app/core/services/snc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends ComponentBase implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  private count: number = 20;
  private offset: number = 0;
  public messages: NetworkMessage[] = [];

  constructor(private messagesService: MessagesService, private sanitazer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.messagesService.getFiltered(
      this.count,
      this.offset
    ).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: data => {
        let newMessages = data.filter(x => !this.messages.some(nm => nm.originalContentLink == x.originalContentLink));
        this.messages = [...this.messages, ...newMessages];
      },
      complete: () => {
        this.offset = this.count;
        this.count += 20;
      }
    })
  }

  public buildContentLink(originalLink: string) {

    if (originalLink.includes("api/messages/")) {
      let token = localStorage.getItem("access_token");

      return `${originalLink}&access_token=${token}`;
    }
    return originalLink;
  }


  public buildSafeUrlForIframe(originalLink: string) {
    return this.sanitazer.bypassSecurityTrustResourceUrl(originalLink);
  }


}
