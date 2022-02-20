import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleDirective } from './directives/style.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';




@NgModule({
  declarations: [
    StyleDirective,
    AddTodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
