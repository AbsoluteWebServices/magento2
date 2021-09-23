import gql from 'graphql-tag';
import CompareListData from '../../fragments/compareListDataFragment';

export default gql`
  ${CompareListData}

mutation createCompareList($input: CreateCompareListInput) {
  createCompareList(input: $input) {
    ...CompareListData
  }
}`;
