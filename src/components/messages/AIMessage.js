import React from "react";
import avatar from "../../images/tom-avatar.png";

const AIMessage = props => {
    const {body} = props.data;

    return (
        <li className={`is-ai animation`}>
            <div className="is-ai__profile-picture">
                <img src={avatar} alt="Avatar" className="avatar"/>
            </div>
            <span className="chatbot__arrow chatbot__arrow--left"/>
            <p className='chatbot__message'> {body}</p>
        </li>
    );
};

export default AIMessage;

