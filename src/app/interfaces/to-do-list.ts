import { WeekDay } from "@angular/common";
import { Task } from "./task";

export interface ToDoList {
    id?: number,
    title: string,
    tasks: Task[],
    days: number[],
}

