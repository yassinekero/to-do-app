import { Component } from '@angular/core';
import { ToDoList } from '../../interfaces/to-do-list';
import { ToDoListService } from '../../services/to-do-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent 

{

  public ToDoList !: ToDoList | undefined;


  constructor(private ToDoListService : ToDoListService, private route : ActivatedRoute)
  {
    
  }


  ngOnInit () : void 
  {
    const id = Number(this.route.snapshot.params["id"]);
    this.getToDoList(id);
  }


  getToDoList(id : number) : void
  {
    this.ToDoListService.getToDoList(id).subscribe(
      {
        next : (res) =>
        {
          this.ToDoList = res;
        },
        error : (err) => 
        {
          console.log(err);
        }
      }
    )
  }

}
