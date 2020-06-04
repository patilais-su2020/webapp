import axios from 'axios'

export const register = createUser => {
    return axios
    .post('user/register', {
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
    .post('user/login', {
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
    .get('user/profile', {
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
    .put("user/profile/update", 
    {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
    }, 
    {headers: {"Authorization": localStorage.getItem('authToken')} })
    .then(r => console.log(r.status))
    .catch(e => {return e.response});
}