
const initialState = {
    list: [],
    selectedId: null,
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER': {
            const newList = [...state.list];
            newList.push(action.payload);
            return {
                ...state,
                list: newList,
            }
        }
        case 'UPDATE_USER': {
            const newSelectedId = action.payload.id;
            return {
                ...state,
                selectedId: newSelectedId,
            }
        }
        default:
            return state;
    }
};
export default todoReducer;