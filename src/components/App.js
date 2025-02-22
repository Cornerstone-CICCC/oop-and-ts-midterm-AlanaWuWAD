import { Component } from "../common/Component.js";
import { CartList } from "./CartList.js";
import { ProductList } from "./ProductList.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement('div')
    appContainer.className = 'container'
    appContainer.innerHTML = `
      <header></header>
      <aside></aside>
      <div class='search-results'></div>
      <div class='wrapper'>
        <main>
          <h1> Beauty Shop</h1>
          <div class='main-title'>
          <p id='new-year'>New Year 2025</p>
          <p>Best Shopping</p>
          </div>
          <div class='featured'>
          <h2 class='featured-products'>Featured Products</h2>
          <img class='partial-line' src="../img/gift.png" alt="">
          </div>
        </main>
        
      </div>
      <footer></footer>  
    `
    const cartContext = this.props.cartContext
    const header = new Header({cartContext})
    appContainer.querySelector('header').appendChild(header.render())

    const footer = new Footer()
    appContainer.querySelector('footer').appendChild(footer.render())
   
    const cart = new CartList({
      cartContext
    }).render()
    const productList = new ProductList({
      cartContext,appContainer
    })

    appContainer.querySelector('aside').appendChild(cart)

    appContainer.querySelector('.fa-sharp-duotone').addEventListener('click',(e)=>{
      e.stopPropagation()
      appContainer.querySelector('.purchased-list')
      .classList.toggle('open')
    })

    productList.mount(appContainer.querySelector('main'))

    return appContainer
  }
}
