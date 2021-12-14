import { LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCEED, LOGOUT_FAILED, LOGOUT_SUCCEED } from 'redux/Constants/constant';

const initialState = {
	login: {
		user: {},
		is_authenticated: false,
		is_loading: false,
		errors: {}
	}
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		//dang nhap
		case LOGIN_REQUESTED:
			return {
				...state,
				login: {
					...state.login,
					is_loading: true
				}
			};
		case LOGIN_SUCCEED:
			return {
				...state,
				login: {
					...state.login,
					user: action.payload.user,
					is_authenticated: true,
					is_loading: false
				}
			};
		case LOGIN_FAILED:
			return {
				...state,
				login: {
					...state.login,
					errors: action.payload.errors,
					is_loading: false
				}
			};
		// logout
		case LOGOUT_SUCCEED:
			return {
				...state,
				login: {
					...state.login,
					user: {},
					is_authenticated: false
				}
			};
		case LOGOUT_FAILED:
			return {
				...state,
				login: {
					...state.login,
					errors: action.payload.errors
				}
			};
		default:
			return state;
	}
};

export default loginReducer;
