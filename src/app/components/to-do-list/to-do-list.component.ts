import { Component, HostListener } from '@angular/core';
import { ToDoList } from '../../interfaces/to-do-list';
import { ToDoListService } from '../../services/to-do-list.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { TaskTimeComponent } from '../task-time/task-time.component';
import { timeFormatConverter } from '../../utils/utils';
import { taskIntializer } from '../../utils/tasks-utils';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { CustomDatePipe } from '../../../pipes/custom-date.pipe';
@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports:
    [
      TaskDetailComponent,
      TaskTimeComponent,
      FormsModule,
      NgClass,
      PrioritiesComponent,
      CustomDatePipe

    ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

  ToDoList: ToDoList | undefined =
    {
      title: "",
      tasks: [],
      days: [0]

    }
  newTask: Task;
  timeFormatConverter = timeFormatConverter
  displayStyle = "none";
  displayTimePickerStyle = "none";
  priorities = ["None", "Low", "Medium", "High", "Urgent"]
  selectedColor ="#D7F8F1"
  selectedTask: Task

  constructor(private ToDoListService: ToDoListService, private taskService: TaskService, private route: ActivatedRoute, private datePipe: DatePipe) {

  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.params["id"]);
    this.getToDoList(id);
    this.newTask = taskIntializer(this.newTask, id, this.datePipe)

  }


  getToDoList(id: number): void {
    this.ToDoListService.getToDoList(id).subscribe(
      {
        next: (res) => {
          this.ToDoList = res;

        }
        ,
        error: (err) => console.log(err)
      }
    )
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe(
      {
        next: (res) => {

          this.ToDoList?.tasks.push(res);
          this.newTask = taskIntializer(this.newTask, this.ToDoList?.id, this.datePipe)

        },
        error: err => console.log(err)
      }
    );

  }
  checkTaskCompleted(task: Task) {

    if (task.completed) {
      task.completed = false;
    }
    else {
      task.completed = true;
    }
    this.taskService.updateTask(task.id, task).subscribe(
      {
        next: res => console.log(res),
        error: err => console.log(err)
      }
    )

  }
  deleteTask(taskId: number | undefined) {
    this.taskService.deleteTask(taskId).subscribe(
      {
        next: (res) => {
          const index: number = Number(this.ToDoList?.tasks.findIndex(task => task.id === taskId));

          if (index !== -1) {
            this.ToDoList?.tasks.splice(index, 1);
          }
        },
        error: err => console.log(err)
      }
    );
  }
  displayTaskDetails(task: Task) {
    this.selectedTask = { ...task };
  }
  displayDropDown() {
    this.displayStyle = this.displayStyle === 'none' ? 'block' : 'none';
  }
  displayTimePicker() {
    this.displayTimePickerStyle = this.displayTimePickerStyle === 'none' ? 'block' : 'none';
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('#task-options')) {
      this.displayStyle = 'none';

    }
    if (!targetElement.closest('#time-options')) {
      this.displayTimePickerStyle = "none";
    }


  }

  setPriority(priority: string) {
    this.newTask.priority = priority;

  }

  handleEvent(eventData: { task: Task, eventType: string }): void {

    const taskIndex = (Number)(this.ToDoList?.tasks.findIndex(task => task.id === eventData.task.id));
    if (eventData.eventType == "update") {
      if (taskIndex !== -1) {
        if (this.ToDoList) {
          this.ToDoList.tasks[taskIndex] = { ...eventData.task};
          this.taskService.updateTask(eventData.task.id, eventData.task).subscribe(
            {
              next: res => { },
              error: err => console.log(err)
            }
          )
        }
      }
    }
    else if (eventData.eventType == "delete") {
      this.deleteTask(eventData.task.id);
    }


  }
}
