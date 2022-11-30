import React from 'react'
import '../css/Message.css';


const Message = ({ userdata, message, classs }) => {
    if (userdata) {
        return (
            <div className={`messageBox ${classs}`}  >
                {`${userdata}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message;
