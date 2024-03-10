import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {


  constructor(private datePipe : DatePipe) {}
  transform(value: string | undefined):  string | null{
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if(value === this.datePipe.transform(today, "yyyy-MM-dd"))
    {
      return 'Today'
    }
    else if(value === this.datePipe.transform(tomorrow, "yyyy-MM-dd"))
    {
      return 'Tomorrow';
    }
    else 
    {
      return this.datePipe.transform(value,"MMMM dd");
    }

  }

}
