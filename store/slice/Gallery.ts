import { GalleryApi } from "../api/Gallery";
import { roleApi } from "../api/role";
import { userApi } from "../api/userApi";
import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { GalleryDaum, GalleryRoot } from "../types/gallery";
import { role_Daum, role_Root } from "../types/role";
import { Detailed, User } from "../types/user";

export const GallerySlice=createDynamicCrudSlice<GalleryRoot,GalleryDaum>('gallery',GalleryApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
