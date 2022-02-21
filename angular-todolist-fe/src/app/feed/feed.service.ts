import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../core/http.service';
import { Todo } from '../shared/models';

@Injectable()
export class FeedService {

  constructor(private httpService: HttpService) {}

  fetchTodos(todos: Todo[]) {
    this.httpService.getData()
      .subscribe({
        next: v => v.forEach(i => todos.push(i)),
        error: e => console.error(e)
      });
  }

  addTodo(form: FormGroup, todos: Todo[]) {
    const { todoTitle } = form.value;
    this.httpService.postData(
      { title: todoTitle, completed: false, id: 201 }
    ).subscribe({
        next: v => {
          todos.push(v);
          form.reset();
        },
        error: e => console.error(e)
      });
  }

  changeCompletion(arg: [Todo, HTMLInputElement]) {
    const [todo, input] = arg;
    const { checked } = input;
    const reqObj = {...todo};
    reqObj.completed = checked;
    input.disabled = true;
    this.httpService.editData(reqObj)
      .subscribe({
        next: v => {
          input.disabled = false;
          todo.completed = v.completed;
        },
        error: e => {
          console.error(e);
          input.disabled = false;
          input.checked = !input.checked;
        }
      });
  }

  editTitle(arg: [Todo, HTMLInputElement]) {
    const [todo, input] = arg;
    const reqObj = {...todo};
    reqObj.title = input.value;
    if (todo.title !== input.value) {
      this.httpService.editData(reqObj)
        .subscribe({
          next: v => {
            todo.title = v.title;
            input.disabled = true;
          },
          error: e => {
            console.error(e);
            input.value = todo.title;
          }
        });
    } else input.disabled = true;
  }

  delTodo(todo: Todo, todos: Todo[]) {
    this.httpService.delData(todo.id)
      .subscribe({
        next: () => {
          const todoIdx = todos.indexOf(todo);
          todos.splice(todoIdx, 1);
        },
        error: e => console.error(e)
      });
  }
}
