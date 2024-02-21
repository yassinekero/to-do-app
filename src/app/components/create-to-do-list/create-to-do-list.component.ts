import { Component, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToDoList } from '../../interfaces/to-do-list';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-create-to-do-list',
  standalone: true,
  imports: 
  [
    ReactiveFormsModule
  ],
  templateUrl: './create-to-do-list.component.html',
  styleUrl: './create-to-do-list.component.scss'
})
export class CreateToDoListComponent
 

{

 task: Task[];
 ToDoListForm = new FormGroup(
  {
    title : new FormControl(''),
    description : new FormControl(''),

    
  }
 ); 

constructor()
{

}

  clickAddTask() : void
  {
   let newTask : Task = 
   {
    title : '',
    description : undefined,
    startTime : undefined,
    endTime : undefined,
    completed : false,
    tag : undefined
   }

   this.task.push(newTask);
  }



}
