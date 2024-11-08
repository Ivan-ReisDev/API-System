import { MongodbUsersRepositoryes } from "../../../repositories/User/user-mongodb-repositories";
import { UserDeleteController } from "./users-delete-controller"; 
import { UsersDeleteUserUseCase } from "./users-delete-usecase"; 

const mongodbUsersRepositoryes = new MongodbUsersRepositoryes();

const usersDeleteUserUseCase = new UsersDeleteUserUseCase(
    mongodbUsersRepositoryes
);

const userDeleteController = new UserDeleteController(
    usersDeleteUserUseCase

);

export {usersDeleteUserUseCase, userDeleteController}