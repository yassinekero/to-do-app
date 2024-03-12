import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule,Router  } from '@angular/router';
import { ToDoList } from './interfaces/to-do-list';
import { ToDoListService } from './services/to-do-list.service';
import { MenuComponent } from './components/menu/menu.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [
    CommonModule,
     RouterOutlet,
     RouterModule,
    MenuComponent,
    TaskDetailComponent
  ],
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
