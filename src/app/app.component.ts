import { Component } from '@angular/core';
import { Router  } from '@angular/router';
import { ToDoList } from './interfaces/to-do-list';
import { ToDoListService } from './services/to-do-list.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  public toDoLists !:  ToDoList[];
  todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd")
  constructor(private ToDoListService : ToDoListService, private router : Router, private datePipe : DatePipe)
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
