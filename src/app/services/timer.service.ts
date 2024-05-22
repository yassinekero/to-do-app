import { Injectable } from '@angular/core';
import { IntervalTimer } from '../utils/interval-timer';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private _remainingTime: number;
  private _totalDuration: number;
  private _duration: number = 25;
  private _sessions: number[];
  private _startTime: number;
  private _currentSessionCount: number = 1;
  private _currentTime: number;
  private _pausedTime: number
  private _breakTime : number;
  private _futureTime: number;
  public isPaused : boolean;
  private _timer: IntervalTimer;
  public isActive: boolean = false;
  public isOnPlay: boolean = false;
  public isBreak : boolean;
  private _pausedDuration : number;
  get remainingTime(): number {
    return this._remainingTime;
  }
  get duration(): number {
    return this._duration;
  }
  set duration(time: number) {
    this._duration = time * 60000;
  }
  get currentSessionCount(): number {
    return this._currentSessionCount;
  }
  set currentSessionCount(currentSessionCount: number) {
    this._currentSessionCount = currentSessionCount;
  }
  get breakTime() : number
  {
    return this._breakTime
  }
  set breakTime(breakTime : number) 
  {
  this._breakTime = breakTime ;
  } 

  startTimer() {
    if(this.isBreak) this._duration = this._breakTime * 60000;
    else  this._duration = this.sessions[this.currentSessionCount - 1] * 60000;
    this.isActive = true;
    this.isOnPlay = true;
    this._pausedTime = 0;
    this._startTime = Date.now();
    this._pausedDuration = 0;
    this._futureTime = this._startTime + this._duration
    this._timer = new IntervalTimer(this.countDownTimer.bind(this), 0, this);
    this._timer.start();
    this.countDownTimer();
  }
  pauseTimer() {
    this._pausedTime = this._currentTime;
    this._timer.pause();
    this.isPaused = true;

  }
  resumeTimer() {
    this._pausedDuration = Date.now() - this._pausedTime
    console.log(this._pausedDuration)
    this._timer.resume();
    this.isPaused = false;
  }
  resetTimer() {
  }
  get sessions(): number[] {
    return this._sessions;
  }
  set sessions(sessions: number[]) {
    this._sessions = sessions;
  }
  countDownTimer() {
   
        this._currentTime = Date.now() - this._pausedDuration;
        this._remainingTime = this._futureTime - this._currentTime;
        if (this._remainingTime < 0) {
         this._remainingTime = 0;
         if (!this.isBreak)
          { 
            this._currentSessionCount++;
            this.isBreak = true;
          }
          else this.isBreak = false
          this.isOnPlay = false;
          this._timer.clear();
        }
      }
   
    

}
