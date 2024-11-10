export interface Ot {
    id_ot: number;
    order_number: string;
    request_date: Date;
    initial_date: Date;
    completion_date: Date;
    observations: string;
    id_user: number;
    id_task_list: number;
    id_priority: number;
    id_ot_state: number;
    id_tag: number;
    id_task_type: number;
    username?: string;        
    task_list_steps?: string;
    priority?: string;   
    ot_state?: string;     
    final_tag?: string;
}
