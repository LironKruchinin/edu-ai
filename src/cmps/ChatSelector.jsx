import { useNavigate } from 'react-router-dom'
import image3 from '../assets/images/aritmatic.svg'
import image1 from '../assets/images/book.svg'
import image4 from '../assets/images/computer.svg'
import image2 from '../assets/images/globe.svg'
import image5 from '../assets/images/light.svg'
import image6 from '../assets/images/paper.svg'
import { chatOptions } from "../services/chat.service.ts"

export function ChatSelector() {
    const navigate = useNavigate()

    function getImageSource(index) {
        switch (index) {
            case 1:
                return image1
            case 2:
                return image2
            case 3:
                return image3
            case 4:
                return image4
            case 5:
                return image5
            case 6:
                return image6
            default:
                return image2
        }
    }

    function setPath(option) {
        navigate(`/chat?identify=${option.btnText}`)
    }

    return (
        <div className="chat-selector">
            <h2>QUICK TOOLS</h2>

            <div className="btns">
                {chatOptions?.map((option, index) => {
                    if (index >= 0 && index <= 2) {
                        return (
                            <div key={index} className="image-button top">
                                <div className="img-container">
                                    <img src={getImageSource(index + 1)} alt={option.imageAlt} />
                                </div>
                                <button key={index} onClick={() => setPath(option)}>{option.btnText}</button>
                            </div>
                        )
                    }
                    if (index >= 3 && index <= 5) {
                        return (
                            <div key={index} className="image-button">
                                <button key={index} onClick={() => setPath(option)}>{option.btnText}</button>
                                <div className="img-container">
                                    <img src={getImageSource(index + 1)} alt={option.imageAlt} />
                                </div>
                            </div>
                        )
                    } else {
                        return <button key={index} onClick={() => setPath(option)}>{option.btnText}</button>
                    }
                })}
            </div>
        </div>
    )
}
