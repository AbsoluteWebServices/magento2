import gql from 'graphql-tag';
import CompareListData from '../../fragments/compareListDataFragment';

export default gql`
  ${CompareListData}

query customerCompareList {
  customer {
    compare_list {
      ...CompareListData
    }
  }
}`;
