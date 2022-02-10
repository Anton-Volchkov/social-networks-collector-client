import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs';
import { ComponentBase } from 'src/app/core/components/abstractions/component-base';
import { MediaType, MessagesService, NetworkMessage, NetworkType } from 'src/app/core/services/snc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends ComponentBase implements OnInit {
  private readonly numberOfMessages = 20;

  private isUpdatingNow = false;
  private stopReceiveMessage = false;

  private count: number = 20;
  private offset: number = 0;
  public messages: NetworkMessage[] = [];
  private currentGroupName: string = "";

  constructor(private messagesService: MessagesService, private sanitazer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.updateMessages();
  }

  @HostListener('window:scroll', ['$event.target'])
  public onScroll(e: any) {
    let centerOfScrolling = e.scrollingElement.scrollHeight / 1.3;

    if (centerOfScrolling <= e.scrollingElement.scrollTop) {
      this.updateMessages();
    }
  }

  private updateMessages(groupName: string = "") {
    if (!this.isUpdatingNow && !this.stopReceiveMessage) {
      this.isUpdatingNow = true;

      this.messagesService.getFiltered(
        this.count,
        this.offset,
        groupName
      ).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: data => {
          let newMessages = data.filter(x => !this.messages.some(nm => nm.originalContentLink == x.originalContentLink));

          newMessages.forEach(x => {

            x.networkMedia?.forEach(media => {
              if (x.networkType == NetworkType.VK) {
                if (media.mediaType == MediaType.Video)
                  media.contentUrl = this.buildSafeUrlForIframe(media.contentUrl);
              }

              if (x.networkType == NetworkType.Telegram) {
                media.contentUrl = this.buildContentLink(media.contentUrl);
              }
            });
          });

          this.messages = [...this.messages, ...newMessages];

          if (newMessages.length == 0) {
            this.stopReceiveMessage = true;
          }

        },
        error: () => {
          this.isUpdatingNow = false;
        },
        complete: () => {
          this.offset = this.count;
          this.count += this.numberOfMessages;
          this.isUpdatingNow = false;
        }
      });
    }

  }

  public groupSelected(groupName: string) {
    if (groupName != this.currentGroupName) {
      this.currentGroupName = groupName;
      this.messages = [];
      this.updateMessages(groupName);
    }
  }

  private buildContentLink(originalLink: any): string {

    if (!originalLink) {
      return "";
    }

    if (originalLink.includes("api/messages/")) {
      let token = localStorage.getItem("access_token");

      return `${originalLink}&access_token=${token}`;
    }
    return originalLink;
  }

  private buildSafeUrlForIframe(originalLink: any): any {

    return this.sanitazer.bypassSecurityTrustResourceUrl(originalLink);
  }
}
