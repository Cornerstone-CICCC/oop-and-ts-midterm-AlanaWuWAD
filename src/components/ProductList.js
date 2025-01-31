import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
    this.filteredProucts = []
  console.log(props)

  }
  mount(container) {
    fetch(`https://fakestoreapi.com/products`).then(response => response.json()).then(data => {
      this.state.products = data
      container.appendChild(this.render())
    }).catch(err => console.error(err))

    //search product
    this.props.appContainer.querySelector('.search-btn').addEventListener('click', () => {
      searchWindow.classList.remove('hide')
      this.searchProduct()
      
    })

    const searchWindow = this.props.appContainer.querySelector('.search-results')
    searchWindow.addEventListener('click', () => {
      searchWindow.classList.add('hide')
      this.props.appContainer.querySelector('input').value = ``
    })
  }

  searchProduct() {
    const searchTerm = this.props.appContainer.querySelector('input').value.toLocaleLowerCase()

    console.log(this.state.products)

    this.filteredProucts = this.state.products.filter(product => product.title.toLocaleLowerCase().includes(searchTerm) || product.description.toLocaleLowerCase().includes(searchTerm))

    this.updateSearchResults()
  }

  updateSearchResults(){
    const searchResults = this.props.appContainer.querySelector('.search-results')
    searchResults.innerHTML = ``

    if(this.filteredProucts.length === 0){
      searchResults.innerHTML = `<p>No results found</p>`
    }else{
      this.filteredProucts.forEach(product => {
        const productItem = document.createElement('div')

        productItem.className = 'search-results-item'
        productItem.innerHTML = `<img class='search-item-img' src=${product.image} alt=${product.id}> <h3> ${product.title} - <span class='search-item-price'>$ ${product.price}</span></h3> `

        searchResults.appendChild(productItem)
      })
    }
    searchResults.style.display = 'block'
  }

  render() {
    const productList = document.createElement('div')
    productList.className = 'product-list'

    const categoryNameMapping = {
      "men's clothing": "Men",
      "women's clothing": "Women",
      "jewelery": "Jewelry",
      "electronics": "Electronics"
    }
    // Helper function to create a category block
    const createCategoryBlock = (categoryName) => {
      const categoryBlock = document.createElement('div')
      categoryBlock.className = 'category-block'

      const categoryTitle = document.createElement('h2')
      categoryTitle.className = 'category-name'
      const mappedName = categoryNameMapping[categoryName] || categoryName
      categoryTitle.textContent = mappedName
      categoryTitle.id = mappedName
      categoryBlock.appendChild(categoryTitle)


      const productItemsContainer = document.createElement('div')
      productItemsContainer.className = 'product-items-container'
      this.state.products.filter(product => product.category === categoryName)
        .forEach(product => {
          const productItem = new ProductItem({
            product,
            cartContext: this.props.cartContext
          }).render()
          productItemsContainer.appendChild(productItem)
        })
      categoryBlock.appendChild(productItemsContainer)

      return categoryBlock
    }

    // Create blocks for each category
    const menCategoryBlock = createCategoryBlock("men's clothing")
    const womenCategoryBlock = createCategoryBlock("women's clothing")
    const jewelryCategoryBlock = createCategoryBlock("jewelery")
    const electronicsCategoryBlock = createCategoryBlock("electronics")

    // Append the category blocks to the main product list
    productList.appendChild(menCategoryBlock)
    productList.appendChild(womenCategoryBlock)
    productList.appendChild(jewelryCategoryBlock)
    productList.appendChild(electronicsCategoryBlock)

    // Append the product list to the DOM or return it
    return productList
  }

}