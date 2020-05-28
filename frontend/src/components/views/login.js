import React, {Component} from 'react'
import {login} from '../apis/api'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit(e){

        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        const regexEmail = RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")
        const validateEmail = regexEmail.test(user.email)

        if(validateEmail){
                login(user).then(res => {
                    if(res.status===200){
                        this.props.history.push('/home')
                    } else if(res.status===401){
                        alert('Invalid credentials')
                    } else if(res.status===404){
                        alert('User not found! Please register with a new account')
                    }
                })
            }
       else {
            alert('Enter a valid email address')
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"> 
                        <div className="card card-login my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Log In</h5>
                            <form className="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter email" required value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password" required value={this.state.password} onChange={this.onChange}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Log In</button><hr className="my-4" />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login