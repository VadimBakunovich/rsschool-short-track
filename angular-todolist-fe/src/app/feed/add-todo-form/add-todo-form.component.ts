import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {

  form!: FormGroup;

  @Output() onAdd = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.form = new FormGroup({
      todoTitle: new FormControl('', [
        Validators.required,
        Validators.pattern(/\S/)
      ])
    });
  }

  addTodo() {
    this.onAdd.emit(this.form);
  }
}
