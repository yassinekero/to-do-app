import { CalendarEvent } from "angular-calendar";
import { Task } from "../interfaces/task";
import { tick } from "@angular/core/testing";


export type strundef = string | undefined;

export function TasksToCalendarEvents(task : Task[], events : CalendarEvent[])
{
   task.forEach(task => {
    if(task.startDate)
    {
        const event = 
        {
          title :task.title,
          start : new Date(task.startDate),
          end : new Date(task.startDate),
          startTime : task.startTime,
          priority : task.priority
        }
        events.push(event);
    }
  
   });
}

export function isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }