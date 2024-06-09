import './App.css'
import {useState} from "react";

const faqs = [
    {
        title: 'Where are these chairs assembled?',
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus. Deleniti laborum, perspiciatis labore dolorum similiquequos voluptas accusamusaeda non ad at quo digniss"
    },
    {
        title: 'How long do I have to return my chair?',
        text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
    },
    {
        title: 'Do you ship to countries outside the EU?',
        text: 'Excepturi velit laborum, perspiciatis natus soluta enim blanditiis asperiores sapiente, veniam officiis pariatur doloribus a sint adipisci tenetur. Cum, voluptatibus.'
    }
]

function App() {
    return (
        <div>
            <Accordion data={faqs} />
        </div>
    )

}

function Accordion({data}) {
    return <div className="accordion">
        {data.map((el,i) => <AccordionItem title={el.title} text={el.text} num={i} key={i} />)}
    </div>
}

function AccordionItem({num,title,text}) {
    const [isOpen, setIsOpen] = useState(false)

    function handleToggle() {
        setIsOpen(isOpen => !isOpen)
    }

    return (
        <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
            <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
            <p className="title">{title}</p>
            <p className='icon'>{isOpen ? '-' : '+'}</p>
            {isOpen && <div className='content-box'>{text}</div>}
        </div>
    )
}

export default App
