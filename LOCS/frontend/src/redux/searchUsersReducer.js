const UPDATE_RESULT_SEARCH = "UPDATE_RESULT_SEARCH";
const CHANGE_PAGE = "CHANGE_PAGE";
const CLEAR_SEARCH_USERS_PAGE = "CLEAR_SEARCH_USERS_PAGE";

const initialState = {
	countUsers: 3,
	currentPage: 1,
	pages: []
};

const searchUsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_RESULT_SEARCH:
			let pages = [];

			for (let i = 1; i <= Math.ceil(action.resultSize / state.countUsers); i++) {
				pages = [...pages, i];
			}

			return {
				...state,
				pages: pages
			};
		case CHANGE_PAGE:
			return {
				...state,
				currentPage: action.page,
			}
		case CLEAR_SEARCH_USERS_PAGE:
			return initialState;
		default:
			return state;
	}
}

export const setUsers = (users, countAllUsers) => {
	return { type: UPDATE_RESULT_SEARCH, countAllUsers: countAllUsers };
}
export const changePage = (newPage, users) => {
	return { type: CHANGE_PAGE,  page: newPage, users: users };
}
export const clearSearchUsersPage = () => {
	return { type: CLEAR_SEARCH_USERS_PAGE };
}

export default searchUsersReducer;