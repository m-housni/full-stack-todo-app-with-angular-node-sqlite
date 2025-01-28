import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {
  @Input() id: string = '';
  @Input() todoText: string = '';
  @Output() editTodoEvent = new EventEmitter<string>();
  @Input() close: boolean = false;
  @Output() closeEvent = new EventEmitter();
  text: string = '';

  sendEditTodo() {
    this.editTodoEvent.emit(this.text);
    this.text = '';
  }

  sendClose() {
    this.closeEvent.emit();
  }
}
