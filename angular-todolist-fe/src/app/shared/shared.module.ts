import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TodoComponent } from './todo/todo.component';
import { ToUpperCasePipe } from './pipes/to-upper-case.pipe';
import { StyleDirective } from './directives/style.directive';


@NgModule({
  declarations: [
    TodoComponent,
    StyleDirective,
    ToUpperCasePipe,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [TodoComponent]
})
export class SharedModule {}
