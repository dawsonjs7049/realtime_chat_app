import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
    //this is a "hook", alawys initialized here (in top of functional component)
    //first item in array is the object to keep track of, second is the method that is responsible for changing it
    //what you pass in the useState() function is the initial value
    const [name, setName] = useState('')
    const [room, setRoom] = useState('');


    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}></input>
                </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={`/chat/?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;