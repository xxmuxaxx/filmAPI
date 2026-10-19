import type { CurrentUser, User } from "./types";

export const toCurrentUser = (user: User): CurrentUser => ({
  ...user,
  roles: user.roles.map((role) => role.name),
  rolePermissions: [
    ...new Set(
      user.roles.flatMap((role) =>
        role.rolePermissions.map((permission) => permission.authority)
      )
    ),
  ],
});

export const isUserAdmin = (user: CurrentUser | null | undefined) =>
  user?.rolePermissions.includes("USER_ADMIN") ?? false;
