import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {updateProfile} from '../apis/api'

class Profile extends Component {
    constructor() {
        super()
        this.state= {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        // this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        const authToken = localStorage.authToken
        const decode = jwt_decode(authToken)
        this.setState({
            firstName: decode.firstName,
            lastName: decode.lastName,
            email: decode.email,
            password: decode.password
        })
    }

    changeFirstName = (event) => {
      this.setState({ firstName: event.target.value });
      console.log(event.target.value)
    }

    changeLastName = (event) => {
      this.setState({ lastName: event.target.value });
    }

    onSubmit(e){
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        console.log(user.firstName)
        updateProfile(user).then(res => {
            // this.props.history.push('/profile')
            this.props.history.push('/profile')
        })
    }

    render(){
        return(
            <div className="container">
            <div className="row">
              <div className="col-sm-10 col-md-9 col-lg-10 mx-auto"> 
                <div className="card card-login my-2">
                  <div className="card-body">
                      <div className="col-sm-10 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                          <h1 className="text-center mb-5">Profile Information</h1>
                        
                          <div className="form-group row">
                           <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>First name:</h5></label>
                           {/* <input type="text" className="col-sm-5 col-md-4 col-lg-5 form-control" name="email" placeholder="Enter email" value={this.state.firstName} onChange={this.onChange} /> */}
                            <input type="text" className=" col-sm-5 col-md-4 col-lg-5" defaultValue={this.state.firstName} onChange={this.changeFirstName} />
                          
                          </div>

                          <div className="form-group row">
                           <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Last name:</h5></label>
                          
                            <input id="last_name" type="text" className=" col-sm-5 col-md-4 col-lg-5 form-control"  value={this.state.lastName} onChange={this.changeLastName}/>
                          
                          </div>

                          <div className="form-group row">
                           <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Email Id:</h5></label>
                          
                            <input className="col-sm-5 col-md-4 col-lg-5 form-control" type="email" value={this.state.email} disabled/>
                          
                          </div>

                          <div className="form-group row">
                           <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Change Password:</h5></label>
                          
                            <input className=" col-sm-5 col-md-4 col-lg-5 form-control" type="password"/>
                          
                          </div>
              
                        <button type="submit" className="btn btn-mm btn-primary btn float-right ml-2"> Save </button>
                        <button type="reset" className="btn btn-mm btn-light btn-outline-secondary btn float-right"> Cancel </button>
                      </form>
                    </div>  
                  </div>
              </div>
          </div>
        </div>
      </div>
        )
    }
}

export default Profile