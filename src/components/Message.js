import React, {Component} from "react";
import avatar from "../images/tom-avatar.png";

const Message = props => {
    const {id, author, body} = props.data;

    return (
        <li className={`is-${author} animation`}>
            {author === 'bot' ? (
                <div>
                    <div className="is-ai__profile-picture">
                        <img src={avatar} alt="Avatar" className="avatar"/>
                    </div>
                    <span className="chatbot__arrow chatbot__arrow--left"/>
                    <p className='chatbot__message'>{{body}}</p>
                </div>
            ) : (
                <div>
                    <p className='chatbot__message'>{{body}}</p>
                    <span className='chatbot__arrow chatbot__arrow--right'/>
                </div>
            )}
        </li>
    );
};

export default Message;