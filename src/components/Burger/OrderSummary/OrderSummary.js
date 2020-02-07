import React from 'react';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(v => (<li key={v}><span style={{textTransform: 'capitalize'}}>{v}</span>: {props.ingredients[v]}</li>));
    return (
        <>
            <h3>Your Order</h3>
            <p>Your burger contains the following ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>continue to checkout</p>

        </>
    )
}

export default orderSummary;