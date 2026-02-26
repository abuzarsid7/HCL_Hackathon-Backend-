import { createUserModel } from '../../models/userModel';

export const authService = {
	getAllUsers(state) {
		return state.users.map(createUserModel);
	},
	getCurrentUser(state) {
		const raw = state.users.find((user) => user.id === state.currentUserId);
		return raw ? createUserModel(raw) : null;
	}
};
