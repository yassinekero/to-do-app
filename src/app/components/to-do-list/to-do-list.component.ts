import { Component, HostListener } from '@angular/core';
import { ToDoList } from '../../interfaces/to-do-list';
import { ToDoListService } from '../../services/to-do-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { TaskTimeComponent } from '../task-time/task-time.component';
import { orderTasks, taskIntializer } from '../../utils/tasks-utils';
import { PrioritiesComponent } from '../priorities/priorities.component';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { TimeFormatConverterPipe } from '../../pipes/time-format-converter.pipe';
import { OptionsDropdownComponent } from '../options-dropdown/options-dropdown.component';
import { isValidDate } from '../../utils/utils';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
      CustomDatePipe,
      TimeFormatConverterPipe,
      OptionsDropdownComponent, NgFor

    ],
  animations:
    [
      trigger('taskAnim',
        [
          transition(':leave', [
            animate(200, style(
              {
                opacity: 0,
                transform: 'translateX(-30%)',
                height: 0,
                marginBottom: 0
              }
            ))
          ])
        ])
    ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {


  ToDoList: ToDoList =
    {
      title: "",
      tasks: [],
      days: []

    }
  allToDoLists: ToDoList[]
  newTask: Task;
  displayStyle = "none";
  displayTimePickerStyle = "none";
  priorities = ["None", "Low", "Medium", "High", "Urgent"]
  listDate: string;
  selectedTask: Task;
  urlId: any;

  constructor(private ToDoListService: ToDoListService, private taskService: TaskService, private customDate: CustomDatePipe, private route: ActivatedRoute, private datePipe: DatePipe) { }


  ngOnInit(): void {


    this.getAllToDoLists();
    this.urlId = this.route.snapshot.params["id"];

    if (isValidDate(this.urlId)) {
      this.listDate = this.urlId;
      this.ToDoList.title = this.customDate.transform(this.urlId);
      this.getTasksByDate(this.urlId);
      this.newTask = taskIntializer(this.newTask, 0, this.urlId, this.datePipe)
    }
    else {
      this.getToDoList(this.urlId)
      this.newTask = taskIntializer(this.newTask, this.urlId, undefined, this.datePipe)
    }
  }

  getTasksByDate(date: string) {
    this.taskService.getTasksByDate(date).subscribe(
      {
        next: (res) => {
          if (this.ToDoList)
            this.ToDoList.tasks = orderTasks(res);
        },
        error: (err) => console.log(err)
      }
    )
  }

  getAllToDoLists() {
    this.ToDoListService.getAllTodoLists().subscribe(
      {
        next: res => this.allToDoLists = res,
        error: err => console.log(err)
      })
  }
  getToDoList(id: string): void {
    this.ToDoListService.getToDoList(id).subscribe(
      {
        next: (res) => {
          if (res) {
            this.ToDoList = res;
            this.ToDoList.tasks = orderTasks(res.tasks);
          }

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


          if (isValidDate(this.urlId)) {
            if (this.newTask.startDate != this.listDate) {
              this.newTask = taskIntializer(this.newTask, 0, this.newTask.startDate, this.datePipe)
            }
            else {
              this.ToDoList.tasks.push(res);
              this.newTask = taskIntializer(this.newTask, 0, this.newTask.startDate, this.datePipe)
            }
          }
          else {
            if (this.newTask.toDoListId != this.ToDoList.id) {
              this.newTask = taskIntializer(this.newTask, this.ToDoList.id, this.newTask.startDate, this.datePipe)
            }
            else {
              this.ToDoList.tasks.push(res);
              this.newTask = taskIntializer(this.newTask, this.ToDoList.id, this.newTask.startDate, this.datePipe)
            }
          }

          this.ToDoList.tasks = orderTasks(this.ToDoList.tasks)

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
    this.ToDoList.tasks = orderTasks(this.ToDoList.tasks)
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
            this.ToDoList.tasks.splice(index, 1);
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

    const taskIndex = (Number)(this.ToDoList.tasks.findIndex(task => task.id === eventData.task.id));
    if (eventData.eventType == "update") {
      if (taskIndex !== -1) {
        if (this.ToDoList) {
          const unchangedCompleted = this.ToDoList.tasks[taskIndex].completed;
          this.ToDoList.tasks[taskIndex] = { ...eventData.task };
          this.ToDoList.tasks[taskIndex].completed = unchangedCompleted;
          this.taskService.updateTask(eventData.task.id, this.ToDoList.tasks[taskIndex]).subscribe(
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
