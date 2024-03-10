import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-priorities',
  standalone: true,
  imports: [
    NgClass, NgStyle
  ],
  templateUrl: './priorities.component.html',
  styleUrl: './priorities.component.scss'
})
export class PrioritiesComponent {


  @Input() task : Task;
  @Input() selectedColor : string
  priorities = ["None", "Low", "Medium", "High", "Urgent"]
  selected = {
    'background-color' :  "#ddf5f0"
  };


  constructor()
  {
    if (this.selectedColor) {
      this.selected = {
        'background-color' :  this.selectedColor
      };
    }
  }
 
  setPriority(priority: string) {
    this.task.priority = priority;
   

  }
}
