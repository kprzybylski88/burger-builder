import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.6,
    bacon: 1,
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    addIngredientHandler = (ingredientType) => {
        const ingredientCount = this.state.ingredients[ingredientType] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[ingredientType] = ingredientCount;
        const price = this.state.totalPrice + INGREDIENT_PRICES[ingredientType];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: price
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (ingredientType) => {
        if (this.state.ingredients[ingredientType] <= 0) return;
        const ingredientCount = this.state.ingredients[ingredientType] - 1;
        const price = this.state.totalPrice - INGREDIENT_PRICES[ingredientType];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[ingredientType] = ingredientCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: price
        });
        this.updatePurchaseState(updatedIngredients);
    };
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((a, v) => a + v, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    modalClosedHandler = () => {
        this.setState({purchasing: false})
    } 

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <>
                <Modal modalClosed={this.modalClosedHandler} show={this.state.purchasing} ><OrderSummary ingredients={this.state.ingredients}/></Modal>
                <div>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div>
                    <BuildControls
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} 
                    purchasable = {this.state.purchasable}
                    order={this.purchaseHandler}/>
                </div>
            </>
        );
    }
}