import gql from 'graphql-tag';
import CompareListData from '../../fragments/compareListDataFragment';

export default gql`
  ${CompareListData}

mutation addProductsToCompareList($input: AddProductsToCompareListInput) {
  addProductsToCompareList(input: $input) {
    ...CompareListData
  }
}`;
