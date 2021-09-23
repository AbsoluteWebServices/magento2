import gql from 'graphql-tag';
import CompareListData from '../../fragments/compareListDataFragment';

export default gql`
  ${CompareListData}

query compareList($uid: ID!) {
  compareList(uid: $uid) {
    ...CompareListData
  }
}`;
