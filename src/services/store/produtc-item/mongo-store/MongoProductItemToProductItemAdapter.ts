import { MongoProductItemInterface } from './MongoProductItemSchema'
import ProductItem from '../../../../models/ProductItem'
import MongoProductToProductAdapter from '../../product/mongo-store/MongoProductToProductAdapter'
import { MongoProductInterface } from '../../product/mongo-store/MongoProductSchema'

class MongoProductItemToProductItemAdapter {
  public static async make (mongoProductItem: MongoProductItemInterface): Promise<ProductItem> {
    const product = await MongoProductToProductAdapter.make(mongoProductItem.product as MongoProductInterface)

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
