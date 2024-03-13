import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { strundef } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private  baseUrl = "http://localhost:3000/tasks";
  constructor(private http : HttpClient) { }


  createTask(task : Task) : Observable<Task>
  {
  return this.http.post<Task>(this.baseUrl, task);
  }
  getTask(id : strundef) : Observable<Task> 
  {
   return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }
  updateTask(id : number | undefined , task : Task) : Observable<Task>
  {
   return this.http.put<Task>(`${this.baseUrl}/${id}`,task)
  }
  deleteTask(id : number | undefined) : Observable<Task>
  {
    return this.http.delete<Task>(`${this.baseUrl}/${id}`);
  }
  getTodayTasks() : Observable<Task[]>
  {
   return this.http.get<Task[]>(`${this.baseUrl}/today`);
  }
  getAllTasks() : Observable<Task[]>
  {
  return this.http.get<Task[]>(`${this.baseUrl}`);
  }
}
