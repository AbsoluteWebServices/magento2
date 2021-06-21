import gql from 'graphql-tag';
import CartPricesData from './cartPricesFragment';
import CartProductData from './cartProductFragment';

export default gql`
${CartPricesData}
${CartProductData}

fragment CartData on Cart {
    id
    applied_coupons {
        code
    }
    prices {
      ...CartPricesData
    }
    items {
        ...CartProductData
    }
    total_quantity
}`;
