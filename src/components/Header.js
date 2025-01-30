import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const container = document.createElement('nav')
    container.innerHTML = `
    <ul class='nav-items'>
      <li><a href="#Women">Women</a></li>
      <li><a href="#Men">Men</a></li>
      <li><a href="#Electronics">Electronics</a></li>
      <li><a href="#Jewelry">Jewelry</a></li>
      <div class='search'>
      <input type="text"><button class='search-btn'><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <i class="fa-sharp-duotone fa-solid fa-cart-shopping"></i>
    </ul>
    `

    return container
  }
}

