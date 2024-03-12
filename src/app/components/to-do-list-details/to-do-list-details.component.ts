import { Component, Input } from '@angular/core';
import { ToDoList } from '../../interfaces/to-do-list';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports:
    [

    ],
  templateUrl: './to-do-list-details.component.html',
  styleUrl: './to-do-list-details.component.scss'
})
export class ToDoListDetailsComponent {

  @Input() toDoList !: ToDoList;
  tasks: Task[] = [];
  constructor(private taskService: TaskService) 
  {

  }

  ngOnInit() {
  
   
    this.tasks = this.toDoList.tasks;
  }


}
