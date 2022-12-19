import Data from "../../views/data";

const initialState = {
    listUser: [...Data],
}
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_USER': {
            return {
                ...state,
                listUser: state.listUser.concat(action.payload),
            }
        }
        case 'UPDATE_USER': {
            return {
                ...state,
                listUser: state.listUser.map((user) =>
                    user.id === action.payload.id
                        ? {
                            id: action.payload.id,
                            fullName: action.payload.fullName,
                            code: action.payload.code,
                            address: action.payload.address,
                            school: action.payload.school,
                            mail: action.payload.mail,
                            dob: action.payload.dob,
                        }
                        : user 
                    ),
            }
        }
        case 'DELETE_USER': {
            return {
                ...state,
                listUser: state.listUser.filter(item => item.id !== action.payload)
            }
        }
        case 'DELETE_ALL_USER': {
            let { dataUser, selection } = action.payload;
            return {
                ...state,
                listUser: dataUser.filter((item) => !selection.includes(item.id))
                // listUser: action.payload,
            }
        }
        default:
            return state;
    }
};
export default todoReducer;