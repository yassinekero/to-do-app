import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerFormat',
  standalone : true
})
export class TimerFormatPipe implements PipeTransform {

  transform(value:number) : string {
  
       const totalSeconds: number = Math.floor(value / 1000);
       const minutes: number = Math.floor(totalSeconds / 60);
       const seconds: number = totalSeconds % 60;
       return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  }

}
