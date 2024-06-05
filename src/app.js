import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packaged: false},
    {id: 2, description: "Socks", quantity: 12, packaged: false},
    {id: 3, description: "Charger", quantity: 1, packaged: true},
];

export default function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItems(item) {
        setItems(items => [...items, item]);
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
            <Stats/>
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
    return (
        <div className="list">
            <ul>
                {
                    items.map(item => (
                        <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>
                    ))
                }
            </ul>
        </div>
    )
}

function Item({item, onDeleteItem, onToggleItem}) {
    return (
        <li>
            <input type="checkbox" value={item.packaged} onChange={() => onDeleteItem(item.id)}/>
            <span style={item.packaged ? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>删除</button>
        </li>
    )
}

function Stats() {
    return (
        <footer className="stats">
            <em>You have X items on your list,and you already packed X (X%)</em>
        </footer>
    )
}