import type { RootState } from "@/store/store";

export const loaderSelector = (state: RootState) => state.loader.isLoading;