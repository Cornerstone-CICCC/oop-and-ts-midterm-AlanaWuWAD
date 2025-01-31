import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const container = document.createElement('div')
    container.innerHTML = `
    <div class='contact'>
    <h4>Contact Us</h4>
    <p>886-0806449</p>
    <p>contactus@dontbesilly.com</p>
    <p>310125 Oopdom Ave. Indivisualproject city, BC. Canada</p>
    <hr>
    <p class='copy-right'>&copy; All rights reserved. Alana Wu Jan.2025</p>
    </div>
    `
    return container
  }
}