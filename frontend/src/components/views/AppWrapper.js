import { Redirect} from 'react-router-dom'
import React, {Component} from 'react'

class AppWrapper extends Component{
  render(){

  if(localStorage.length > 0)
    return <Redirect to="/home" />

   return(
     <div>
       <Redirect to='/signup'/>
     </div>
   );
  }
}

export default AppWrapper;