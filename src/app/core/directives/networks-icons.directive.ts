import { Directive, ElementRef, Renderer2, Input, AfterViewInit } from "@angular/core";
import { NetworkType } from "../services/snc";



@Directive({ selector: "i[networsItems]" })
export class NetworkIconsDirective implements AfterViewInit {
  @Input()
  public networkType: NetworkType;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }
  ngAfterViewInit(): void {
    this.addClassesForComponent();
  }

  private addClassesForComponent() {
    let classes = ["fab"];

    if (this.networkType == NetworkType.Telegram) {
      classes.push("fa-telegram", "telegram-icon");
    }

    if (this.networkType == NetworkType.VK) {
      classes.push("fa-vk", "vk-icon");
    }

    if (this.networkType == NetworkType.Twitter) {
      classes.push("fa-twitter", "twitter-icon");
    }

    classes.forEach(element => {
      debugger
      this.renderer.addClass(this.el.nativeElement, element);
    });
  }
}
