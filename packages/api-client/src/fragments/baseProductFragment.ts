export default `
__typename
id
uid
sku
manufacturer_sku
name
brand
categories {
  id
  uid
  name
  url_suffix
  url_path
  breadcrumbs {
    category_name,
    category_url_path
  }
}
rating_summary
review_count
reviews {
  items {
    average_rating
    ratings_breakdown {
      name
      value
    }
  }
}
price_range {
  maximum_price {
    final_price {
      currency
      value
    }
    regular_price {
      currency
      value
    }
  }
  minimum_price {
    final_price {
      currency
      value
    }
    regular_price {
      currency
      value
    }
    focus_catalog_rules {
      name
      description
      discount_type
      amount {
        value
        currency
      }
    }
  }
}
thumbnail {
  url
  position
  disabled
  label
}
canonical_url
url_key
url_rewrites {
  url
  parameters {
    name
    value
  }
}
short_description {
  html
}
options_container
special_to_date
non_saleable
coming_soon
badges
model_discontinued
us_expedited
us_oneday
us_twoday
us_standard
`;
