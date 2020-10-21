import React, {useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";

const AudioButton = ({setState}) => {
    const {transcript, listening} = useSpeechRecognition();

    //Update state with speech -> text transcript
    useEffect(() => {
        if (transcript) {
            setState(`${transcript}`);
        }
    }, [transcript, setState]);

    return (
        <div className="mic">
            {!listening ? (
                <FontAwesomeIcon icon={faMicrophone} className="fa-icon"
                                 onClick={() => SpeechRecognition.startListening({continuous: true})}/>
            ) : (
                <FontAwesomeIcon icon={faMicrophone} className="microphone-playing fa-icon"
                                 onClick={SpeechRecognition.stopListening}/>
            )}
        </div>
    )

}
export default AudioButton