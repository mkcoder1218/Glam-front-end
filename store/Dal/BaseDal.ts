import { apiClient } from "@/axios/api";
import { dismissToast, showErrorToast, showLoadingToast, showSuccessToast } from "@/styles/toast";

export interface EntityApi<T extends { id: any }, S = T> {
  fetchAll: () => Promise<T[]>;
  createItem: (item: Partial<T>) => Promise<T>;
  updateItem: (item: T) => Promise<T>;
  deleteItem: (id: number) => Promise<number>;
  getById: (id: number) => Promise<S>;
  signin: (item: T) => Promise<T>;
  signup: (item: T) => Promise<T>;
  getProfile: () => Promise<T>;
}

export function createEntityApi<T extends { id: any }, S = T>(
  entityName: string
): EntityApi<T, S> {
  return {
    fetchAll: async (query?: string) => {
      const url = query ? `/${entityName}?q=${query}` : `/${entityName}`;
      const { data } = await apiClient.get(url);
      return data;
    },

    createItem: async (item: Partial<T>) => {
      const toastId = showLoadingToast(`Creating ${entityName}...`);
      try {
        const { data } = await apiClient.post(`/${entityName}`, item);
        dismissToast(toastId as string);
        showSuccessToast(`${entityName} created successfully!`);
        return data;
      } catch (error) {
        dismissToast(toastId as string);
        showErrorToast(`Error creating ${entityName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
    signin: async (item: T) => {
      const toastId = showLoadingToast(`Signing in ${entityName}...`);
      try {
        const { data } = await apiClient.post(`/auth/login`, item);
        dismissToast(toastId as string);
        showSuccessToast(`${entityName} signed in successfully!`);
        return data;
      } catch (error) {
        dismissToast(toastId as string);
        showErrorToast(`Error creating ${entityName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
    signup: async (item: T) => {
      const toastId = showLoadingToast(`Creating ${entityName}...`);
      try {
        const { data } = await apiClient.post(`/auth/register`, item);
        dismissToast(toastId as string);
        showSuccessToast(`${entityName} created successfully!`);
        
        return data;
      } catch (error) {
        dismissToast(toastId as string);
        showErrorToast(`Error creating ${entityName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
    getProfile: async () => {
      try {
        const { data } = await apiClient.get(`/auth/profile`);

        return data;
      } catch (error) {
        throw error;
      }
    },
    updateItem: async (item: T) => {
      const toastId = showLoadingToast(`Updating ${entityName}...`);
      try {
        const { data } = await apiClient.put(`/${entityName}/${item.id}`, item);
        dismissToast(toastId as string);
        showSuccessToast(`${entityName} updated successfully!`);
        return data;
      } catch (error) {
        dismissToast(toastId as string);
        showErrorToast(`Error updating ${entityName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
    deleteItem: async (id: number) => {
      const toastId = showLoadingToast(`Deleting ${entityName}...`);
      try {
        await apiClient.delete(`/${entityName}/${id}`);
        dismissToast(toastId as string);
        showSuccessToast(`${entityName} deleted successfully!`);
        return id;
      } catch (error) {
        dismissToast(toastId as string);
        showErrorToast(`Error deleting ${entityName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
    getById: async (id: number) => {
      const { data } = await apiClient.get(`/${entityName}/${id}`);
      return data;
    },
  };
}
