import React, { useState } from 'react'
import Axios from 'axios'

const EditUser = ({ user, getdata }) => {
    const [edit, setEdit] = useState({
        name: user.name,
        bio: user.bio
    })


    const handleChange = event => {
        setEdit({ ...edit, [event.target.name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        Axios.put(`http://localhost:3000/api/users/${user.id}`, edit)
            .then(res => {
                getdata()
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input id='name' name='name' type='text' onChange={handleChange} />
            <label htmlFor='bio'>Bio</label>
            <input id='bio' name='bio' type='textarea' onChange={handleChange} />
            <button type='submit'>Edit User</button>
        </form>
    )
}

export default EditUser