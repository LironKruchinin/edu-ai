import React, { useEffect, useState } from "react";
import { chatOptions } from '../services/chat.service.js';

import { AiOutlineSend } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import personLogo from '../assets/images/man.svg';
import balls from '../assets/images/small.gif';
import { apiPostRequest, messageGPT } from "../services/api.js";
import LoadingSpinner from "../cmps/LoadingSpinner.jsx";

export function ChatPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [textInput, setTextInput] = useState({ textInput: '' })
    const [chatHistory, setChatHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [chatData, setChatData] = useState({
        btnText: '',
        imageAlt: '',
        headlineText: '',
        inputText: '',
        placeholderText: ''
    })

    useEffect(() => {
        getChatPageData()

        return () => {

        }
    }, [])

    useEffect(() => {
        console.log(chatHistory);
    }, [chatHistory])

    function getChatPageData() {
        const chatIdentifier = searchParams.get('identify')
        const chatData = chatOptions.find(chat => chatIdentifier === chat.btnText)
        setChatData(chatData)
    }

    function handleInput(ev) {
        ev.preventDefault()
        const field = ev.target.name
        const value = ev.target.value
        setTextInput({ ...textInput, [field]: value })
    }

    async function sendInput(ev) {
        ev.preventDefault()
        setTextInput({ textInput: '' })
        if (textInput.textInput.length < 1) return
        let inputMsg = chatData.inputText + ': ' + textInput.textInput
        setChatHistory(prevState => (
            [...prevState, { msgOrigin: 'user', message: inputMsg }]))

        try {
            setIsLoading(true)
            if (isLoading) return
            const res = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_KEY}/api`, { requestString: inputMsg })
            const codeBlock = res.split('```')

            const codeBlocksInTags = codeBlock.map((block, index) => {
                if (index % 2 === 1) {
                    // Wrap the code block in a <code> tag
                    return <div key={index} className="code-block"><div className="header-code-block"></div><code>{block}</code></div>
                } else {
                    // Return the block as it is (outside code tags)
                    return block
                }
            })

            setChatHistory(prevState => (
                [...prevState, { msgOrigin: 'GPT', message: codeBlocksInTags }
                ]))
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }


    return (
        <>
            <div className="chat-page">
                <div className="chat-top">
                    <div className="img">
                        <img src={balls} alt="" />
                    </div>
                    <div>
                        <h2>{chatData?.btnText}</h2>
                        <div className="second-header">
                            <span>{chatData?.headlineText}</span>
                        </div>
                    </div>

                    <button onClick={() => navigate('/')}><IoIosArrowBack /></button>
                </div>

                <div className="chatbox-container">
                    <span>{chatData?.inputText + ': '}</span>
                    <form className="chatbox-form" onSubmit={sendInput}>
                        <input
                            type="text"
                            onChange={handleInput}
                            placeholder={chatData?.placeholderText}
                            value={textInput.textInput}
                            name="textInput"
                        />
                        <button>
                            <AiOutlineSend className="icon" />
                        </button>
                    </form>
                </div>
                <div className="response">
                    {chatHistory.map((msg, index) => {
                        return (
                            <div key={index} className={'message' + ' ' + ((msg.msgOrigin === 'user') ? 'user' : '')}>
                                <div className="author-picture">
                                    {msg.msgOrigin === 'GPT' && <img src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg" />}
                                    {msg.msgOrigin === 'user' && <img src={personLogo} />}
                                </div>
                                <pre className="msg-content">{msg.message}</pre>
                            </div>
                        )
                    })}
                    {isLoading && <LoadingSpinner />}

                </div>
            </div>
        </>
    );
}
