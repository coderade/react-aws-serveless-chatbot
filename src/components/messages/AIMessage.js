import React from "react";

import DOMPurify from 'dompurify'
import avatar from "../../assets/images/tom-avatar.png";

const AIMessage = props => {
    const {body, loading} = props.data;

    return (
        <li className='is-ai animation'
            id={loading ? "is-loading" : ""}>
            <div className="is-ai__profile-picture">
                <img src={avatar} alt="Avatar" className="avatar"/>
            </div>
            <span className="chatbot__arrow chatbot__arrow--left"/>
            <React.Fragment>
                <p className='chatbot__message' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}/>
            </React.Fragment>

        </li>
    );
};

export default AIMessage;

