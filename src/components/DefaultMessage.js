import React, {Component, PureComponent} from "react";
import avatar from '../images/tom-avatar.png';

class DefaultMessage extends PureComponent {
    props;

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            close: true,
            botName: 'Tom'
        };
    }

    render() {
        const {botName} = this.state;
        return (
            <li className="is-ai animation">
                <div className="is-ai__profile-picture">
                    <img src={avatar} alt="Avatar" className="avatar"/>
                </div>
                <span className="chatbot__arrow chatbot__arrow--left"/>
                <p className='chatbot__message'>{{message}}</p>
            </li>
        );
    }
}

export default DefaultMessage;