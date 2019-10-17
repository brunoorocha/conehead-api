import { MongoProductItemInterface } from './MongoProductItemSchema'
import ProductItem from '../../../../models/ProductItem'
import MongoProductToProductAdapter from '../../product/mongo-store/MongoProductToProductAdapter'
import { MongoProductInterface } from '../../product/mongo-store/MongoProductSchema'
import Product from '../../../../models/Product'

class MongoProductItemToProductItemAdapter {
  public static async make (mongoProductItem: MongoProductItemInterface): Promise<ProductItem> {
    let product: Product

    if ((mongoProductItem.product as MongoProductInterface).name) {
      product = await MongoProductToProductAdapter.make(mongoProductItem.product as MongoProductInterface)
    } else {
      product = new Product((mongoProductItem.product as string), undefined, undefined, undefined)
    }

    const productItem = new ProductItem(
      mongoProductItem._id,
      mongoProductItem.quantity,
      mongoProductItem.price,
      mongoProductItem.expiration,
      mongoProductItem.createdAt,
      product
    )

    return productItem
  }
}

export default MongoProductItemToProductItemAdapter
