import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {


  constructor(private datePipe : DatePipe) {}
  transform(value: string | undefined):  string {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if(!value)
    {
      return "Unset"
    }
    else if(value === this.datePipe.transform(today, "yyyy-MM-dd"))
    {
      return 'Today'
    }
    else if(value === this.datePipe.transform(tomorrow, "yyyy-MM-dd"))
    {
      return 'Tomorrow';
    }
   
    else 
    {
      return (String) (this.datePipe.transform(value,"MMMM dd"));
    }

  }

}
