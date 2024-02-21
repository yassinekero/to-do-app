export interface Task
{
    id ?: number
    title : string,
    description : string | undefined,
    startTime : Date | undefined,
    endTime : Date | undefined,
    completed : boolean,
    tag : string | undefined
}