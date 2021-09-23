import gql from 'graphql-tag';
import CompareListData from '../../fragments/compareListDataFragment';

export default gql`
  ${CompareListData}

mutation assignCompareListToCustomer($uid: ID!) {
  assignCompareListToCustomer(uid: $uid) {
    result
    compare_list {
      ...CompareListData
    }
  }
}`;
