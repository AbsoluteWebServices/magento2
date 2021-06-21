import gql from 'graphql-tag';

export default gql`
fragment CartPricesData on CartPrices {
  subtotal_excluding_tax {
    value
  }
  subtotal_including_tax {
    value
  }
  applied_taxes {
    amount {
      value
    }
    label
  }
  discounts {
    amount {
      value
    }
    label
  }
  grand_total {
    value
  }
}`;
