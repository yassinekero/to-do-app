import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatConverter',
  standalone: true
})
export class TimeFormatConverterPipe implements PipeTransform {


  transform(value: string | null): string | null{
    if(value)
    {
        let hourStr = (value.slice(0, value.indexOf(':') )); 
        const minutesStr = (value.slice(value.indexOf(':') + 1)); 
        let hour = (Number)(hourStr);
        const period = hour < 12 ? 'AM' : 'PM';
        hour = Math.max(1, Math.min(12, hour % 12));
        hourStr = hour.toString().padStart(2,'0')
        
        return `${hourStr}:${minutesStr} ${period}`;
    }
  
    return null;
  }

}
