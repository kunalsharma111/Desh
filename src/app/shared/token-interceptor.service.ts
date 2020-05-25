import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { DataTransferService } from './data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private service:DataTransferService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log("Bear "+ this.service.getToken())
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization :`Bearer ${this.service.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
