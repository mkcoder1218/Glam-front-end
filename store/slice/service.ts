import { roleApi } from "../api/role";
import { serviceApi } from "../api/service";

import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { Service_Daum, service_Root } from "../types/service";


export const serviceSlice=createDynamicCrudSlice<service_Root,Service_Daum>('services',serviceApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
