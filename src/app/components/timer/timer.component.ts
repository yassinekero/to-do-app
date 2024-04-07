import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  imports : 
  [DatePipe],
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.timerLoop =  setInterval(() => this.countDownTimer());
    this.countDownTimer();
  }


  @ViewChild('sc1') sc1: ElementRef;
  @ViewChild('sc2') sc2: ElementRef;
  @ViewChild('sc3') sc3: ElementRef;
  @ViewChild('timer') timer : ElementRef;


  min = 1;
  minutes = this.min * 60000;
  setTime =  this.minutes;
  startTime = Date.now();
  futureTime = this.startTime + this.setTime;
  timerLoop : any;
  remainingTime : any; 

  countDownTimer() {
    const currentTime = Date.now();
    this.remainingTime = this.futureTime - currentTime;
    const angle = (this.remainingTime / this.setTime) * 360;
    if (angle > 180) {
      this.sc3.nativeElement.style.display = "none";
      this.sc1.nativeElement.style.transform = "rotate(180deg)";
      this.sc2.nativeElement.style.transform = `rotate(${angle}deg)`;
    }
    else {
      this.sc3.nativeElement.style.display = "block";
      this.sc1.nativeElement.style.transform = `rotate(${angle}deg)`;
      this.sc2.nativeElement.style.transform = `rotate(${angle}deg)`;
    }

    if(this.remainingTime < 0)
    {
      clearInterval(this.timerLoop)
      this.sc1.nativeElement.style.display = "none";
      this.sc2.nativeElement.style.display = "none";
      this.sc3.nativeElement.style.display = "none";
      this.remainingTime = 0;
    }
  }

}
