import React, {Component} from "react";

class Bot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            close: true,
        };
    }

    render() {
        const {close} = this.state;
        return (
            <div>
                <div className={close ? "chatbot chatbot--closed" : "chatbot"}>
                    <div className={'chatbot__header'}  onClick={() => this.toggle()}>
                        <p><strong>Got a question?</strong> <span className="u-text-highlight">Ask Harry</span></p>
                        <svg className="chatbot__close-button icon-speech" viewBox="0 0 32 32">
                            {/*<use xlink:href="#icon-speech"/>*/}
                        </svg>
                        <svg className="chatbot__close-button icon-close" viewBox="0 0 32 32">
                            {/*<use xlink:href="#icon-close"/>*/}
                        </svg>
                    </div>
                    <div className="chatbot__message-window">
                        <ul className="chatbot__messages">
                            <li className="is-ai animation">
                                <div className="is-ai__profile-picture">
                                    <svg className="icon-avatar" viewBox="0 0 32 32">
                                        {/*<use xlink:href="#avatar"/>*/}
                                    </svg>
                                </div>
                                <span className="chatbot__arrow chatbot__arrow--left"></span>
                                <p className='chatbot__message'>Hi there 🖐. I’m Harry, your virtual assistant. I'm here
                                    to
                                    help with your
                                    general enquiries.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="chatbot__entry chatbot--closed">
                        <input type="text" className="chatbot__input" placeholder="Write a message..."/>
                        <svg className="chatbot__submit" viewBox="0 0 32 32">
                            {/*<use xlink:href="#icon-send"/>*/}
                        </svg>
                    </div>
                </div>
                <svg>
                    <symbol id="icon-close" viewBox="0 0 32 32">
                        <title>Close</title>
                        <path d="M2.624 8.297l2.963-2.963 23.704 23.704-2.963 2.963-23.704-23.704z"/>
                        <path d="M2.624 29.037l23.704-23.704 2.963 2.963-23.704 23.704-2.963-2.963z"/>
                    </symbol>
                    <symbol id="icon-speech" viewBox="0 0 32 32">
                        <title>Speech</title>
                        <path
                            d="M21.795 5.333h-11.413c-0.038 0-0.077 0-0.114 0l-0.134 0.011v2.796c0.143-0.006 0.273-0.009 0.385-0.009h11.277c0.070 0 7.074 0.213 7.074 7.695 0 5.179-2.956 7.695-9.036 7.695h-3.792c-0.691 0-1.12 0.526-1.38 1.159l-1.387 3.093-1.625 3.77 0.245 0.453h2.56l2.538-5.678h2.837c7.633 0 11.84-3.727 11.84-10.494 0.001-8.564-7.313-10.492-9.875-10.492z"/>
                        <path
                            d="M10.912 24.259c-0.242-0.442-0.703-0.737-1.234-0.737-0 0-0 0-0 0h-0.56c-0.599-0.011-1.171-0.108-1.71-0.28l0.042 0.012c-1.82-0.559-4.427-2.26-4.427-7.424 0-6.683 5.024-7.597 7.109-7.686v-2.8c-2.042 0.095-9.91 1.067-9.91 10.483 0 4.832 1.961 7.367 3.606 8.64 1.38 1.067 3.109 1.744 4.991 1.843l0.033 0.019 2.805 5.211 1.41-3.273z"/>
                    </symbol>
                    <symbol id="icon-send" viewBox="0 0 23.97 21.9">
                        <title>Send</title>
                        <path d="M0.31,9.43a0.5,0.5,0,0,0,0,.93l8.3,3.23L23.15,0Z"/>
                        <path d="M9,14.6H9V21.4a0.5,0.5,0,0,0,.93.25L13.22,16l6,3.32A0.5,0.5,0,0,0,20,19l4-18.4Z"/>
                    </symbol>
                    <symbol id="avatar" width="32" height="32" viewBox="0 0 44.25 44">
                        <title>Avatar</title>
                        <path style={{'fill': '#7226e0', 'fillRule': 'evenodd'}}
                              d="M1035.88,1696.25a22,22,0,1,1-22.13,22A22.065,22.065,0,0,1,1035.88,1696.25Z"
                              transform="translate(-1013.75 -1696.25)"/>
                        <path style={{'fill': '#fff', 'fillRule': 'evenodd'}}
                              d="M1030.18,1725.16h2.35a0.335,0.335,0,0,0,.34-0.33v-5.23h5.94v5.23a0.342,0.342,0,0,0,.34.33h2.36a0.342,0.342,0,0,0,.34-0.33v-12.36a0.34,0.34,0,0,0-.34-0.32h-2.36a0.34,0.34,0,0,0-.34.32v4.51h-5.94v-4.51a0.333,0.333,0,0,0-.34-0.32h-2.35a0.333,0.333,0,0,0-.34.32v12.36a0.335,0.335,0,0,0,.34.33"
                              transform="translate(-1013.75 -1696.25)"/>
                    </symbol>

                </svg>
            </div>
        );
    }

    toggle() {
        this.setState({
            close: !this.state.close,
        });
    }
}

export default Bot;