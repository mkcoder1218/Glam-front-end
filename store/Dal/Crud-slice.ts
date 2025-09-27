// src/store/createDynamicCrudSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CrudState<T, S = T | null> {
  items: T[];
  loading: boolean;
  error: string | null;
  selectedItem?: S;
}

export function createDynamicCrudSlice<T, S = T | null>(
  entityName: string,
  api: Record<string, (...args: any[]) => Promise<any>>
) {
  const actions: Record<string, any> = {};
  const extraReducers: ((builder: any) => void)[] = [];

  for (const key in api) {
    const actionName = `${key}${capitalize(entityName)}`;
  
    // Wrap the API call to forward arguments correctly
    const thunk = createAsyncThunk(`${entityName}/${key}`, async (arg: any) => {
      return api[key](arg); // arg is now passed properly
    });
  
    actions[actionName] = thunk;
  
    extraReducers.push((builder: any) => {
      builder.addCase(thunk.pending, (state: CrudState<T, S>) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(thunk.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
  
        if (key === 'fetchAll') state.items = action.payload as T[];
        else if (key === 'createItem') state.items.push(action.payload as T);
        else if (key === 'updateItem') {
          const index = state.items.findIndex((i: T & { id: any }) => i.id === action.payload.id);
          if (index !== -1) state.items[index] = action.payload;
        }
        else if (key === 'deleteItem') {
          state.items = state.items.filter((i: T & { id: any }) => i.id !== action.payload);
        }
        else if (key === 'getById') {
          state.selectedItem = action.payload as S;
        }
      });
  
      builder.addCase(thunk.rejected, (state: CrudState<T, S>, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
    });
  }
  

  const slice = createSlice({
    name: entityName,
    initialState: {
      items: [] as T[],
      loading: false,
      error: null,
      selectedItem: null as S,
    } as CrudState<T, S>,
    reducers: {},
    extraReducers: builder => {
      extraReducers.forEach(fn => fn(builder));
    },
  });

  return { reducer: slice.reducer, actions };
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
