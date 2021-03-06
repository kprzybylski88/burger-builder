import React from 'react';
import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Chesse', type: 'cheese' }
];

const buildControls = (props) => {

    

    return(
        <div className={classes.BuildControls}>
            <p>Current Price ${props.price.toFixed(2)}</p>
            {controls.map(ctrl => <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} 
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]} />)}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.order}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;
