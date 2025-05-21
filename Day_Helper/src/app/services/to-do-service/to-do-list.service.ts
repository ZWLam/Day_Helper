import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private toDoList : ToDoItem[] = [];
  constructor() { }

  getToDoList() {
    return this.toDoList;
  }

  updateToDoList(item: ToDoItem){
    this.toDoList.push(item)
  }
}

export interface ToDoItem{
  id: number;
  completed: boolean;
  title: string;
}