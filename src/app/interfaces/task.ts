
export interface Task
{
    id ?: number,
    title : string ,
    description ?: string ,
    startDate ?: string ,
    endDate?: string,
    startTime : string | null ,
    endTime: string | null,
    toDoListId ?: number,
    completed ?: boolean,
    tag ?: string,
    priority ?: string
}