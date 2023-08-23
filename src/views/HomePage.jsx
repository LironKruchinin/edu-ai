import React, { useEffect, useRef, useState } from "react";

import ballGif from '../assets/images/main.gif';
import ballGif2 from '../assets/images/main2.gif';
import { ChatSelector } from "../cmps/ChatSelector";

export function HomePage() {
    const scrollRef = useRef(null);
    const [location, setLocation] = useState(null)

    useEffect(() => {
        handleLocation()
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
        }

        window.addEventListener('beforeunload', handlePageRefresh);

        return () => {
            window.removeEventListener('beforeunload', handlePageRefresh);
        }
    }, [])

    function handleLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getUserCoords, failGeolocation)
        } else {
            console.log('Geolocation not supported');
        }
    }

    function getUserCoords(position) {
        console.log(position);
    }

    function failGeolocation() {
        console.log("Unable to retrieve your location");
    }

    function handleClick() {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

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
