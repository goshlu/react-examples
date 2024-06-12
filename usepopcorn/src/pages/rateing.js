import {useState} from "react";
import PropTypes from "prop-types";

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
}

const starContainerStyle = {
    display: 'flex'
}

Rating.propTypes = {
    max: PropTypes.number,
    defaultRate: PropTypes.number,
    messages: PropTypes.array,
    onRating: PropTypes.func
}

export default function Rating({color="#fcc419", size=48, defaultRate = 3,max = 5, messages = [], onRating}) {
    const [rating, setRating] = useState(defaultRate)
    const [tempRating, setTempRating] = useState(0)

    function handleSetRate(rate) {
        setRating(rate)
        onRating(rate)
    }
    return (
        <>
            {
                Array.from({length: max}, (_, i) => {
                    return <Star key={i} full={rating >= i + 1} onRate={() => handleSetRate(i + 1)}
                                 onHoverIn={() => setTempRating(i + 1)} onHoverOut={() => setTempRating(0)}/>
                })
            }
            <p>This movie was rated {movieRating} stars</p>
        </>
    )
}

function Star({full, color, size, onRate, onHoverIn, onHoverOut}) {
    const starStyle = {
        color,
        fontSize: `${size}px`
    }
    return (
        <>
            <span style={starStyle} onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
                {
                    full ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-star-fill" viewBox="0 0 16 16"></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               class="bi bi-star" viewBox="0 0 16 16"></svg>
                }
                </span>
        </>
    )
}