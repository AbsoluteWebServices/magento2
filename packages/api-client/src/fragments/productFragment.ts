import freeGiftRuleFragment from "./freeGiftRuleFragment";

export default `
__typename
id
uid
sku
manufacturer_sku
name
stock_status
only_x_left_in_stock
rating_summary
media_gallery {
  url
  position
  disabled
  label
}
thumbnail {
  url
  position
  disabled
  label
}
url_key
url_rewrites {
  url
  parameters {
    name
    value
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
  }
}
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
short_description {
  html
}
brand
...on ConfigurableProduct {
  configurable_options {
    attribute_code
    attribute_uid
    label
    position
    uid
    use_default
    values {
      label
      swatch_data {
        value
      }
      uid
    }
  }
}
... on BundleProduct {
  items {
    sku
    title
    options {
      uid
      quantity
      product {
        uid
        sku
        name
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
          }
        }
      }
    }
  }
}
free_gift_data {
  ${freeGiftRuleFragment}
}
`;
