const initialState = {
    firstName: ''
}

const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME'

function reducer(state = initialState, action) {
    console.log(action)
    switch(action.type) {
        case UPDATE_FIRST_NAME:
        return {...state, firstName: action.payload}

        default: return state
    }
}

export function updateFirstName(firstName) {
    console.log(firstName)
    return {
        type: UPDATE_FIRST_NAME,
        payload: firstName
    }
}

export default reducer