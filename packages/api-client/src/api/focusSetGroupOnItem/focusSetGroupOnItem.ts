import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}

mutation focusSetGroupOnItem($input: focusSetGroupOnItemInput) {
  focusSetGroupOnItem(input: $input) {
    ...CompleteCartData
  }
}`;
