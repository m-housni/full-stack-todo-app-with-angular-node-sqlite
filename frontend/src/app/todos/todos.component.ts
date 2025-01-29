import { Component, NgModule } from '@angular/core';
import { Todo } from '../../models/Todo';
import { CommonModule } from '@angular/common';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  imports: [CommonModule, NewTodoComponent, EditTodoComponent],
})
export class TodosComponent {

  constructor(private router: Router, private authService: AuthService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  showAddNewTodoForm: boolean = true;
  showEditTodoForm: boolean = true;
  id!: string;
  todoText!: string;

  receiveClose() {
    this.showEditTodoForm = true;
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  editTodo(id: string) {
    this.id = id;
    this.todoText = this.todos.filter((todo) => todo.id === id)[0].text;
    this.showEditTodoForm = false;
  }
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }
  clearAll() {
    this.todos = [];
  }
  toggleCompleted(id: string) {
    this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  }
  receivedText: string = '';
  receiveText(text: string, id: string = '') {
    this.receivedText = text;
    if (!id)
      this.todos.push({
        id: uuidv4(),
        text: text,
        completed: false,
      });
    else
      this.todos.map((todo) => {
        if (todo.id === id) {
          todo.text = text;
        }
      });
    this.showEditTodoForm = true;
  }

  receiveShow() {
    this.showAddNewTodoForm = true;
  }
  addNewTodo() {
    this.showAddNewTodoForm = false;
  }
  todos: Todo[] = [
    {
      id: uuidv4(),
      text: 'Todo One',
      completed: false,
    },
    {
      id: uuidv4(),
      text: 'Todo Two',
      completed: true,
    },
    {
      id: uuidv4(),
      text: 'Todo Three',
      completed: false,
    },
  ];
}
