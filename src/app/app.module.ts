import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TimeFormatConverterPipe } from './pipes/time-format-converter.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
@NgModule({
  declarations: [
    AppComponent,
    CalendarViewComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
   MenuComponent,
   TaskDetailComponent, 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
 HttpClientModule,
 TimeFormatConverterPipe,
    CalendarModule.forRoot({
      provide : DateAdapter,
      useFactory : adapterFactory
    })
  ],
  providers: [DatePipe, CustomDatePipe, TimeFormatConverterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
