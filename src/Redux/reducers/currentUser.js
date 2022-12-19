const initialState = {
    user: null,
    pass: null,
}

const currentUser = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload.username,
                pass: action.payload.pass,
                loggedIn: true
            } 
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                pass: {},
                loggedIn: false
            } 
        default:
            return state;
    }
}

export default currentUser;




// const currentUser = (state = {}, action) => {
//     switch(action.type){
//         case "SET_USER":
//             return {
//                 ...state,
//                 user: action.payload,
//                 loggedIn: true
//             }
//         case "LOG_OUT":
//             return {
//                 ...state,
//                 user: {},
//                 loggedIn: false
//             }
//         default:
//             return state
//     }
// }

// export default currentUser;