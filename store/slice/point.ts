import { authApi } from "../api/auth";
import { pointapi } from "../api/point";
import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { auth } from "../types/auth";
import { PointDaum, PointRoot } from "../types/point";
import { Detailed, User } from "../types/user";

export const PointsSlice=createDynamicCrudSlice<PointRoot,PointDaum>('points',pointapi as unknown as Record<string, (...args: any[]) => Promise<any>>);
