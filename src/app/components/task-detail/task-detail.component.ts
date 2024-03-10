import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';
import { ToDoList } from '../../interfaces/to-do-list';
import { ToDoListService } from '../../services/to-do-list.service';
import { PrioritiesComponent } from '../priorities/priorities.component';
@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
   FormsModule,
   PrioritiesComponent
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent 
{
     @Input() task : Task;
     @Output() eventEmitter = new EventEmitter<any>();
     allToDoLists : ToDoList[]
     selectedColor = "#F7FFFE";
  emitEvent(task: Task, eventType: string): void {
    this.eventEmitter.emit({ task, eventType });
  }
  
     constructor(private ToDoListService : ToDoListService)
     {
      ToDoListService.getAllTodoLists().subscribe(
      {
        next : res => this.allToDoLists = res,
        error : err => console.log(err)
      })
     }


     submit()
     {
       this.emitEvent(this.task, "update");
     }
     deleteTask()
     {
      this.emitEvent(this.task, "delete");
     }

}
