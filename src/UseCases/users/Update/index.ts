import { MongodbUsersRepositoryes } from "../../../repositories/User/user-mongodb-repositories";
import { UserUpdateController } from "./users-update-controller";
import { UsersUpdateUserUseCase } from "./users-update-usecase";

const mongodbUsersRepositoryes = new MongodbUsersRepositoryes();

const usersUpdateUserUseCase = new UsersUpdateUserUseCase(
    mongodbUsersRepositoryes
);

const userUpdateController = new UserUpdateController(
    usersUpdateUserUseCase
);

export { usersUpdateUserUseCase, userUpdateController }