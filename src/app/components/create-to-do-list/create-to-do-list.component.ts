import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';
import { ToDoList } from '../../interfaces/to-do-list';
import { ToDoListService } from '../../services/to-do-list.service';
import { TaskService } from '../../services/task.service';
import { strundef } from '../../utils/utils';

@Component({
  selector: 'app-create-to-do-list',
  standalone: true,
  imports:
    [
      FormsModule
    ],
  templateUrl: './create-to-do-list.component.html',
  styleUrl: './create-to-do-list.component.scss'
})



export class CreateToDoListComponent {


  tasks: Task[] = [];
  tasksId: strundef[] = [];
  newToDoList: ToDoList =
    {
      title: "",
      tasks: [],
      days: []

    }

  constructor(private toDoListService: ToDoListService, private taskService: TaskService) {

  }

  onSubmit()
  {
    this.toDoListService.createToDoList(this.newToDoList).subscribe(
      {
        next : res => console.log(res),
        error : err=> console.log(err)
      },
   
      
    );
  }

}
