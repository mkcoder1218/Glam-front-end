// src/api/userApi.ts

import { createEntityApi } from "../Dal/BaseDal";


// Create standard CRUD API for users
export const serviceApi = createEntityApi('services');
