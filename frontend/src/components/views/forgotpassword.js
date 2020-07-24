import React, {Component} from 'react'
import { resetPassword } from '../apis/userapi'
import '../views/style/login.css'

class ForgotPassword extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit(e){

        e.preventDefault()

        const regexEmail = RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")
        const validateEmail = regexEmail.test(this.state.email)

        if(validateEmail){
            resetPassword(this.state.email).then(res => {
                    if(res.status===200){
                        alert('Password reset link is sent to your email address!')
                    } else if(res.status===400){
                        alert('User not found')
                    } else if(res.status===500){
                        alert('Internal server error')
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
                            <form className="form-login" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter email" required value={this.state.email} onChange={this.onChange} />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Reset Password</button><hr className="my-4" />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword