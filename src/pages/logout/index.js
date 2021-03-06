import { useEffect } from 'react'
import { logout } from 'src/modules/utils/auth'
import { logoutAction } from 'src/redux/actions/auth'
// import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'


const Logout = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const state = useSelector((state) => state)
    // console.log(state)
    const { token } = state.auth.userData

    useEffect(() => {
        dispatch(logoutAction(token))
        localStorage.clear('persist:root')
        router.push('/')
    }, [dispatch, token, router])
    return (
        <>
        </>
    )
}

export default Logout
// const Logout = (props) => {
//     const router = useRouter()
//     useEffect(() => {
//         logout(props.token)
//             .then((res) => {
//                 console.log(res);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//         props.dispatch(logoutAction())
//         localStorage.clear('persist:root')
//         console.log('status ?');
//         router.push('/')
//     })
//     return <></>
// }

// const mapStateToProps = (state) => {
//     return {
//         id: state.auth.userData.id,
//         token: state.auth.userData.token
//     };
// };

// export default connect(mapStateToProps)(Logout)