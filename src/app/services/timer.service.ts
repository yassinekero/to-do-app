import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  private remainingTime : number;
  private setTime : number = 0; 
  private startTime : number;
  private futureTime : number ;
  private timerLoop : any;
  public isOn : boolean = false;
  constructor() { }

  startTimer(time : number)
  {
    this.isOn = true;
    this.setTime =  time * 60000;
    this.startTime =  Date.now();
    this.futureTime =  this.startTime + this.setTime
    this.timerLoop =  setInterval(() => this.countDownTimer());
    this.countDownTimer();
  }
  resetTimer()
  {

  }
  getRemainingTime() : number
  {
    return this.remainingTime;
  }
   setTimeMethod(time : number) : void
  {
    this.setTime =  time * 60000;
  }
  
 
  getSetTime() : number
  {
    return this.setTime;
  }
  countDownTimer() {

    const currentTime = Date.now();
    this.remainingTime = this.futureTime - currentTime;
     if(this.remainingTime < 0 )
    {
      clearInterval(this.timerLoop)
      this.remainingTime = 0;
    }

  }

}
