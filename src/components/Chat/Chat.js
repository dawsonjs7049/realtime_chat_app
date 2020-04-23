import React, { useState, useEffect } from 'react'; //useEffect is a hook that lets you use life cycle methods inside functional components
import queryString from 'query-string'; //helps retrieve data from url
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search) //gives us our url in an object (ie the url will be turned into { name: "jake", room: "214"})

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
           if(error) {
               alert(error);
           }
        });
    }, [ENDPOINT, location.search]) //the effect will only fire when either the ENDPOINT or location.search changes


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message ]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        })
    }, [])

    //function for sending messages
    const sendMessage = (event) => {
        event.preventDefault(); 

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;