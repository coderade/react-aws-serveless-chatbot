import React, {useState, useCallback, useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCommentAlt, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons'
import UserMessage from "./messages/UserMessage";
import AIMessage from "./messages/AIMessage";
import BotService from "./../services/bot.service";
import Loader from "./Loader";
import AudioButton from "./AudioButton";

const $document = document
const BOT_NAME = 'Tom'

const defaultMessages = [
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

const Bot = ({setState}) => {
    const [messages, setMessages] = useState([]);
    const [close, setCloseState] = useState(false);
    const [value, setInputValue] = useState('')

    const addMessage = useCallback((item) => {

        setMessages(oldArray => [...oldArray, item]);

        setTimeout(() => {
            const items = document.querySelectorAll('li');
            const lastItem = items[items.length - 1];
            document.querySelector('.chatbot__messages').scrollTop = lastItem.offsetTop + lastItem.style.height;
        }, 100);

        scrollDown();

        setInputValue('')
    }, [setMessages])

    useEffect(() => {
        defaultMessages.map((item) => {
            setTimeout(() => addMessage(item), item.timeout);
        });
    }, [setState, addMessage]);

    const toggle = () => {
        setCloseState(oldArray => !oldArray);
    }

    const scrollDown = () => {
        const $chatbotMessageWindow = $document.querySelector('.chatbot__message-window')
        const $chatbotMessages = $document.querySelector('.chatbot__messages')
        $chatbotMessageWindow.scrollTop = $chatbotMessageWindow.scrollHeight - ($chatbotMessages.lastChild.offsetHeight + 60)
        return false
    }

    const sendMessage = () => {

        if (value) {

            addMessage({
                author: 'human',
                body: value
            });

            const city = value;
            let message;
            BotService.getTemperateByCity(city)
                .then(result => {
                    if (result.data.valid) {
                        message = `The weather in ${value} is ${result.data.temperature}°F`;
                        addAIMessage(message);
                        addCustomizedMessage(result.data.temperature)
                    } else {
                        message = 'This city is invalid, please try another one.'
                        addAIMessage(message)
                    }

                }).catch(err => {

                message = `My apologies, I'm not avail at the moment, however, feel free to call to Jerry directly 0123456789.`

                addMessage({
                    author: 'ai',
                    body: message
                });
                console.log(err)
            })
        }
    }

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }

    const addAIMessage = (message) => {
        addMessage({
            loading: true,
            author: 'ai',
            body: Loader,
        });

        setTimeout(() => {
            setState(prevState => {
                const idx = prevState.messages.length - 1;
                const newItems = [...prevState.messages];
                newItems[idx].body = message;
                return {messages: newItems, value: ''};
            })
        }, 1000)
    }

    const addCustomizedMessage = (temperature) => {
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
            addMessage({
                author: 'ai',
                body: message
            });
        }, 2000)
    }

    return (
        <div>
            <div className={close ? "chatbot chatbot--closed" : "chatbot"}>
                <div className={'chatbot__header'} onClick={() => toggle()}>
                    <p>
                        <strong>Do you want know how is weather?</strong>
                        <span className="u-text-highlight"> Ask {BOT_NAME}</span>
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
                    <input type="text" className="chatbot__input" value={value}
                           onChange={evt => updateInputValue(evt)} placeholder="Write a message..."/>
                    <span className={'tabLinks'} onClick={() => sendMessage()}>
                            <FontAwesomeIcon icon={faPaperPlane} className="fa-icon"/>
                        </span>
                    <span className={'tabLinks'}>
                            <AudioButton value={value} setState={setInputValue}/>
                        </span>
                </div>
            </div>
        </div>
    );
}

export default Bot;