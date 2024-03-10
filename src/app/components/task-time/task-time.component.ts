import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../interfaces/task';


@Component({
  selector: 'app-task-time',
  standalone: true,
  templateUrl: './task-time.component.html',
  styleUrl: './task-time.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [
  
  ],
})
 
export class TaskTimeComponent {
  

  @Input() task : Task
 
  today : string
  constructor(private datePipe : DatePipe)
  {
     this.today = (String)(datePipe.transform(new Date(), 'yyyy-MM-dd'));
  }
  ngOnInit()
  {

  }
 



}

