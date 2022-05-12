import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor() {}
  public todo: string = '';
  public allTodo: any = [];
  public uncompletedTodo: any;
  public completedTodo: any;
  public editMode: boolean = false;
  public editIndex: any = null;

  ngOnInit(): void {
    localStorage['allTodo']
      ? (this.allTodo = JSON.parse(localStorage['allTodo']))
      : (this.allTodo = []);
    this.uncompletedTodo = this.allTodo.filter((val: any) => !val.completed);
    this.completedTodo = this.allTodo.filter((val: any) => val.completed);
  }

  saveToStorage() {
    this.uncompletedTodo = this.allTodo.filter((val: any) => !val.completed);
    this.completedTodo = this.allTodo.filter((val: any) => val.completed);
    localStorage['allTodo'] = JSON.stringify(this.allTodo);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allTodo, event.previousIndex, event.currentIndex);
    this.saveToStorage();
  }

  handleTodo() {
    let todoObj: any = {};
    todoObj.name = this.todo;
    todoObj.completed = false;
    this.allTodo.push(todoObj);
    this.todo = '';
    this.saveToStorage();
  }

  handleComplete(ind: number) {
    this.allTodo[ind].completed = !this.allTodo[ind].completed;
    this.saveToStorage();
  }

  deleteTodo(ind: number) {
    this.allTodo = this.allTodo.filter((_: any, i: number) => i !== ind);
    this.saveToStorage();
  }

  handleEdit(ind: number) {
    this.editMode = true;
    this.editIndex = ind;
    this.todo = this.allTodo[ind].name;
  }

  handleSaveEdit() {
    this.allTodo[this.editIndex].name = this.todo;
    this.editMode = false;
    this.editIndex = null;
    this.todo = '';
    this.saveToStorage();
  }
}
