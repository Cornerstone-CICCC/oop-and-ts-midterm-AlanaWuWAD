export class CartContext {
  constructor(){
    this.cart = []
    this.listeners = []
    // this.totalItem = null
  }

  getCart(){
    return this.cart
  }

  addProduct(item){
    const found = this.cart.find(product => product.id === item.id)
    if(found){
        this.cart = this.cart.map(product => {
            if(product.id === item.id){
                return {
                    ...product,
                    quantity: product.quantity +1
                }
            }else {
                return product
            }
        })
    }else {
        this.cart.push({
            ...item,
            quantity: 1
        })
    }
    this.notifyListeners()
  }

  subscribe(listener){
    this.listeners.push(listener)
  }
  notifyListeners(){
    this.listeners.forEach(listener => listener(this.cart))
  }
}