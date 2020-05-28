import React, {Component} from 'react'
import {register} from '../apis/api'
import {Link} from 'react-router-dom'
import './signup.css'
// import { ToastMessage } from "react-toastr";

class SignUp extends Component {

    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        const regexEmail = RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")
        const regexPassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")
        const validatePassword = regexPassword.test(user.password)
        const validateEmail = regexEmail.test(user.email)

        if(validateEmail){
            if(validatePassword){
                register(user).then(res => {
                    if(res.status==200){
                        this.props.history.push('\login')
                    } else if(res.status==409){
                        alert('User Exists')
                    } else {
                        alert('There was an error while creating account')
                    }
                })
            }
            else {
                alert('Password must be contain minimum 8 characters, 1 uppercase, 1 lowercase and 1 special character');
            }
        }
        else {
            alert('Invalid Email address')
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"> 
                        <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="Enter your first name" required value={this.state.firstName} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Enter your last name" required value={this.state.lastName} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter email" required value={this.state.email} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password" required value={this.state.password} onChange={this.onChange} />
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button><hr className="my-4" />
                            </form>
                            <Link to="/login"><small>Already have an account? Login</small></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            
        )
    }
}

export default SignUp