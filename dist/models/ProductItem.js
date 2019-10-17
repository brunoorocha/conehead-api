"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

class ProductItem {
  
  
  
  
  
  

   constructor (id, quantity, price, expiration, createdAt, product) {
    this.id = id
    this.quantity = quantity
    this.price = price
    this.expiration = expiration
    this.createdAt = createdAt
    this.product = product
  }
}

exports. default = ProductItem
