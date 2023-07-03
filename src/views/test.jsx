import React, { useState } from "react";
import { chatOptions } from '../services/chat.service.js'
import { messageGPT } from "../services/api.js";

export function ChatPage() {
    const [textData, setTextData] = useState({ input: '', placeHolder: '', inputPlaceHolder: '' });
    const [responses, setResponses] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    function handleInput(ev) {
        ev.preventDefault()
        const field = ev.target.name
        const value = ev.target.value
        setTextData({ ...textData, [field]: value })
    }

    async function onSubmit(ev) {
        setTextData({ input: '', placeHolder: '', inputPlaceHolder: '' })
        ev.preventDefault()
        if (textData.input < 1) return
        const message = textData.placeHolder + ' ' + textData.input
        if (!textData.placeHolder) setResponses(prevState => ([...prevState, { msgOrigin: 'user', message: `${textData.input}` }]))
        else setResponses(prevState => ([...prevState, { msgOrigin: 'user', message }]))
        try {
            setIsLoading(true)
            if (!isLoading) {
                const res = await messageGPT(message);
                const codeBlock = res.split('```');

                const codeBlocksInTags = codeBlock.map((block, index) => {
                    if (index % 2 === 1) {
                        // Wrap the code block in a <code> tag
                        return <code key={index}>{block}</code>;
                    } else {
                        // Return the block as it is (outside code tags)
                        return block;
                    }
                });


                setResponses(prevState => ([
                    ...prevState,
                    { msgOrigin: 'GPT', message: codeBlocksInTags } // Use the updated codeBlocksInTags
                ]));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }

    function clickBtn(option) {
        setTextData({ placeHolder: option.inputText, inputPlaceHolder: option.placeholderText })
    }

    return (
        <div className="chat-container">
            <div className="text-box">
                <div className="response">
                    <pre>
                        {responses?.map((response, idx) => {
                            return (
                                <div key={idx} className={"msg" + ' ' + response.msgOrigin}>
                                    <div className="msg-origin">
                                        {response.msgOrigin === 'GPT' && <img src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg" />}
                                        {response.msgOrigin === 'user' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png" />}
                                    </div>
                                    <div className="msg-data">
                                        {response.message}
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && <h2>Loading...</h2>}
                    </pre>
                </div>

                <div className="options">
                    {chatOptions.map(option => {
                        return <button key={option.btnText} onClick={() => clickBtn(option)}>{option.btnText}</button>
                    })}
                </div>

                <div className="chat-box">
                    <form onSubmit={onSubmit}>
                        <div className="text-container">{textData.placeHolder}</div>
                        <input type="text" onChange={handleInput} name="input" value={textData.input} placeholder={textData.inputPlaceHolder} />
                        <button>send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}