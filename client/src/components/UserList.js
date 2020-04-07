import React from 'react'
import User from './User'

const UserList = ({ users, getdata }) => {

    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id} getdata={getdata} />
            ))}
        </div>
    )
}

export default UserList