import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.props.product)
  }

  render() {
    const productTitleLength = this.props.product.title.length

    const product = document.createElement('div')
    product.className = "product-item"
    if (productTitleLength > 20) {
      product.innerHTML = `
      <div class='item-img-container'>
      <img class='item-img' src=${this.props.product.image} alt=${this.props.product.id}>
      </div>
      <h3>${this.props.product.title.substring(0,20)}</h3><span class='tooltip-text'>${this.props.product.title}</span>
      <p>$ ${parseFloat(this.props.product.price).toFixed(2)}</p> 
    
      <button class='add-cart-btn'>Add to Cart</button>
      `
    }else{
      product.innerHTML = `
      <div class='item-img-container'>
      <img class='item-img' src=${this.props.product.image} alt=${this.props.product.id}></div>
      <h3>${this.props.product.title}</h3><span class='tooltip-text'>${this.props.product.title}</span>
      <p>$ ${parseFloat(this.props.product.price).toFixed(2)}</p> 
    
      <button class='add-cart-btn'>Add to Cart</button>
      `
    }
    product.querySelector(`.add-cart-btn`).addEventListener('click', this.handleAddToCart)

    return product
  }
}