import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCommentAlt, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons'
import UserMessage from "./messages/UserMessage";
import AIMessage from "./messages/AIMessage";
import BotService from "./../services/bot.service";
import Loader from "./Loader";
const $document = document

const BOT_NAME = 'Tom'

const messages = [
    {
        author: 'ai',
        body: `Hi there 🖐. I’m ${BOT_NAME}, your virtual assistant. I'm here to help you know if the weather is good 
        for you to walk with your cat..`,
        loading: true,
        timeout: 800
    },
    {
        author: 'ai',
        body: `Which city do you want to know about the weather?`,
        timeout: 2000,
        loading: true,
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
                    <div className="chatbot__entry chatbot--closed" >
                        <input type="text" className="chatbot__input" value={this.state.value}
                               onChange={evt => this.updateInputValue(evt)} placeholder="Write a message..."/>
                        <span className={'tabLinks'} onClick={() => this.sendMessage()} >
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

        this.scrollDown();
    }

    scrollDown = () => {
        const $chatbotMessageWindow = $document.querySelector('.chatbot__message-window')
        const $chatbotMessages = $document.querySelector('.chatbot__messages')
        $chatbotMessageWindow.scrollTop = $chatbotMessageWindow.scrollHeight - ($chatbotMessages.lastChild.offsetHeight + 60)
        return false
    }

    sendMessage() {

        if (this.state.value) {

            this.addMessage({
                author: 'human',
                body: this.state.value
            });

            const city = this.state.value;
            let message;
            BotService.getTemperateByCity(city)
                .then(result => {
                    if (result.data.valid) {
                        message = `The weather in ${this.state.value} is ${result.data.temperature}°F`;
                        this.addAIMessage(message);
                        this.addCustomizedMessage(result.data.temperature)
                    } else {
                        message = 'This city is invalid, please try another one.'
                        this.addAIMessage(message)
                    }

                }).catch(err => {

                message = `My apologies, I'm not avail at the moment, however, feel free to call to Jerry directly 0123456789.`
                this.addMessage({
                    author: 'ai',
                    body: message
                });
                console.log(err)
            })
        }
    }

    updateInputValue(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    addAIMessage(message) {
        this.addMessage({
            loading: true,
            author: 'ai',
            body: Loader,
        });

        setTimeout(() => {
            this.setState(prevState => {
                const idx = prevState.messages.length - 1;
                const newItems = [...prevState.messages];
                newItems[idx].body = message;
                return {messages: newItems, value: ''};
            })
        }, 1000)
    }

    addCustomizedMessage(temperature) {
        let message;
        if (temperature > 72) {
            message = "I think this is too hot for cats.";
        } else if (temperature <= 72 && temperature > 50) {
            message = "I think this is probably just right for your cat.";
        } else if (temperature <= 50 && temperature >= 30) {
            message = "I think this maybe a bit cold for your cat.";
        } else {
            message = "I think this is far too cold for cats.";
        }

        setTimeout(() => {
            this.addMessage({
                author: 'ai',
                body: message
            });
        }, 2000)


    }

}

export default Bot;