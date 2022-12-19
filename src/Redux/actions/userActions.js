
export const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: {
            username: "admin",
            pass: "123123",
        }
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}



// const setUser = (userObj) => {
//     return {
//         type: "SET_USER",
//         payload: userObj
//     }
// }

// const logOut = () => {
//     return {
//         type: "LOG_OUT"
//     }
// }

// export default {
//     setUser,
//     logOut
// }