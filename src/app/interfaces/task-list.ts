export interface TaskList {
    id_task_list: number;
    asset_type_name: string;  // Cambiado a asset_type_name
    task_type_name: string;   // Cambiado a task_type_name
    id_asset_type: number;
    id_task_type: number;
    [key: `step_${number}`]: string | number;
}
