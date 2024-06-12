import {MouseEventHandler, useState} from "react";

export default function Cacalculator () {
    return (
        <div>
            <TipCalculator />
        </div>
    )

}

function TipCalculator () {
    const [bill, setBill] = useState("");
    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);

    const tip = Number(bill) * ((percentage1 + percentage2) / 2 / 100);

    function handleReset () {
        setBill("");
        setPercentage1(0);
        setPercentage2(0);
    }

    return (
        <div>
            <BillInput bill={bill} onSetBill={setBill}/>
            <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>How did you like service?</SelectPercentage>
            <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>How did your friend like service?</SelectPercentage>
            {Number(bill) > 0 && <>
                <Output bill={bill} tip={tip} />
                <Reset  onReset={handleReset}/>
            </>
            }
        </div>
    )
}

function BillInput ({bill, onSetBill}:{bill:string,onSetBill:Function}) {
    return (
        <div>
            <label>How much was the bill?</label>
            <input type="text" placeholder="Bill value" value={bill} onChange={e => onSetBill(Number(e.target.value))} />
        </div>
    )
}

function SelectPercentage ({percentage,onSelect,children}:{percentage:number,onSelect:Function,children:string}) {
    return (
        <div>
            <label>{children}</label>
            <select value={percentage} onChange={e => onSelect(Number(e.target.value))}>
                <option value="0">Dissatisfied (0%)</option>
                <option value="1">It was okay(5%)</option>
                <option value="2">It was good (10%)</option>
                <option value="3">Absolutly amazing (20%)</option>
            </select>
        </div>
    )
}

function Output ({bill,tip}:{bill:string,tip:number}) {
    return (
        <h3>You pay ${bill + tip}  (${bill} + ${tip} tip)</h3>
    )
}

function Reset ({onReset}: {onReset:MouseEventHandler}) {
    return (
        <button onClick={onReset}>Reset</button>
    )
}