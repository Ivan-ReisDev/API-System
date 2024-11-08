import { MongodbUsersRepositoryes } from "../../../repositories/User/user-mongodb-repositories";
import { UserCreateController } from "./users-create-controller";
import { UsersCreateUserUseCase } from "./users-create-usecase";

const mongodbUsersRepositoryes = new MongodbUsersRepositoryes();

const usersCreateUserUseCase = new UsersCreateUserUseCase(
    mongodbUsersRepositoryes
);

const userCreateController = new UserCreateController(
    usersCreateUserUseCase

);

export {usersCreateUserUseCase, userCreateController}