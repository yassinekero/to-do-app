import { Task } from "../interfaces/task";


export interface ToDoList {
    id?: number,
    title: string ,
    tasks: Task[] ,
    days: number[] ,
}

