
import { serviceApi } from "../api/service";
import { serviceCategoryApi } from "../api/service-category";

import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { Daum, Root } from "../types/servicesCategory";



export const serviceCategorySlice=createDynamicCrudSlice<Root,Daum>('serviceCategory',serviceCategoryApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
