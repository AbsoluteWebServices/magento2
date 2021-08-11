import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}

mutation focusUpdateCartGroup($input: focusUpdateCartGroupInput) {
  focusUpdateCartGroup(input: $input) {
    ...CompleteCartData
  }
}`;
