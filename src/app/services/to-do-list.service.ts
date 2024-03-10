import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../interfaces/to-do-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {


  private  baseUrl = "http://localhost:3000/to-do-lists";
  constructor(private http : HttpClient) { }


  getAllTodoLists() : Observable<ToDoList[]>
  {
    return this.http.get<ToDoList[]>(this.baseUrl);
  }

  getToDoList(id : number) : Observable<ToDoList | undefined> 
  {
    return this.http.get<ToDoList>(`${this.baseUrl}/${id}`);
  }
   createToDoList(toDoList : ToDoList) : Observable<ToDoList>
   {
   return this.http.post<ToDoList>(this.baseUrl, toDoList);
   }
   updateToDOList(toDoList : ToDoList | undefined) : Observable<ToDoList>
   {
    return this.http.put<ToDoList>(`${this.baseUrl}/${toDoList?.id}`,toDoList)
   }
 
}
