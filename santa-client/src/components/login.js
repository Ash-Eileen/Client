import {useGlobalState} from '../config/store'

const Login = () =>{  

    const {store} = useGlobalState() 
    const {test} = store

    return( 
        <div> 
            its me login  
            {test}
        </div>
    )
}



export default Login