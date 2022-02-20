import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddTodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
