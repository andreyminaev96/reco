import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Logos {
  app?: string;
  connector?: string;
}

export interface AppItem {
  appId: string;
  name: string;
  category: string;
  connector: string;
  logos?: Logos;
}

interface ConnectorDetails {
  name: string;
  logo: string;
}
interface AppUser {
  id: string;
  name: string;
  pic?: string;
}
export interface AppDetails {
  appId: string;
  name: string;
  category: string;
  lastClassification?: string;
  logo?: string;
  connector?: ConnectorDetails;
  users?: AppUser[];
}

export type Order = "asc" | "desc";
export type SortField = keyof AppItem;

interface AppsState {
  apps: AppItem[];
  loading: boolean;
  error: string | null;

  sortField: SortField;
  sortOrder: Order;

  page: number;
  rowsPerPage: number;
  totalCount: number;

  selectedAppId: string | null;
  appDetails: AppDetails | null;
  loadingDetails: boolean;
  errorDetails: string | null;
}

const initialState: AppsState = {
  apps: [],
  loading: false,
  error: null,

  sortField: "name",
  sortOrder: "asc",

  page: 0,
  rowsPerPage: 10,
  totalCount: 0,

  selectedAppId: null,
  appDetails: null,
  loadingDetails: false,
  errorDetails: null,
};

export const fetchApps = createAsyncThunk<AppItem[]>(
  "apps/fetchApps",
  async () => {
    const resp = await fetch("/apss_inventory.mock.json");
    if (!resp.ok) {
      throw new Error("Failed to fetch apps list");
    }
    const data = (await resp.json()) as AppItem[];
    return data;
  },
);

export const fetchAppDetails = createAsyncThunk<AppDetails, string>(
  "apps/fetchAppDetails",
  async (appId) => {
    const resp = await fetch("/app_details.mock.json");
    if (!resp.ok) {
      throw new Error("Failed to fetch details");
    }
    const data = (await resp.json()) as AppDetails;

    if (data.appId !== appId) {
      throw new Error(`No details found for appId=${appId}`);
    }
    return data;
  },
);

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setSelectedAppId: (state, action: PayloadAction<string | null>) => {
      state.selectedAppId = action.payload;
      if (action.payload === null) {
        state.appDetails = null;
        state.errorDetails = null;
      }
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<Order>) => {
      state.sortOrder = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApps.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchApps.fulfilled, (state, action) => {
      state.loading = false;
      state.apps = action.payload;
      state.totalCount = action.payload.length;
    });
    builder.addCase(fetchApps.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error loading apps";
    });

    builder.addCase(fetchAppDetails.pending, (state) => {
      state.loadingDetails = true;
      state.errorDetails = null;
    });
    builder.addCase(fetchAppDetails.fulfilled, (state, action) => {
      state.loadingDetails = false;
      state.appDetails = action.payload;
    });
    builder.addCase(fetchAppDetails.rejected, (state, action) => {
      state.loadingDetails = false;
      state.errorDetails = action.error.message || "Error loading details";
    });
  },
});

export const {
  setSelectedAppId,
  setSortField,
  setSortOrder,
  setPage,
  setRowsPerPage,
} = appsSlice.actions;

export default appsSlice.reducer;

export const selectAppsState = (state: RootState) => state.apps;

export const selectApps = (state: RootState) => state.apps.apps;
export const selectLoading = (state: RootState) => state.apps.loading;
export const selectError = (state: RootState) => state.apps.error;

export const selectSortField = (state: RootState) => state.apps.sortField;
export const selectSortOrder = (state: RootState) => state.apps.sortOrder;

export const selectPage = (state: RootState) => state.apps.page;
export const selectRowsPerPage = (state: RootState) => state.apps.rowsPerPage;
export const selectTotalCount = (state: RootState) => state.apps.totalCount;

export const selectSelectedAppId = (state: RootState) =>
  state.apps.selectedAppId;
export const selectAppDetails = (state: RootState) => state.apps.appDetails;
export const selectLoadingDetails = (state: RootState) =>
  state.apps.loadingDetails;
export const selectErrorDetails = (state: RootState) => state.apps.errorDetails;
