import React ,{useState} from 'react'
import './Card.css'

function Card({ title, price, stock }) {
let [instock, setinStock] = useState(stock);
    function handleClick() {
            setinStock(--instock);
            // console.log(`You have added ${title} to your cart. Remaining stock: ${instock}`);
        }
    if (title === undefined) {
        console.error('Please add title for the card');
    }
    else if (typeof title !== 'string') {
        console.error('Title must be a string');
    }
    if (typeof price !== 'number') {
        console.error('Price must be a number');
    }
    if (typeof stock !== 'number') {
        console.error('Stock must be a number');
    }
    return (
        <div className='Card'>
            <h1>{title}</h1>
            <p className='price'>${price}</p>
            <p className='price'>In Stock {instock} </p>
            <p>
                <button onClick={handleClick}> Add to card</button>
            </p>
        </div>
    )
}

export default Card