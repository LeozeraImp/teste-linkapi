export interface Job {
    id : string;
    name : string;
    status : boolean;
    recurrence : string;
    recurrence_value : string;
    interval : Date;
    fixed_schedule : Date;
    created_at?: Date;
    user_id?: string;
}