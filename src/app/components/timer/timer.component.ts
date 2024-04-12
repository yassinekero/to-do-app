import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { TimerFormatPipe } from '../../pipes/timer-format.pipe';
import { TimerService } from '../../services/timer.service';
@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  imports:
    [DatePipe, NgClass, TimerFormatPipe],
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {

  @ViewChild('sc1') sc1: ElementRef;
  @ViewChild('sc2') sc2: ElementRef;
  @ViewChild('sc3') sc3: ElementRef;

  public isTimer = false;
  private setTime : number = 0;
  private timerLoop: any;
  remainingTime: number;
  constructor(private timerService: TimerService) {

  }
  ngOnInit(): void {
   this.remainingTime = this.setTime;
  }

  ngAfterViewInit(): void {


    setTimeout(() => {
      if (this.timerService.isOn) {
        this.isTimer = true;
        this.timerLoop = setInterval(() => this.countDownTimer());
        this.countDownTimer();
      }
    }, 0)

  }


  countDownTimer() {

    this.remainingTime = this.timerService.getRemainingTime();
    const angle = (this.remainingTime / this.timerService.getSetTime()) * 360;
    if (angle > 180) {
      this.sc3.nativeElement.style.display = "none";
      this.sc1.nativeElement.style.transform = "rotate(180deg)";
      this.sc2.nativeElement.style.transform = `rotate(${angle}deg)`;
    }
    else {
      this.sc3.nativeElement.style.display = "block";
      this.sc1.nativeElement.style.transform = `rotate(${angle}deg)`;
      this.sc2.nativeElement.style.transform = `rotate(${angle}deg)`;
      this.sc2.nativeElement.style.display = "none";
    }
    if (this.remainingTime <= 0) {
      clearInterval(this.timerLoop)
      this.isTimer = false
    }
  }

  startTimer() {
    this.isTimer = true;
    this.setTime = 0.1;
    this.timerService.startTimer(this.setTime);
    this.timerLoop = setInterval(() => this.countDownTimer());
    this.countDownTimer();

  }

  ngOnDestroy(): void {
    clearInterval(this.timerLoop)
  }

}
