import gql from 'graphql-tag';
import PickupLocationData from '../../fragments/pickupLocationFragment';

export default gql`
${PickupLocationData}
query pickupLocations(
  $area: AreaInput,
  $filters: PickupLocationFilterInput,
  $sort: PickupLocationSortInput,
  $pageSize: Int = 20,
  $currentPage: Int = 1,
  $productsInfo: [ProductInfoInput]
  ) {
  pickupLocations(
    area: $area,
    filters: $filters,
    sort: $sort,
    pageSize: $pageSize,
    currentPage: $currentPage,
    productsInfo: $productsInfo
  ) {
    items {
      ...PickupLocationData
    }
  }
}`;
