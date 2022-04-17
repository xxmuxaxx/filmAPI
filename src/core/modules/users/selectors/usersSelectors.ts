import type { RootState } from 'core/coreReducers';

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectCurrentUserIsAdmin = (state: RootState) =>
  state.users.currentUser?.rolePermissions.includes('USER_ADMIN');
export const selectIsFetching = (state: RootState) => state.users.isFetching;
export const selectError = (state: RootState) => state.users.error;
