import React, { useEffect, useRef } from "react";

import ballGif from '../assets/images/main.gif';
import ballGif2 from '../assets/images/main2.gif';
import { ChatSelector } from "../cmps/ChatSelector";

export function HomePage() {
    const scrollRef = useRef(null);

    function handleClick() {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
        }

        window.addEventListener('beforeunload', handlePageRefresh);

        return () => {
            window.removeEventListener('beforeunload', handlePageRefresh);
        }
    }, [])

    const handlePageRefresh = () => {
        localStorage.setItem('scrollPosition', window.pageYOffset.toString());
    }

    return (
        <>
            <div className="main">
                <section className="home-page">
                    <div className="text">
                        <h1><span>Education</span> A.I</h1>
                        <div>
                            <span>The smart toolbox for students.</span>
                            <span>Any language is possible.</span>
                        </div>
                        <button onClick={handleClick}>LETS START</button>
                    </div>
                    <div className="images">
                        <div>
                            <img src={ballGif} alt="a weird ball gif" />
                        </div>
                        <div>
                            <img src={ballGif2} alt="a weird ball gif" />
                        </div>
                    </div>

                </section>
                <section className="choices" ref={scrollRef}>
                    <ChatSelector />
                </section>
            </div>
        </>
    )
}
