import {useState} from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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

    function handleClearList() {
        const confirmed = window.confirm('Are you sure you want to clear the list?');
        if (confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
            <Stats items={items}/>
        </div>
    )
}





