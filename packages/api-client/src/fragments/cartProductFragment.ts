import gql from 'graphql-tag';
import ProductData from './productFragment';
import FreeGiftData from './freeGiftFragment';

export default gql`
  ${ProductData}
  ${FreeGiftData}

  fragment CartProductData on CartItemInterface {
  uid
  product {
    ...ProductData
  }
  mp_free_gifts {
    ...FreeGiftData
  }
  prices {
    row_total {
      value
    }
    row_total_including_tax {
      value
    }
    total_item_discount {
      value
    }
  }
  quantity
}`;
