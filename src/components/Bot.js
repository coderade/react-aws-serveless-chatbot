import React, {useState, useCallback, useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCommentAlt, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons'
import UserMessage from "./messages/UserMessage";
import AIMessage from "./messages/AIMessage";
import BotService from "./../services/bot.service";
import Loader from "./Loader";
import AudioButton from "./AudioButton";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

const $document = document
const BOT_NAME = 'Tom'

const defaultMessages = [
    {
        author: 'ai',
        body: `Hi there 🖐. I’m ${BOT_NAME}, your virtual assistant. I'm here to help you know if the weather is good 
        for you to walk with your cat..`,
        loading: true,
        timeout: 800
    }
];

const Bot = () => {
    const [messages, setMessages] = useState([]);
    const [close, setCloseState] = useState(false);
    const [value, setInputValue] = useState('')
    const {listening} = useSpeechRecognition();

    const addMessage = useCallback((item) => {

        setMessages(oldArray => {
            return [...oldArray, item]
        });

        setTimeout(() => {
            const items = document.querySelectorAll('li');
            const lastItem = items[items.length - 1];
            document.querySelector('.chatbot__messages').scrollTop = lastItem.offsetTop + lastItem.style.height;
        }, 100);

        scrollDown();

        setInputValue('')
    }, [setMessages])

    useEffect(() => {
        defaultMessages.map((item) => setTimeout(() => addMessage(item), item.timeout));
    }, [addMessage]);


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


        if (listening) {
            SpeechRecognition.stopListening()
        }

        if (value) {

            addMessage({
                author: 'human',
                body: value
            });

            let message;
            BotService.sendMessageToBot(value)
                .then(result => {
                    const body = JSON.parse(result.data.body);
                    formatLexResult(body)
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


            setMessages(oldArray => {
                let messagesClone = [...oldArray];
                messagesClone[messagesClone.length - 1].body = message;
                return messagesClone;
            });

        }, 1000)
    }

    const addCustomizedMessage = (sessionAttributes) => {
        const city = sessionAttributes.city_str;
        const temperature = Number(sessionAttributes.temp_str)
        let message = `The temperature in ${city} is ${temperature}°F. `
        if (temperature > 72) {
            message += "I think this is too hot for cats.";
        } else if (temperature <= 72 && temperature > 50) {
            message += "I think this is probably just right for your cat.";
        } else if (temperature <= 50 && temperature >= 30) {
            message += "I think this maybe a bit cold for your cat.";
        } else {
            message += "I think this is far too cold for cats.";
        }


        setTimeout(() => {
            addAIMessage(message);
        }, 2000)
    }

    const formatLexResult = (body) => {

        if (body.dialogState !== 'Fulfilled') {
            addAIMessage(body.message);
        } else {
            const message = `Ok, so you want to know if your cat can go outside today in ${value}. Let me check... one sec`
            addAIMessage(message);
            addCustomizedMessage(body.sessionAttributes)
        }
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
                    <span className={'tabLinks'}>
                            <AudioButton value={value} setState={setInputValue}/>
                        </span>
                    <input type="text" className="chatbot__input" value={value}
                           onChange={evt => updateInputValue(evt)} placeholder="Write a message..."/>
                    <span className={'tabLinks'} onClick={() => sendMessage()}>
                            <FontAwesomeIcon icon={faPaperPlane} className="fa-icon"/>
                        </span>

                </div>
            </div>
        </div>
    );
}

export default Bot;