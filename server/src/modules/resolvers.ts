import { LoginResolver } from "./user/Login";
import { LogoutResolver } from "./user/Logout";
import { MeResolver } from "./user/Me";
import { RegisterResolver } from "./user/Register";
import { CreateEventResolver } from "./event/CreateEvent";
import { QueryEventsResolver } from "./event/QueryEvents";

export const resolvers = [
  // User
  LoginResolver,
  LogoutResolver,
  MeResolver,
  RegisterResolver,

  //Event
  CreateEventResolver,
  QueryEventsResolver

]