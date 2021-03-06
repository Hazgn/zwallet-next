import { ActionType } from 'redux-promise-middleware'
import { ACTION_STRING } from 'src/redux/actions/actionString'

const initialState = {
    userData: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        image: null,
        noTelp: null,
        balance: 0
    },
    isPending: false,
    isFulfilled: false,
    isReject: false,
    errData: {}
}

const usersReducer = (prevState = initialState, action) => {
    const { userDataPersonal } = ACTION_STRING
    const { Pending, Fulfilled, Rejected } = ActionType

    switch (action.type) {
        case userDataPersonal.concat('_', Pending):
            return {
                ...prevState,
                isPending: true,
                isFulfilled: false,
                isReject: false,
            }

        case userDataPersonal.concat('_', Fulfilled):
            const data = action.payload.data
            const userData = {
                id: data.data.id,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                email: data.data.email,
                image: data.data.image,
                noTelp: data.data.noTelp,
                balance: data.data.balance
            }
            return {
                ...prevState,
                isPending: false,
                isFulfilled: true,
                userData
            }

        case userDataPersonal.concat('_', Rejected):
            const errData = action.payload
            return {
                ...prevState,
                isPending: false,
                isReject: true,
                errData
            }
        default: return prevState
    }
}

export default usersReducer