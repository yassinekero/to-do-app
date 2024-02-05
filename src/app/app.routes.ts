import { Routes } from '@angular/router';
import { AllToDoListsComponent } from './components/all-to-do-lists/all-to-do-lists.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';

export const routes: Routes = 
[
  {
    path: "",
    component : AllToDoListsComponent,
    title : "All To-Do Lists"
  }, 
  {
    path : "to-do/:id",
    component : ToDoListComponent,
    title : "T-Do List"
  },
  {
    path : '*',
    redirectTo : "",
  
  }
];
