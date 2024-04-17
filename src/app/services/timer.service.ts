import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private _remainingTime: number;
  private _totalDuration : number;
  private _duration: number = 25;
  private _sessions : number[];
  private _startTime: number;
  private _currentSessionCount: number = 1;
  private _futureTime: number;
  private _timerLoop: any;
  public isActive: boolean = false;
  public isOnPlay : boolean = false;

  startTimer() {
    this.isActive = true;
    this.isOnPlay = true;
    this._duration = this.sessions[this.currentSessionCount - 1]* 60000;
    this._startTime = Date.now();
    this._futureTime = this._startTime + this._duration
    this._timerLoop = setInterval(() => this.countDownTimer());
    this.countDownTimer();
  }
  resetTimer() {

  }
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

  get sessions() : number[]
  {
    return this._sessions;
  }
  set sessions(sessions : number[])
  {
    this._sessions = sessions;
  }
  countDownTimer() {

    const currentTime = Date.now();
    this._remainingTime = this._futureTime - currentTime;
    if (this._remainingTime < 0) {
      clearInterval(this._timerLoop)
      this._remainingTime = 0;
      this._currentSessionCount++;
      this.isOnPlay = false;
    }

  }

}
