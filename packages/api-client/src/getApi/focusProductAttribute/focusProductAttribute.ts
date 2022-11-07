import gql from 'graphql-tag';
import attributeFragment from '../../fragments/attributeFragment';

export default gql`
query focusProductAttribute($attribute_code: String!) {
  focusProductAttribute(attribute_code: $attribute_code) {
    ${attributeFragment}
  }
}`;
