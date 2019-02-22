const initialState = {
    firstName: '',
    clubName: ''
}

const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_CLUB_NAME = 'UPDATE_CLUB_NAME';

function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_FIRST_NAME:
        return {...state, firstName: action.payload}
        case UPDATE_CLUB_NAME:
        return {...state, clubName: action.payload}

        default: return state
    }
}

export function updateFirstName(firstName) {
    return {
        type: UPDATE_FIRST_NAME,
        payload: firstName
    }
}

export function updateClubName(clubName) {
    return {
        type: UPDATE_CLUB_NAME,
        payload: clubName
    }
}

export default reducer