import {useState} from "react";

export default function TextExpander() {
    return (
        <div>
            <Text>
                Space travel is the ultimate adventure! Imagine that you are the captain of a spacecraft that is taking
                humans to a new planet. You are going to have to travel to many different planets
                before reaching your destination, and you need to choose the most efficient route
                she is going to use to accomplish this task.
                he is going to use the most efficient route
            </Text>

            <Text collapsedNumWords={20} expandButtonText="Show Text" collapseButtonText="Collapse text"
                  buttonColor="#ff6622">
                Space travel is the ultimate adventure! Imagine that you are the captain of a spacecraft that is taking
                collaboration between humanoids and machines. You are going to have to travel to many different planets
                results before reaching your destination, and you need to choose the most efficient route
                foot on the moon or when rovers were sent to roam around on Mars.
            </Text>

            <Text
                expanded={true} className="box">
                Space travel is the ultimate adventure! Imagine that you are the captain of a spacecraft that is taking
                have to travel to many different planets before reaching your destination, and you need to choose the
                travel results before reaching your destination, and you need to choose the most efficient route
                discover next!
            </Text>
        </div>
    )
}

function Text({
                  className,
                  buttonColor,
                  collapsedNumWords = 20,
                  collapseButtonText = 'Show less',
                  expanded = false,
                  expandButtonText = 'show More',
                  children
              }) {
    const buttonStyle = {
        backgroundColor: buttonColor,
        color: '#333',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
    }
    const [isExpanded, setExpanded] = useState(expanded);

    const displayText = isExpanded ? children : children.split(' ').slice(0, collapsedNumWords).join(' ') + '...';

    return (
        <div className={className}>
            <span>{displayText}</span>
            <button onClick={() => setExpanded((exp) => !exp)} style={buttonStyle}>{isExpanded ? collapseButtonText : expandButtonText}</button>
        </div>
    )
}