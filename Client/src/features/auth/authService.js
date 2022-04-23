import axios from 'axios'

const API_URL='https://exposure-api-v1.herokuapp.com/user/'
const register=async(userData)=>{
    const response=await axios.post(API_URL,userData)
    if (response.data) {    
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const login=async(userData)=>{
    const response=await axios.post(`${API_URL}login`,userData)
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const updateUser=async(userData,token)=>{
    const config={
        headers:{Authorization: `Bearer ${token}`}
    }
    const response=await axios.patch(API_URL+'update',userData,config)

    if (response.data) {
        localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}



const logOut=()=>localStorage.removeItem('user')

const authService={
    register,
    logOut,
    login,
    updateUser
}   

export default authService