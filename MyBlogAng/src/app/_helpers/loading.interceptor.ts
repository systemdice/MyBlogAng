import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { LoadingService, LoadingOverlayRef } from '../_services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;

    
    Promise.resolve(null).then(() => loadingRef = this.loadingService.open());

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && loadingRef) {
        loadingRef.close();
      }
    }).catch(error => {
      if (loadingRef) {
        loadingRef.close();
      }

      return Observable.throw(error);
    });
  }
}
