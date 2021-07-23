import gql from 'graphql-tag';

export default gql`fragment CategoryData on CategoryTree {
  image
  include_in_menu
  is_anchor
  level
  name
  position
  product_count
  uid
  id
  display_mode
  meta_title
  meta_description
  meta_keywords
  breadcrumbs {
    category_uid
    category_name
    category_level
    category_url_key
    category_url_path
  }
}`;
