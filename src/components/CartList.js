import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = { cart: [] }
    this.updateCart = this.updateCart.bind(this)
    this.props.cartContext.subscribe(this.updateCart)
    this.productListElement = null
    this.productTotalElement = null

  }

  updateCart(cart) {
    // this.props.cartContext.totalItem = 0
    let totalPrice = 0;
    this.state.cart = cart;
    this.productListElement.innerHTML = ``;

    const cartItem = this.state.cart.map((item, index) => {
      // this.props.cartContext.totalItem += item.quantity 
      
      totalPrice += item.price * item.quantity;

      return `
        <li>
            <i class="fa-solid fa-bag-shopping"></i>
            ${item.title} - $${item.price} 
            <strong> x ${item.quantity}</strong>
            <button class="add-btn" data-index="${index}"> + </button>
            <button class="delete-btn" data-index="${index}"> - </button>
        </li>
        `;
    }).join('');
    
    this.productListElement.innerHTML = cartItem;
    this.productTotalElement.innerHTML = `<div>Total Price: $ ${totalPrice.toFixed(2)}</div>`;

    // monitor「+ btn
    document.querySelectorAll('.add-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        this.state.cart[index].quantity += 1;
        this.updateCart(this.state.cart);
      });
    });

    // monitor「-」btn
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (this.state.cart[index].quantity > 1) {
          this.state.cart[index].quantity -= 1;
        } else {
          this.state.cart.splice(index, 1); // delete item as quantity = 0
        }
        this.updateCart(this.state.cart);
      });
    });
  }


  render() {
    const carteElement = document.createElement('div')
    carteElement.className = 'purchased-list'
    carteElement.innerHTML = `
      <h3><i class="fa-solid fa-heart"></i> Favorites </h3>
      <ul class='cart-list'></ul>
      <hr><div id="total"></div>
    `

    this.productListElement = carteElement.querySelector('.cart-list')

    this.productTotalElement = carteElement.querySelector('#total')


    return carteElement
  }
}