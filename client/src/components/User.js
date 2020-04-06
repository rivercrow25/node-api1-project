import React, { useState } from 'react'
import axios from 'axios'

import EditUser from './EditUser'


const User = ({ user, getdata }) => {
    const [editing, setEditing] = useState(false)

    const toggleEditing = () => {
        setEditing(!editing)
    }
    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(res => {
                getdata()
            })
            .catch(err => console.log(err.response))
    }
    return (
        <div>
            {editing ? (
                <EditUser user={user} getdata={getdata} />
            ) : (
                    <div>
                        <p>name: {user.name}</p>
                        <p>bio: {user.bio}</p>
                        <button type='button' onClick={() => deleteUser(user.id)}>Delete</button>
                        <button type='button' onClick={() => toggleEditing()}>Edit</button>
                    </div>
                )}

        </div>
    )
}

export default User