import React, {Component} from 'react'
// import jwt_decode from 'jwt-decode'
import {bookupload} from '../apis/booksapi'
import {uploads3image} from '../apis/imagesapi'
import {addbulkimages} from '../apis/imagesapi'
import '../views/style/profile.css'
import FormData from 'form-data'


class UpdateBook extends Component {
    constructor() {
        super()
        this.state= {
            isbn: '',
            title: '',
            authors: '',
            publication_date: '',
            quantity: '',
            price: '',
            imgCollection: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(e) {
      this.setState({ imgCollection: [...this.state.imgCollection, ...e.target.files] })
  }

    changeIsbn = (event) => {
      this.setState({ isbn: event.target.value });
    }

    changeTitle = (event) => {
        this.setState({ title: event.target.value });
      }

    changePrice = (event) => {
        this.setState({ price: event.target.value });
    }

    changeAuthors = (event) => {
        this.setState({ authors: event.target.value });
    }

    changePrice = (event) => {
        this.setState({ price: event.target.value });
    }

    changeQuantity = (event) => {
        this.setState({ quantity: event.target.value });
    }

    changePublicationDate = (event) => {
        this.setState({ publication_date: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        const bookcreate = {
            isbn: this.state.isbn,
            authors: this.state.authors,
            price: this.state.price,
            publication_date: this.state.publication_date,
            quantity: this.state.quantity,
            title: this.state.title
        }

        if(isNaN(bookcreate.isbn)) {
            alert('ISBN should consists of numbers')
        } else if(bookcreate.price < 0.01 || bookcreate.price > 9999.99){
            alert('Price should be greater than $0.01 and less than $9999.99')
        }
        //  else if(this.state.imgCollection.length===0){
        //   alert('Please select an image to upload')
        // }
        else {
            bookupload(bookcreate).then(res => {

                if(res.status===200){
                  
                  // Multiple image upload
                  var formData = new FormData();
                  for (const key of Object.keys(this.state.imgCollection)) {
                      formData.append('image', this.state.imgCollection[key])
                  }
                  console.log("Form Data "+ JSON.stringify(formData))
                  console.log(formData.length)

                  uploads3image(formData).then(s3res => { 

                    if(s3res.status==200){

                      console.log(res.data)
                      const newData = s3res.data.data.map(v => ({ ...v, book_id: res.data.book_id }))
                      addbulkimages(newData).then(imgtable => {
                          if(imgtable.status===200)  {
                            console.log(imgtable)
                            alert('Book updated successfully!')
                            this.props.history.push('/view')

                        } else {                        
                            alert('Error uploading image')
                        }
                      })
                    }
                    else {
                      alert('Error uploading image to s3')
                    }

                  })                 

                } else if(res.status===400) {
                    alert(res.data.message)
                } else if(res.status===500) {
                    console.log(res.data.message)
                    alert(res.data.message)
                }else if(res.status===409) {
                    alert(res.data.message)
                }else{
                    alert('Error updating details')
                }

            })
        }
    }

    render(){
        return(
            <div className="container">
            <div className="row">
              <div className="col-sm-10 col-md-9 col-lg-10 mx-auto"> 
                <div className="card card-profile my-2">
                  <div className="card-body">
                      <div className="col-sm-10 mx-auto">
                        <form className="form-profile" onSubmit={this.onSubmit}>
                          <h2 className="text-center mb-5">Book Information</h2>
                        
                          <div className="form-group row">
                            <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>ISBN:</h5></label>
                            <input type="text" className=" col-sm-5 col-md-4 col-lg-5 form-control" required defaultValue={this.state.isbn} onChange={this.changeIsbn} />
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Title:</h5></label>
                            <input id="last_name" type="text" className=" col-sm-5 col-md-4 col-lg-5 form-control" required value={this.state.title} onChange={this.changeTitle}/>
                          </div>
                         
                          <div className="form-group row">
                            <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Authors:</h5></label>
                            <input type="text" className=" col-sm-5 col-md-4 col-lg-5 form-control" required defaultValue={this.state.authors} onChange={this.changeAuthors} />
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Quantity Available:</h5></label>
                            <input type="number" min="1" max="999" className=" col-sm-5 col-md-4 col-lg-5 form-control" required defaultValue={this.state.quantity} onChange={this.changeQuantity} />
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Price:</h5></label>
                            <input type="number" className=" col-sm-5 col-md-4 col-lg-5 form-control" required defaultValue={this.state.price} onChange={this.changePrice} />
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h5>Publication Date:</h5></label>
                            <input type="date" className=" col-sm-5 col-md-4 col-lg-5 form-control" required defaultValue={this.state.publication_date} onChange={this.changePublicationDate} />
                          </div>
              
                          <div className="form-group row">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
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

export default UpdateBook