import { USER_ROLES } from '../utils/constants';

export function createUserModel(raw) {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    password: raw.password,
    role: raw.role ?? USER_ROLES.CUSTOMER,
    store_name: raw.store_name ?? null
  };
}
