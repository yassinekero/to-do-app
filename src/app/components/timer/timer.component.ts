import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgClass } from '@angular/common';
import { TimerFormatPipe } from '../../pipes/timer-format.pipe';
import { TimerService } from '../../services/timer.service';
import { FormsModule } from '@angular/forms';
import e from 'cors';
import { IntervalTimer } from '../../utils/interval-timer';
@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  imports:
    [DatePipe, NgClass, TimerFormatPipe, FormsModule],
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {

  @ViewChild('sc1') sc1: ElementRef;
  @ViewChild('sc2') sc2: ElementRef;
  @ViewChild('sc3') sc3: ElementRef;
  @ViewChild('currentSession') currentSession: ElementRef;
  @ViewChildren('filler') fillers: QueryList<ElementRef>;

  public isTimer = false;
  public duration: number = 1;
  public pomo: number = 0.2;
  public breakTime: number = 5;
  public sessions: number[] = [25, 25];
  public leftSessions: number[] = this.sessions;
  public currentSessionCount: number = 1;
  private _timer: IntervalTimer;
  remainingTime: number;
  constructor(private timerService: TimerService) {

  }
  ngOnInit(): void {
    this.remainingTime = this.duration;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.timerService.isActive && this.timerService.isOnPlay) {
        this.isTimer = true;
        this.sessions = this.timerService.sessions;
        this.currentSessionCount = this.timerService.currentSessionCount;
        this._timer = new IntervalTimer(this.countDownTimer.bind(this), 0, this);
        this._timer.start();
        this.countDownTimer();
      }
      else if (this.timerService.isActive && !this.timerService.isOnPlay) {
        this.sessions = this.timerService.sessions;
        this.currentSessionCount = this.timerService.currentSessionCount;
      }
    }, 0)

  }
  countDownTimer() {
    this.remainingTime = this.timerService.remainingTime;
    const angle = (this.remainingTime / this.timerService.duration) * 360;
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
    this.fillCircleSession(this.remainingTime, this.timerService.duration, this.fillers.toArray()[this.currentSessionCount - 1])
    if (this.remainingTime <= 0) {
      this._timer.clear();
      this.isTimer = false
    }
    
  }

  fillCircleSession(remainingTime: number, duration: number, currentFillerEle: ElementRef) {
    let moveDistance = 100 - ((remainingTime / duration) * 100);
    currentFillerEle.nativeElement.style.transform = `translateX(${moveDistance}%)`;
  }
  startTimer() {

    if (this.timerService.isActive) {
      this.isTimer = true;
      this.currentSessionCount = this.timerService.currentSessionCount;
      this.sessions = this.timerService.sessions;
      this.timerService.startTimer();
      this._timer = new IntervalTimer(this.countDownTimer.bind(this), 0, this);
      this._timer.start();
      this.countDownTimer();
      return;
    }
    this.isTimer = true
    this.sessions = [];
    const sessionsCount = Math.ceil(this.duration / this.pomo);
    for (let i = 0; i < sessionsCount; i++) {
      this.sessions[i] = this.pomo;
    }
    this.timerService.sessions = this.sessions;
    this.timerService.startTimer();
    this._timer = new IntervalTimer(this.countDownTimer.bind(this), 0, this);
    this._timer.start();
    this.countDownTimer();
  }
  pauseTimer() {
    this.timerService.pauseTimer();
    this._timer.pause();
  }
  resumeTimer() {
    this.timerService.resumeTimer();
    this._timer.resume();
  }

  ngOnDestroy(): void {
    this._timer.clear();
  }

}
