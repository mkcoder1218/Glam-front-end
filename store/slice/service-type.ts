
import { serviceApi } from "../api/service";
import { serviceCategoryApi } from "../api/service-category";
import { serviceTypeApi } from "../api/service-type";

import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { Daum, Root } from "../types/serviceType";





export const serviceTypeSlice=createDynamicCrudSlice<Root,Daum>('categorytype',serviceTypeApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
