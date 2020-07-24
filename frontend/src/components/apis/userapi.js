import axios from 'axios'

export const register = createUser => {
    return axios
    .post('/api/user/register', {
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        email: createUser.email,
        password: createUser.password
    })
    .then(res => {
        console.log("Registered")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}


export const login = user => {
    return axios
    .post('/api/user/login', {
        email: user.email,
        password: user.password
    })
    .then(res=> {
        console.log('inside applicationCache.js login')
        localStorage.setItem('authToken', res.data.token)
        return res
    })
    .catch(err => {
        return err.response
    })
}

export const retrieveProfile = user => {
    return axios
    .get('/api/user/profile', {
       header: {'Authorization': localStorage.getItem('authToken')}
    })
    .then(res => {
        return res
    })
    .catch(err => {
        return err.response
    })
}

export const updateProfile = user => {
    return axios
    .put("/api/user/profile/update", 
    {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
    }, 
    {headers: {"Authorization": localStorage.getItem('authToken')} })
    .then(r => console.log(r.status))
    .catch(e => {return e.response});
}

export const logoutUser = () => {
    localStorage.removeItem('authToken')
    return axios
    .post("/api/user/logout")
    .then(res => {
        return res
    })
    .catch(e => {return e.response});
}

export const resetPassword = (email) => {
    return axios
    .post("/api/user/resetpassword",{
        email: email
    })
    .then(res => {
        return res
    })
    .catch(e => {return e.response});
}