import model from "../models/model";
import { UserService } from "./user-service";

export const userService = new UserService(model)
