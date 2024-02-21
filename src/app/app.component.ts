import { Component } from '@angular/core';
import { CommonModule, WeekDay } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToDoList } from './interfaces/to-do-list';
import { ToDoListService } from './services/to-do-list.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [
    CommonModule,
     RouterOutlet,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  public toDoLists !:  ToDoList[];
  constructor(private ToDoListService : ToDoListService)
  {
  
  }
  ngOnInit() : void 
  {
    this.getAllToDoLists();
  }
   getAllToDoLists() : void
   {
      this.ToDoListService.getAllTodoLists().subscribe(
        {
          next : (res) => 
          {
            this.toDoLists = res;
            console.log(res);
          },
          error : (err) => console.log(err)
        }
      )
   }
}
