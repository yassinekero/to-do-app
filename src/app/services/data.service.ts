import { Injectable } from '@angular/core';
import { ToDoList } from '../interfaces/to-do-list';
import { HttpClient } from '@angular/common/http';
import { ToDoListService } from './to-do-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  allToDoLists : ToDoList[]
  constructor(private ToDoListService : ToDoListService) 
  {
    ToDoListService.getAllTodoLists().subscribe(
      {
        next : (res) => 
        {
          this.allToDoLists = res;
        }
      }
    );
   } 

  
}
