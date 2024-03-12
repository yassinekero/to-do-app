import { Component, Input } from '@angular/core';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { Task } from '../../interfaces/task';
import { ToDoList } from '../../interfaces/to-do-list';
import {  NgClass, NgStyle } from '@angular/common';
@Component({
  selector: 'app-options-dropdown',
  standalone: true,
  imports: 
  [
    PrioritiesComponent,
      NgStyle, NgClass
  ],
  templateUrl: './options-dropdown.component.html',
  styleUrl: './options-dropdown.component.scss'
})
export class OptionsDropdownComponent 
{

  @Input() task : Task
  @Input() allToDoLists : ToDoList[]
  selectedColor = "#D7F8F1";
  

  ngOnInit()
  {
    
  }
  setList(toDoListId : number | undefined)
  {
    this.task.toDoListId = toDoListId
    console.log(this.task.toDoListId == 2)
  }
}
