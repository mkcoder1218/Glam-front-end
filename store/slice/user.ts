import { userApi } from "../api/userApi";
import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { Detailed, User } from "../types/user";

export const userSLice=createDynamicCrudSlice<User,Detailed>('users',userApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
