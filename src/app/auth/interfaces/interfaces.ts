export interface AuthResponse{
    access_token?: string;
    token_type?: string;
    message?:string;
}
export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at?: Date |null;
    address?:           string |null;
    birthdate?:         string |null;
    created_at?:        Date;
    updated_at?:        Date;
}

export type OptUser = Partial<User>;


export interface UserResponse{
    status: string;
    message: string;
    data:User;
}

