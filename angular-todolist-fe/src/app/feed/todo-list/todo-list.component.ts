import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Todo } from 'src/app/shared/models';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(public feedService: FeedService) {}

  ngOnInit() {
    this.feedService.fetchTodos(this.todos);
  }

  addTask(form: FormGroup) {
    this.feedService.addTodo(form, this.todos);
  }

  completeTask(arg: [Todo, HTMLInputElement]) {
    this.feedService.changeCompletion(arg);
  }

  editTask(arg: [Todo, HTMLInputElement]) {
    this.feedService.editTitle(arg);
  }

  deleteTask(todo: Todo) {
    this.feedService.delTodo(todo, this.todos);
  }
}
