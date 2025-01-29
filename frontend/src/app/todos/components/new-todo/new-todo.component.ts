import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {
  @Input() show: boolean = false;
  @Output() showEvent = new EventEmitter();
  @Output() newTodoEvent = new EventEmitter<string>();
  text: string = '';

  sendNewTodo() {
    this.newTodoEvent.emit(this.text);
    this.text = '';
    this.showEvent.emit();
  }
  sendShow() {
    this.showEvent.emit();
  }
}
