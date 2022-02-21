import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FeedService } from './feed.service';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [
    TodoListComponent,
    AddTodoFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [FeedService],
  exports: [TodoListComponent]
})
export class FeedModule {}
