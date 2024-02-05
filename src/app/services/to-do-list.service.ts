import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../interfaces/to-do-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {


  private  url = "http://localhost:3000/to-do-lists";
  constructor(private http : HttpClient) { }


  getAllTodoLists() : Observable<ToDoList[]>
  {
    return this.http.get<ToDoList[]>(this.url);
  }

  getToDoList(id : number) : Observable<ToDoList | undefined> 
  {
    return this.http.get<ToDoList>(`${this.url}/${id}`);
  }
}
