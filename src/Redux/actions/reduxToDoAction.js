
export const createUser = (user) => {
    return {
        type: "CREATE_USER",
        payload: user
    }
}

export const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        payload: user
    }
}

export const deleteUser = (user) => {
    return {
        type: "DELETE_USER",
        payload: user.id
    }
}

export const deleteAllUser = (user) => {
    return {
        type: "DELETE_ALL_USER",
        payload: user
    }
}