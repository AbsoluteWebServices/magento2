import gql from 'graphql-tag';
import attributeFragment from '../../fragments/attributeFragment';

export default gql`
query focusProductAttributes($attribute_codes: [String!]!) {
  focusProductAttributes(attribute_codes: $attribute_codes) {
    ${attributeFragment}
  }
}`;
