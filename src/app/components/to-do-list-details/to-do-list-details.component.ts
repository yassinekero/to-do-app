import { Component, Input } from '@angular/core';
import { ToDoList } from '../../interfaces/to-do-list';
import { WeekDay } from '@angular/common';
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: 
  [
    
  ],
  templateUrl: './to-do-list-details.component.html',
  styleUrl: './to-do-list-details.component.scss'
})
export class ToDoListDetailsComponent
{

 @Input() toDoList !: ToDoList;
 public WeekDay= WeekDay;
constructor()
{

}



}
