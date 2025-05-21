import { Component } from '@angular/core';
import { ToDoListService, ToDoItem } from '../../services/to-do-service/to-do-list.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, ReactiveFormsModule, NgIf ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  newTitle: string | undefined  = "";
  currentToDoList : ToDoItem[] = [];
  constructor(private toDoService: ToDoListService){
    this.currentToDoList = toDoService.getToDoList();
  }

  addNewItem(){
    if(this.newTitle != ""){
      var new_id = this.currentToDoList.length
      var new_item: ToDoItem = {
        id: new_id,
        completed: false,
        title: this.newTitle!,
      }

      this.newTitle = "";

      this.toDoService.updateToDoList(new_item);
    }
  }
}
