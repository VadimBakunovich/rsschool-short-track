import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { ToUpperCasePipe } from './pipes/to-upper-case.pipe';
import { StyleDirective } from './directives/style.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TodoComponent,
    StyleDirective,
    ToUpperCasePipe,
    AddTodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    TodoComponent,
    AddTodoFormComponent
  ]
})
export class SharedModule {}
