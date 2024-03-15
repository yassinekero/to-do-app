import { Component } from '@angular/core';
import { Router, RouterOutlet  } from '@angular/router';
import { ToDoList } from './interfaces/to-do-list';
import { ToDoListService } from './services/to-do-list.service';
import { DatePipe } from '@angular/common';
import { fader } from './route-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations : 
  [
    fader,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {


  prepareRoute(outlet : RouterOutlet)
  {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"]
  }
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
