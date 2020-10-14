import React from "react";

const UserMessage = props => {
    const {body} = props.data;

    return (
        <li className={`is-user animation`}>
            <p className='chatbot__message'> {body}</p>
            <span className='chatbot__arrow chatbot__arrow--right'/>
        </li>
    );
};

export default UserMessage;

