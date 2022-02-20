import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './http.service';
import { ChangeIdInterceptor } from './changeID.interceptor';
import { changeUrlInterceptor } from './changeURL.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: changeUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ChangeIdInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
