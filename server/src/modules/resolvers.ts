// User
import { LoginResolver } from "./user/Login";
import { LogoutResolver } from "./user/Logout";
import { MeResolver } from "./user/Me";
import { RegisterResolver } from "./user/Register";
import { QueryUsersResolver } from "./user/QueryUsers";
import { CreateUserResolver } from "./user/CreateUser";
import { UpdateUserResolver } from "./user/UpdateUser";
import { QueryUserResolver } from "./user/UserQuery";
// Event
import { CreateEventResolver } from "./event/CreateEvent";
import { QueryEventsResolver } from "./event/QueryEvents";
import { QueryEventResolver } from "./event/QueryEvent";
import { DeleteEventResolver } from "./event/DeleteEvent";
// Service
import { CreateServiceResolver } from "./store/service/CreateService";
import { UpdateServiceResolver } from "./store/service/UpdateService";
import { DeleteServiceResolver } from "./store/service/DeleteService";
import { QueryServicesResolver } from "./store/service/QueryServices";
import { QueryServiceResolver } from "./store/service/QueryService";
// Employee Schedule
import { CreateEmployeeSchedule } from "./employeeSchedule/createEmployeeSchedule";
import { UpdateEmployeeSchedule } from "./employeeSchedule/updateEmployeeSchedule";
import { DeleteEmployeeSchedule } from "./employeeSchedule/deleteEmployeeSchedule";
import { QueryEmployeeSchedule } from "./employeeSchedule/queryEmployeeSchedule";
import { QueryEmployeeSchedules } from "./employeeSchedule/QueryEmployeeSchedules";
// Organization
import { UpdateOrganizationResolver } from "./organization/UpdateOrganizationResolver";
import { QueryOrganizationResolver } from "./organization/QueryOrganizationResolver";

export const resolvers = [
  // User
  LoginResolver,
  LogoutResolver,
  MeResolver,
  RegisterResolver,
  QueryUsersResolver,
  CreateUserResolver,
  UpdateUserResolver,
  QueryUserResolver,

  // Event
  CreateEventResolver,
  QueryEventsResolver,
  QueryEventResolver,
  DeleteEventResolver,

  // Service
  CreateServiceResolver,
  UpdateServiceResolver,
  DeleteServiceResolver,
  QueryServicesResolver,
  QueryServiceResolver,

  // Employee Schedule
  CreateEmployeeSchedule,
  UpdateEmployeeSchedule,
  DeleteEmployeeSchedule,
  QueryEmployeeSchedule,
  QueryEmployeeSchedules,

  //Organization 
  UpdateOrganizationResolver,
  QueryOrganizationResolver
]