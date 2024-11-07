export interface User {
    [x: string]: any;
    id_user: number,
    username: string,
    last_name: string,
    email: string,
    password: string,
    admin: boolean,
    id_available?: number,
    token: string;
    message?: string; 
    error?: string;  
}


