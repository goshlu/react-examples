import {useState} from "react";

const messages = [
    'Step 1: Select the bread type',
    'Step 2: Select the bread type',
    'Step 3: Add your desired toppings',
]

function Steps () {
    const [step, setStep] = useState(1)
    const [isOpen, setIsOpen] = useState(false)

    function handlePrevious() {
        if(step > 1) {
            setStep((s) => s - 1)
        }
    }

    function handleNext() {
        if(step < 3) {
            setStep((s) => s + 1)
        }
    }

    return (

        <div className="steps">
            <button className="close" onClick={() => setIsOpen((is) => !is)}>
                &times;
            </button>

            {
                isOpen && (
                    <div className="steps">
                        <div className="numbers">
                            <div className={step >= 1 ? "active" : ""}>1</div>
                            <div className={step >= 2 ? "active" : ""}>2</div>
                            <div className={step >= 3 ? "active" : ""}>3</div>
                        </div>

                        {/*<p className="message">*/}
                        {/*    Step {step} {messages[step - 1]}*/}
                        {/*    /!*    {test.name}*!/*/}
                        {/*</p>*/}
                        <StepMessage step={step}>{
                            messages[step - 1]
                        }</StepMessage>

                        <div className="buttons">
                            <Button bgColor="#333" textColor="#fff" onClick={handlePrevious}>
                                <span>👈</span> Previous
                            </Button>
                            <Button bgColor="7950f2" textColor="#fff" onClick={handleNext}>
                                Next <span>👉</span>
                            </Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

function StepMessage({ step, children}: {step: number, children: any}) {
    return (
        <div className="message">
            <h3>Step {step}</h3>
            {children}
        </div>
    )
}

function Button({textColor, bgColor, onClick, children}:{textColor: string, bgColor: string,onClick: () => void, children: any}) {
    return (
        <button
            style={{backgroundColor: bgColor, color: textColor}}
            onClick={onClick}
        >
            {children}
        </button>

    )
}

export default Steps;