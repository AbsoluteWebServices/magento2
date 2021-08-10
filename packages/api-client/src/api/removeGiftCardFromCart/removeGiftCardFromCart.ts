import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}

mutation removeGiftCardFromCart($input: RemoveGiftCardFromCartInput) {
  removeGiftCardFromCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
