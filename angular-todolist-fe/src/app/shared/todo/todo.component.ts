import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models';
import { fadeAnimation } from './animations';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [fadeAnimation]
})
export class TodoComponent {

  @Input() todo!: Todo;

  @Output() onEdit = new EventEmitter<[Todo, HTMLInputElement]>();

  @Output() onDelete = new EventEmitter<number>();

  @Output() onComplete = new EventEmitter<[Todo, HTMLInputElement]>();

}
