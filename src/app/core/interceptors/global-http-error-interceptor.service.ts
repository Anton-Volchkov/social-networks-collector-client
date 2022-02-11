import { throwError, Observable, EMPTY, interval } from "rxjs";
import { forwardRef, Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { catchError, filter, finalize, mergeMap, take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MultipleErrorsDialog } from "../../content/dialogs/mupltiple-errors-dialog/multiple-errors-dialog.component";
import { StatusCodes } from "http-status-codes";
import { LoaderService } from "../services/base/loader-service";

interface ErrorMessage {
  title: string;
  message: string;
}

export interface ProblemDetails {
  type: string;
  status: string;
  detail: string;
  instance: string;
}

@Injectable({ providedIn: "root" })
export class GlobalHTTPErrorInterceptorService implements HttpInterceptor {
  private loaderService: LoaderService;
  private requestNumber: number = 0;
  private toastr: ToastrService;
  private translate: TranslateService;

  constructor(private injector: Injector, private modalService: NgbModal) {
    setTimeout(() => {
      this.toastr = this.injector.get(ToastrService);
      this.translate = this.injector.get(TranslateService);
      this.loaderService = this.injector.get(LoaderService);
    });
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    this.requestNumber++;

    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}.`);

          this.handleError(error);
          throw error;
        }),
        finalize(() => {
          this.requestNumber--;

          if (this.requestNumber < 0) {
            this.requestNumber = 0;
          }

          if (this.requestNumber == 0) {
            this.hideLoader();
          }
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (this.isProblemDetails(error.error)) {
      const title = this.getTitleByError(error);
      const problemDetails = error.error as ProblemDetails;
      const details = this.getMessageFromProblemDetails(problemDetails);
      if (details.length === 1) {
        // This error does not need to be output as it is handled in the component itself
        if (details.join() !== "A file with the given name already exists.") {
          this.toastr.error(details.join(), title);
        }
      } else {
        const modalRef = this.modalService.open(MultipleErrorsDialog, {
          backdrop: "static",
          keyboard: false,
        });
        modalRef.componentInstance.data = { title: title, errors: details };
      }
    } else {
      if (error.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error("An error occurred:", error.error.message);
      }

      let errorMessage: ErrorMessage | null;
      if (error.status === StatusCodes.BAD_REQUEST) {
        errorMessage = this.getBadRequestMessage(error);
      } else if (error.status === StatusCodes.NOT_FOUND) {
        errorMessage = this.getNotFoundMessage(error);
      } else if (error.status === StatusCodes.UNAUTHORIZED) {
        // rest of logic is handled by auth.interceptor
        // don't show an error here
        errorMessage = null;
      } else {
        errorMessage = this.getGenericErrorMessage();
      }

      if (errorMessage) {
        this.toastr.error(errorMessage.message, errorMessage.title);
      }
    }
  }

  private getMessageFromProblemDetails(problemDetails: ProblemDetails): string[] {
    let details: string[] = problemDetails.detail.split(";");
    while (this.isJSON(details.join(";"))) {
      const problemDetailsInDetails = JSON.parse(details.join(";")) as ProblemDetails;
      details = problemDetailsInDetails.detail.split(";");
    }
    return details;
  }

  private getTitleByError(response: HttpErrorResponse): string {
    switch (response.error.errors ? response.error.errors.status : response.error.status) {
      case StatusCodes.BAD_REQUEST:
        return this.translate.instant("MESSAGES.BAD_REQUEST");
      case StatusCodes.NOT_FOUND:
        return this.translate.instant("MESSAGES.NOT_FOUND");
      default:
        return this.translate.instant("MESSAGES.ERROR");
    }
  }

  private isProblemDetails(err: any): boolean {
    return err.hasOwnProperty("type") && err.hasOwnProperty("status") && err.hasOwnProperty("detail");
  }

  private isJSON(value: string): boolean {
    try {
      return (JSON.parse(value) && !!value);
    } catch (e) {
      return false;
    }
  }

  private getBadRequestMessage(error: HttpErrorResponse): ErrorMessage {
    const forwardingError = error.error as ProblemDetails;
    if (forwardingError.detail) {
      return {
        title: this.translate.instant("MESSAGES.BAD_REQUEST"),
        message: forwardingError.detail
      };
    } else {
      let errorMessage: string = this.getErrorMessage(error);
      if (!errorMessage) {
        errorMessage = `${this.translate.instant("MESSAGES.INVALID_OR_MISSING_DATA")} ${this.translate.instant("MESSAGES.CORRECT_AND_RETRY")}`;
      }

      return {
        title: this.translate.instant("MESSAGES.BAD_REQUEST"),
        message: errorMessage
      };
    }
  }

  private getNotFoundMessage(error: HttpErrorResponse): ErrorMessage {
    const errorMessage: string = this.getErrorMessage(error);

    return {
      title: this.translate.instant("MESSAGES.NOT_FOUND"),
      message: errorMessage
    };
  }

  private getGenericErrorMessage(): ErrorMessage {
    return {
      title: this.translate.instant("MESSAGES.ERROR"),
      message: this.translate.instant("MESSAGES.GENERIC_QUERY_ERROR") + " " + this.translate.instant("MESSAGES.TRY_AGAIN")
    };
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    let errors: string[];
    if (typeof error.error === "string") {
      errors = [error.error];
      return errors.join();
    } else {
      return this.translate.instant("MESSAGES.GENERIC_QUERY_ERROR") + " " + this.translate.instant("MESSAGES.TRY_AGAIN");
    }
  }

  private showLoader(): void {
    this.loaderService?.show();
  }
  private hideLoader(): void {
    this.loaderService?.hide();
  }
}
