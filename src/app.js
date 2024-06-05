import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packaged: false},
    {id: 2, description: "Socks", quantity: 12, packaged: false},
    {id: 3, description: "Charger", quantity: 1, packaged: true},
];

export default function App() {
    const [items, setItems] = useState(initialItems);
    // const [numItems, setNumItems] = useState(0);

    function handleAddItems(item) {
        setItems(items => [...items, item]);
        // setNumItems(num => num + 1);
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item => item.id === id ? {...item, packaged: !item.packaged} : item));
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
            <Stats items={items}/>
        </div>
    )
}

function Logo() {
    return <h1>Logo</h1>
}

function Form({onAddItems}) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {description, quantity, packaged: false, id: Date.now()};

        console.log(newItem);
        onAddItems(newItem);

        setDescription('');
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your like trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.form({length: 20}, (_, i) => i + 1).map(num => (
                    <option value={num} key={num}>{num}</option>
                ))}
            </select>
            <input type="text" placeholder="Item.." value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <button>Add</button>
        </form>
    )
}

function PackingList({items, onDeleteItem, onToggleItem}) {

    const [sortBy, setSortBy] = useState("input");

    let sortedItems;
    switch (sortBy) {
        case "input":
            sortedItems = items;
            break;
        case "description":
            sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
            break;
        case "packed":
            sortedItems = items.slice().sort((a, b) => Number(a.packaged) - Number(b.packaged));
            break;
        default:
            sortedItems = items;
    }

    return (
        <div className="list">
            <ul>
                {
                    items.map(item => (
                        <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>
                    ))
                }
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
            </div>
        </div>
    )
}

function Item({item, onDeleteItem, onToggleItem}) {
    return (
        <li>
            <input type="checkbox" value={item.packaged} onChange={() => onToggleItem(item.id)}/>
            <span style={item.packaged ? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>删除</button>
        </li>
    )
}

function Stats({items}) {
    if (!items.length) {
        return (
            <p className="stats">
                <em>Start adding some items to your packing list 🚀</em>
            </p>
        )
    }

    const numItems = items.length;
    const numPacked = items.filter(item => item.packaged).length;
    const percentage = numItems === 0 ? 0 : Math.round(numPacked / numItems * 100);

    return (
        <footer className="stats">
            <em>{
                percentage === 100 ? 'You got everything! Ready to go ✈️' : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
            }</em>
        </footer>
    )
}