import axios from 'axios'
import FormData from 'form-data'

// Upload image to s3 bucket
export const uploads3image = data => {
    return axios({
        method: "POST",
        url: '/api/bookimages/uploads3image',
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log("Uploaded to s3")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}

// Delete from s3 bucket
export const deletefroms3 = data => {
    return axios
    .delete('/api/bookimages/deletefroms3', {
        data: { key: data.key}
       
    })
    .then(res => {
        console.log("Deleted from s3")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}

// Delete image from table
export const deletebookimage = data => {
    return axios
    .delete('/api/bookimages/deletebookimage', {
        data: {
        id: data
        }
    })
    .then(res => {
        console.log("Deleted image from table")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}

// Add image to table
export const addimage = data => {
    return axios
    .post('/api/bookimages/addimage', {
        book_id: data.book_id,
        location: data.location,
        originalname: data.originalname,
        key: data.key
    })
    .then(res => {
        console.log("Added image to table")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}

// Add images in bulk
export const addbulkimages = newData => {
    console.log(newData)
    return axios
    .post('/api/bookimages/addbulkimages', {
        imageSet: newData
    }).then(res => {
        console.log("Added image to table")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response  
    })
}

// Get images from the database
export const getallbookimages = data => {
    return axios
    .get('/api/bookimages/allimages', {
        headers: {'book_id': data}
     }).then(res => {
        console.log("Added image to table")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response  
    })
}

export const deleteallimagesfroms3 = key => {
    return axios
    .delete('/api/bookimages/deleteallimagesfroms3', {
        data: { key }
    })
    .then(res => {
        console.log("Deleted from s3")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}

// Delete all images from table
export const deleteallimages = data => {
    return axios
    .delete('/api/bookimages/deleteallimages', {
        data: {
            book_id: data.id
        }
    })
    .then(res => {
        console.log("Deleted all images from table")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}