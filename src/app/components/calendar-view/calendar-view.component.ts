import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { TasksToCalendarEvents } from '../../utils/utils';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {

  viewDate : Date = new Date();
  view : CalendarView = CalendarView.Month; 
  events: CalendarEvent[] = [];
  tasks : Task[]

  constructor (private taskService : TaskService, private datePipe : DatePipe, private router : Router)
  {
    this.getAllTasks();
  }
 
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd')
    this.router.navigate([`to-do/${formattedDate}`]);

  }


  private getAllTasks()
  {
    this.taskService.getAllTasks().subscribe(
      {
        next : (res) =>
        {
          this.tasks = res
          TasksToCalendarEvents(this.tasks, this.events)
        },
        error : err => console.log(err)
      }
    )
  }




}
