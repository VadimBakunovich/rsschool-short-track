import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from './core/http.service';
import { Todo } from './shared/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  todos: Todo[] = [];

  constructor(private httpService: HttpService) {
    this.httpService.getData()
      .subscribe({
        next: v => this.todos = v,
        error: e => console.error(e)
      });
  }

  addTodo(form: FormGroup) {
    const { todoTitle } = form.value;
    this.httpService.postData(
      { title: todoTitle, completed: false, id: 201 }
    ).subscribe({
        next: v => {
          this.todos.push(v);
          form.reset();
        },
        error: e => console.error(e)
      });
  }

  changeCompletion(arg: [Todo, HTMLInputElement]) {
    const [todo, input] = arg;
    const { checked } = input;
    input.disabled = true;
      this.httpService.editData(todo)
        .subscribe({
          next: () => {
            input.disabled = false;
            todo.completed = checked;
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
    const prevTitle = todo.title;
    if (todo.title !== input.value) {
      todo.title = input.value;
      this.httpService.editData(todo)
        .subscribe({
          next: () => input.disabled = true,
          error: e => {
            console.error(e);
            input.value = prevTitle;
            todo.title = prevTitle;
          }
        });
    } else input.disabled = true;
  }

  delTodo(id: number) {
    this.httpService.delData(id)
      .subscribe({
        next: () => this.todos = this.todos.filter(i => i.id !== id),
        error: e => console.error(e)
      });
  }
}
