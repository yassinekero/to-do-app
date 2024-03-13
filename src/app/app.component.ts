import { Component } from '@angular/core';
import { Router  } from '@angular/router';
import { ToDoList } from './interfaces/to-do-list';
import { ToDoListService } from './services/to-do-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  public toDoLists !:  ToDoList[];
  constructor(private ToDoListService : ToDoListService, private router : Router)
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
          
          },
          error : (err) => console.log(err)
        }
      )
   }
   openToday()
   {
    console.log("de")
    this.router.navigate(["to-do", 3])
   }
}
