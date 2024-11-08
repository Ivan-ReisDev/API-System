export interface UserRequest {
   id: string,
   nickname: string,
   patent: string,
   userType: string 

}

export interface IDeleteUserRequestDTO {
    userDeleteId: string
    user: UserRequest 

}