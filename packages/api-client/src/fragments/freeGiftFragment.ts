import gql from 'graphql-tag';

export default gql`
fragment FreeGiftData on FreeGiftItem {
  is_free_gift
  rule_id
  free_gift_message
  allow_notice
}`;
