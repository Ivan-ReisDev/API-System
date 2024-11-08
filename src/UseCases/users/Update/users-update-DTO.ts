export interface UserUpdateRequest {
    id: string,
    nickname: string,
    patent: string,
    userType: string 
 
 }

export interface IUpdateUserRequestDTO{
    user?: UserUpdateRequest
    id?:string
    nickname?: string;
    password?: string;
    patent?: string;
    classes?: string[];
    teans?: string[];
    status?: string;
    userType?: string;
    tag?:string;
    token?: string | null;
    tokenActive?: string | null;
    warnings?: number;
    medals?: string;
    code?: string | null;
    type?: string;
    codeActive?: string;

}