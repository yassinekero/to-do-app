import { CalendarEvent } from "angular-calendar";
import { Task } from "../interfaces/task";


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
          end : new Date(task.startDate)
        }
        events.push(event);
    }
  
   });
}