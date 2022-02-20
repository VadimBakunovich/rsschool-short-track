import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToUpperCasePipe } from './pipes/to-upper-case.pipe';
import { StyleDirective } from './directives/style.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';

@NgModule({
  declarations: [
    StyleDirective,
    ToUpperCasePipe,
    AddTodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
