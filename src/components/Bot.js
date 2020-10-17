import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane, faTimes, faCommentAlt} from '@fortawesome/free-solid-svg-icons'
import UserMessage from "./messages/UserMessage";
import AIMessage from "./messages/AIMessage";

//https://codepen.io/onefastsnail/pen/JpmdKW
//https://codepen.io/Guimauve01/pen/rwVOrV

const BOT_NAME = 'Tom'

const messages = [
    {
        author: 'ai',
        body: `Hi there 🖐. I’m ${BOT_NAME}, your virtual assistant. I'm here to help with your general enquiries`,
        timeout: 1000
    }
];

class Bot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            close: true,
            botName: BOT_NAME,
            messages: [],
            value: ''
        };
    }

    componentDidMount() {

        messages.map((item) => {
            setTimeout(() => this.addMessage(item), item.timeout);
        });

        setTimeout(() => {
            this.setState({
                messages: this.state.messages.slice(1, this.state.messages.length)
            });
        }, 700);
    }

    render() {
        const {close, botName, messages} = this.state;
        return (
            <div>
                <div className={close ? "chatbot chatbot--closed" : "chatbot"}>
                    <div className={'chatbot__header'} onClick={() => this.toggle()}>
                        <p>
                            <strong>Do you want know how is weather?</strong>
                            <span className="u-text-highlight"> Ask {botName}</span>
                        </p>

                        {close ?
                            <FontAwesomeIcon icon={faCommentAlt} className="fa-icon"/>
                            :
                            <FontAwesomeIcon icon={faTimes} className="fa-icon"/>
                        }

                    </div>
                    <div className="chatbot__message-window">
                        <ul className="chatbot__messages">
                            {messages.map((message, index) => {
                                if (message.author === 'ai') {
                                    return <AIMessage key={index} data={message}/>
                                } else {
                                    return <UserMessage key={index} data={message}/>
                                }
                            })}
                        </ul>
                    </div>
                    <div className="chatbot__entry chatbot--closed">
                        <input type="text" className="chatbot__input" value={this.state.value}
                               onChange={evt => this.updateInputValue(evt)} placeholder="Write a message..."/>
                        <span className={'tabLinks'} onClick={() => this.sendMessage()}>
                            <FontAwesomeIcon icon={faPaperPlane} className="fa-icon"/>
                        </span>

                    </div>
                </div>
            </div>
        );
    }

    toggle() {
        this.setState({
            close: !this.state.close,
        });
    }

    addMessage(item) {
        this.setState({
            messages: [...this.state.messages, item]
        });

        setTimeout(() => {
            const items = document.querySelectorAll('li');
            const lastItem = items[items.length - 1];
            document.querySelector('.chatbot__messages').scrollTop = lastItem.offsetTop + lastItem.style.height;
        }, 100);
    }

    sendMessage() {
        if (this.state.value) {
            this.addMessage({
                author: 'human',
                body: this.state.value
            });
        }


    }

    updateInputValue(evt) {
        this.setState({
            value: evt.target.value
        });
    }
}

export default Bot;