import { DatePipe } from "@angular/common";
import { Task } from "../interfaces/task";

export function DateToString(date : Date) : string
{
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}


export function taskIntializer(task : Task, id : number | undefined, datePipe : DatePipe) : Task
{
  task =
  {
    title: "",
    description: "",
    completed: false,
    toDoListId: id,
    startDate: (String)(datePipe.transform(new Date(), 'yyyy-MM-dd')),
    endDate: (String)(datePipe.transform(new Date(), 'yyyy-MM-dd')),
    startTime : null,
    endTime : null,
    priority: "None"
  }

  return task;
}