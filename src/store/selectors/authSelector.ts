import type { RootState } from "@/store/store";

export const userSelector = (state: RootState) => state.auth.user;