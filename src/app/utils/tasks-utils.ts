import { DatePipe } from "@angular/common";
import { Task } from "../interfaces/task";

export function DateToString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}


export function taskIntializer(task: Task, id: number | undefined, startdate: string | undefined, datePipe: DatePipe): Task {
  task =
  {
    title: "",
    description: "",
    completed: false,
    toDoListId: id,
    startDate: startdate,
    endDate: startdate,
    startTime: null,
    endTime: null,
    priority: "None"
  }

  return task;
}

export function  orderTasks(tasks : Task[])
{
  tasks.sort((a, b) => {
    if (a.completed && !b.completed) {
        return 1;
    } else if (!a.completed && b.completed) {
        return -1; 
    } else {
        return 0; 
    }
});
return tasks;
}