import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
mutation applyGiftCardToCart($input: ApplyGiftCardToCartInput) {
  applyGiftCardToCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
