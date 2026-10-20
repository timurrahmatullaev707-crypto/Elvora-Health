import { UserProfile, UserRole, AppResource, AppAction, RolePermissions } from '../types';

/**
 * ELVORA HEALTH PERMISSIONS ENGINE
 *
 * IMPORTANT SECURITY NOTE:
 * This permission check is a client-side convenience and UI-guard helper.
 * Real, authoritative authorization and permission validation MUST be enforced
 * on the server side (e.g. FastAPI with JWT / OAuth2 scopes) on every incoming REST request.
 */

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  owner: {
    patients: { view: true, create: true, edit: true, delete: true, export: true },
    appointments: { view: true, create: true, edit: true, delete: true, export: true },
    doctors: { view: true, create: true, edit: true, delete: true, export: true },
    finance: { view: true, create: true, edit: true, delete: true, export: true },
    insights: { view: true, create: true, edit: true, delete: true, export: true },
    reports: { view: true, create: true, edit: true, delete: true, export: true },
    staff: { view: true, create: true, edit: true, delete: true, export: true },
    settings: { view: true, create: true, edit: true, delete: true, export: true },
    subscription: { view: true, create: true, edit: true, delete: true, export: true },
  },
  admin: {
    patients: { view: true, create: true, edit: true, delete: true, export: true },
    appointments: { view: true, create: true, edit: true, delete: true, export: true },
    doctors: { view: true, create: true, edit: true, delete: false, export: true },
    finance: { view: true, create: true, edit: true, delete: false, export: true },
    insights: { view: true, create: true, edit: false, delete: false, export: true },
    reports: { view: true, create: true, edit: false, delete: false, export: true },
    staff: { view: true, create: true, edit: true, delete: false, export: false },
    settings: { view: true, create: false, edit: true, delete: false, export: false },
    subscription: { view: true, create: false, edit: false, delete: false, export: false },
  },
  accountant: {
    patients: { view: true, create: false, edit: false, delete: false, export: false },
    appointments: { view: true, create: false, edit: false, delete: false, export: false },
    doctors: { view: true, create: false, edit: false, delete: false, export: false },
    finance: { view: true, create: true, edit: true, delete: true, export: true },
    insights: { view: true, create: false, edit: false, delete: false, export: true },
    reports: { view: true, create: true, edit: false, delete: false, export: true },
    staff: { view: false, create: false, edit: false, delete: false, export: false },
    settings: { view: false, create: false, edit: false, delete: false, export: false },
    subscription: { view: false, create: false, edit: false, delete: false, export: false },
  },
  doctor: {
    patients: { view: true, create: true, edit: true, delete: false, export: false },
    appointments: { view: true, create: true, edit: true, delete: false, export: false },
    doctors: { view: true, create: false, edit: false, delete: false, export: false },
    finance: { view: false, create: false, edit: false, delete: false, export: false },
    insights: { view: false, create: false, edit: false, delete: false, export: false },
    reports: { view: true, create: false, edit: false, delete: false, export: false },
    staff: { view: false, create: false, edit: false, delete: false, export: false },
    settings: { view: false, create: false, edit: false, delete: false, export: false },
    subscription: { view: false, create: false, edit: false, delete: false, export: false },
  },
  receptionist: {
    patients: { view: true, create: true, edit: true, delete: false, export: false },
    appointments: { view: true, create: true, edit: true, delete: false, export: false },
    doctors: { view: true, create: false, edit: false, delete: false, export: false },
    finance: { view: true, create: true, edit: false, delete: false, export: false },
    insights: { view: false, create: false, edit: false, delete: false, export: false },
    reports: { view: false, create: false, edit: false, delete: false, export: false },
    staff: { view: false, create: false, edit: false, delete: false, export: false },
    settings: { view: false, create: false, edit: false, delete: false, export: false },
    subscription: { view: false, create: false, edit: false, delete: false, export: false },
  },
};

/**
 * Checks if a user has permission to perform an action on a resource.
 *
 * @param user The current user profile or role string
 * @param action 'view' | 'create' | 'edit' | 'delete' | 'export'
 * @param resource Module/resource name
 * @returns boolean
 */
export function can(
  user: UserProfile | UserRole | null | undefined,
  action: AppAction,
  resource: AppResource
): boolean {
  if (!user) return false;

  const role: UserRole = typeof user === 'string' ? user : user.role;
  const permissions = DEFAULT_ROLE_PERMISSIONS[role];

  if (!permissions || !permissions[resource]) {
    return false;
  }

  return Boolean(permissions[resource][action]);
}

/**
 * Helper to get user-friendly role name in Uzbek
 */
export function getRoleTitleUz(role: UserRole): string {
  switch (role) {
    case 'owner':
      return 'Klinika Ta\'sischisi (Boshqaruvchi)';
    case 'admin':
      return 'Klinika Rahbari / Bosh Shifokor';
    case 'accountant':
      return 'Bosh Hisobchi (Buxgalter)';
    case 'doctor':
      return 'Shifokor Mutaxassis';
    case 'receptionist':
      return 'Qabulxona Xodimi (Registrator)';
    default:
      return role;
  }
}
