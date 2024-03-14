import { Component } from '@angular/core';
import { ToDoListDetailsComponent } from '../to-do-list-details/to-do-list-details.component';
import { ToDoList } from '../../interfaces/to-do-list';
import { ToDoListService } from '../../services/to-do-list.service';
import { CreateToDoListComponent } from '../create-to-do-list/create-to-do-list.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-to-do-lists',
  standalone: true,
  imports: [
    ToDoListDetailsComponent,
    RouterLink, 
    CreateToDoListComponent, 
    RouterOutlet
  ],
  templateUrl: './all-to-do-lists.component.html',
  styleUrl: './all-to-do-lists.component.scss'
})
export class AllToDoListsComponent {

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
          
          },
          error : (err) => console.log()
        }
      )
   }


   addList()
   {
    
   }

   
}
