import { authApi } from "../api/auth";
import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { auth } from "../types/auth";
import { Detailed, User } from "../types/user";

export const authSLice=createDynamicCrudSlice<User,auth>('auth',authApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
