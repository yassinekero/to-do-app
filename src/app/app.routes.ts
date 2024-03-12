import { Routes } from '@angular/router';
import { AllToDoListsComponent } from './components/all-to-do-lists/all-to-do-lists.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { CreateToDoListComponent } from './components/create-to-do-list/create-to-do-list.component';

export const routes: Routes = 
[
  {
    path: "to-do/lists",
    component : AllToDoListsComponent,
    title : "Create To-Do List"
  },
  {
    path: "to-do/create",
    component : CreateToDoListComponent,
    title : "Create To-Do List"
  },
  {
    path : "to-do/:id",
    component : ToDoListComponent,
    title : "To-Do List"
  },
 
  {
    path: "",
    component : ToDoListComponent,
    title : "Today List"
  }, 

  {
    path : '**',
    redirectTo : "",
  pathMatch : 'full'
  }
];
