import { WeekDay } from "@angular/common";
import { Task } from "./task";

export interface ToDoList {
    id?: number,
    name: string,
    tasks: Task[],
    days: number[],
}

