import React, {useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

const Dictaphone = ({setState}) => {
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
                <button
                    onClick={() =>
                        SpeechRecognition.startListening({continuous: true})
                    }>
                    Speak
                </button>
            ) : (
                <button
                    className="listening"
                    onClick={SpeechRecognition.stopListening}>
                    Stop
                </button>
            )}
        </div>
    )

}
export default Dictaphone