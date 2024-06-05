export default function Item({item, onDeleteItem, onToggleItem}) {
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