import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class ChangeIdInterceptor implements HttpInterceptor {

  private nextID = 201;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        const { body, status } = res as HttpResponse<any>;
        if (status === 201 && body.id === 201) {
          body.id = this.nextID++;
        }
      })
    );
  }
}
