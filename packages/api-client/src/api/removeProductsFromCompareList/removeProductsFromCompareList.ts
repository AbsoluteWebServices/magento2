import gql from 'graphql-tag';
import CompareListData from '../../fragments/compareListDataFragment';

export default gql`
  ${CompareListData}

mutation removeProductsFromCompareList($input: RemoveProductsFromCompareListInput) {
  removeProductsFromCompareList(input: $input) {
    ...CompareListData
  }
}`;
