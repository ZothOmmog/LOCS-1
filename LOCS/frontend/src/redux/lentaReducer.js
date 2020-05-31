const SET_EVENTS = "SET-EVENTS";
const CHANGE_PAGE = "CHANGE-PAGE";

const initialState = {
	events: [],
	countEvents: 4,
	currentPage: 1,
	pages: []
};

const lentaReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD-NEW-EVENT":
			return {
				...state,
				events: [...state.events, action.event]
			};
		case "SET-EVENTS":
			let pages = [];

			for (let i = 1; i <= Math.ceil(action.countAllEvents / state.countEvents); i++) {
				pages = [...pages, i];
			}

			return {
				...state,
				events: [
					...action.events
				],
				pages: pages
			};
		case "CHANGE-PAGE":
			return {
				...state,
				currentPage: action.page,
				events: action.events
			}
		default:
			return state;
	}
}

export const setEvents = (newEvents, countAllEvents) => {
	return { type: SET_EVENTS, events: newEvents, countAllEvents: countAllEvents };
}
export const changePage = (newPage, newEvents) => {
	return { type: CHANGE_PAGE,  page: newPage, events: newEvents };
}

export default lentaReducer;