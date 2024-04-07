import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
@Component({
  selector: 'app-focus',
  standalone : true,
  imports : 
  [
      TimerComponent
  ],
  templateUrl: './focus.component.html',
  styleUrl: './focus.component.scss'
})
export class FocusComponent {

}
