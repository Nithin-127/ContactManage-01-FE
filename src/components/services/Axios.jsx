import axios from "axios";
let api = axios.create({
    baseURL:"https://contactmanage-01-be.onrender.com"
})


// fetch

export const getcontacts= async()=>{
    return  await api.get('/contacts')
}

// post
 export const postcontact= async(data)=>{
    return await api.post('/contacts',data)
 }

//  delete

    export const deletecnt = async(id)=>{
  return await api.delete(`/contacts/${id}`)
}
// edit 
export const editcnt = async(id,data)=>{
    return await api.put(`/contacts/${id}`,data)
}