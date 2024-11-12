import { PasswordHasher } from "../../../lib/bcrypt/password-hash";
import { MongodbUsersRepositoryes } from "../../../repositories/User/user-mongodb-repositories";
import { UserCreateController } from "./users-create-controller";
import { UsersCreateUserUseCase } from "./users-create-usecase";

const mongodbUsersRepositoryes = new MongodbUsersRepositoryes();
const bcryptUserPassword = new PasswordHasher();


const usersCreateUserUseCase = new UsersCreateUserUseCase(
    mongodbUsersRepositoryes,
    bcryptUserPassword
);

const userCreateController = new UserCreateController(
    usersCreateUserUseCase

);

export {usersCreateUserUseCase, userCreateController}