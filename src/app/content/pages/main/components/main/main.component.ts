import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { ComponentBase } from 'src/app/core/components/abstractions/component-base';
import { LoaderService } from 'src/app/core/services/base/loader-service';
import { CurrentGroupService } from 'src/app/core/services/current-group/current-group.service';
import { MediaType, MessagesService, NetworkMessage, NetworkType, SubscriptionsGroupService } from 'src/app/core/services/snc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends ComponentBase implements OnInit, OnDestroy {
  private readonly numberOfMessages = 20;
  private updateMessagesSubject = new Subject<string>();
  private isUpdatingNow: boolean = false;
  private stopReceiveMessages: boolean = false;
  public defaultGroupName: string = null;

  private count: number = 20;
  private offset: number = 0;
  public messages: NetworkMessage[] = [];

  constructor(private currentGroupService: CurrentGroupService, private subscriptionsGroupService: SubscriptionsGroupService, private messagesService: MessagesService, private sanitazer: DomSanitizer, private loaderService: LoaderService) {
    super();
  }

  ngOnInit(): void {
    this.initMessageLoader();
    this.subscriptionsGroupService.getUserDefaultSubscriptionGroup().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result.isUserHasDefaultGroup) {
        this.defaultGroupName = result.groupName;
        this.updateMessages(result.groupName);
        this.currentGroupService.notifyCurrentGroupChanged(result.groupName);
      }
      else
        this.updateMessages();
    });

  }

  public override ngOnDestroy(): void {
    this.updateMessagesSubject.complete();
    super.ngOnDestroy();
  }

  @HostListener('window:scroll', ['$event.target'])
  public onScroll(e: any) {
    let centerOfScrolling = e.scrollingElement.scrollHeight / 1.5;

    if (centerOfScrolling <= e.scrollingElement.scrollTop && !this.isUpdatingNow) {
      this.loaderService.hideRequest();
      this.updateMessages();
    }
  }

  private updateMessages(groupName: string = null) {
    this.updateMessagesSubject.next(groupName);
  }

  private initMessageLoader() {
    this.updateMessagesSubject.asObservable().pipe(takeUntil(this.unsubscribe), switchMap((groupName) => {
      this.isUpdatingNow = true;

      if (this.stopReceiveMessages) {
        return EMPTY;
      }

      return this.messagesService.getFiltered(
        this.count,
        this.offset,
        groupName
      ).pipe(takeUntil(this.unsubscribe), catchError((err) => {
        this.isUpdatingNow = false;
        throw err;
      }));

    })).subscribe({
      next: (data) => {
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

        if (newMessages.length === 0) {
          this.stopReceiveMessages = true;
        }

        this.messages = [...this.messages, ...newMessages];

        this.isUpdatingNow = false;
        this.offset = this.count;
        this.count += this.numberOfMessages;
      }
    });
  }

  public groupSelected(groupName: string = null) {
    this.count = this.numberOfMessages;
    this.offset = 0;

    this.messages = [];
    this.stopReceiveMessages = false;

    this.updateMessages(groupName);
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
