import { ACTION_STRING } from 'src/redux/actions/actionString'
import { ActionType } from 'redux-promise-middleware'
import Swal from 'sweetalert2'

const initialState = {
    userData: {
        id: null,
        pin: null,
        token: null
    },
    isPending: false,
    isFulfilled: false,
    isReject: false,
    errData: {}
}

const authReducer = (prevState = initialState, action) => {
    const { authLogin, authPin } = ACTION_STRING
    const { Pending, Fulfilled, Rejected } = ActionType

    switch (action.type) {
        case authLogin.concat('_', Pending):
            return {
                ...prevState,
                isPending: true,
                isFulfilled: false,
                isReject: false,
            }

        case authLogin.concat('_', Fulfilled):
            const data = action.payload.data
            const userData = {
                id: data.data.id,
                token: data.data.token,
                pin: data.data.pin
            }
            return {
                ...prevState,
                isPending: false,
                isFulfilled: true,
                userData
            }

        case authLogin.concat('_', Rejected):
            const errData = action.payload
            let statusErr = errData.response.data.msg
            Swal.fire(
                'There is an error',
                `${statusErr === 'Wrong password' ? 'Email/Password is Wrong' : statusErr}`,
                'error'
            )
            // console.log(errData)
            return {
                ...prevState,
                isPending: false,
                isReject: true,
                errData
            }

        case authPin:
            const newPin = action.payload
            return {
                ...prevState,
                userData: {
                    ...prevState,
                    userData,
                    pin: newPin
                }
            }

        default: return prevState
    }
}

export default authReducer