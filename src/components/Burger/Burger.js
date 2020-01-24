import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, index) => <BurgerIngredient key={`${igKey}${index}`} type={igKey} />);
        }).flat();
    if (ingredientsArray.length === 0) ingredientsArray = <p>Please start adding ingredients</p>
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;
