import { roleApi } from "../api/role";
import { userApi } from "../api/userApi";
import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { role_Daum, role_Root } from "../types/role";
import { Detailed, User } from "../types/user";

export const roleSLice=createDynamicCrudSlice<role_Root,role_Daum>('selectedrole',roleApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
