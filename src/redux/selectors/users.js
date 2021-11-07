export const selectCurrentUser = (state) => state.users.currentUser;
export const selectCurrentUserIsAdmin = (state) =>
  state.users.currentUser?.rolePermissions.includes('USER_ADMIN');
export const selectIsFetching = (state) => state.users.isFetching;
export const selectError = (state) => state.users.error;
