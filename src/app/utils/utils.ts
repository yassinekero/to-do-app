

export type strundef = string | undefined;

export function timeFormatConverter(time : string | null ) :  string | null
{
    if(time)
    {
        let hourStr = (time.slice(0, time.indexOf(':') )); 
        const minutesStr = (time.slice(time.indexOf(':') + 1)); 
        let hour = (Number)(hourStr);
        const period = hour < 12 ? 'AM' : 'PM';
        hour = Math.max(1, Math.min(12, hour % 12));
        hourStr = hour.toString().padStart(2,'0')
        
        return `${hourStr}:${minutesStr} ${period}`;
    }
  
    return null
}

export function d ()
{

}