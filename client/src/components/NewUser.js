import React, { useState } from 'react'
import axios from 'axios'

const NewUser = ({ getdata }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        bio: ''
    })

    const handleChange = event => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:5000/api/users', newUser)
            .then(res => {
                console.log(res)
                getdata()
            })
            .catch(err => console.log(err))
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input id='name' name='name' type='text' onChange={handleChange} />
            <label htmlFor='bio'>Bio</label>
            <input id='bio' name='bio' type='textarea' onChange={handleChange} />
            <button type='submit'>Add User</button>
        </form>
    )
}

export default NewUser