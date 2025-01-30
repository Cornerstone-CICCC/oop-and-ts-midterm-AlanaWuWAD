import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`).then(response => response.json()).then(data => {
      this.state.products = data
      container.appendChild(this.render())
    }).catch(err => console.error(err))
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

  ////////////////
 

    // 轉換數字評分為星星
    // getStarRating(rate) {
    //     const fullStar = `<i class="fa fa-star"></i>`; // 滿星
    //     const emptyStar = '☆'; // 空星
    //     const maxStars = 5;

    //     const fullStarsCount = Math.floor(rate); // 取得整數部分
    //     const hasHalfStar = rate % 1 !== 0; // 判斷是否有半顆星

    //     let stars = fullStar.repeat(fullStarsCount); // 加入滿星
    //     if (hasHalfStar) stars += '½'; // 加入半顆星（如果需要）
       

    //     return stars;
    // }



}