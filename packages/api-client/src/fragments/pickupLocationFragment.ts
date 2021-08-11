import gql from 'graphql-tag';

export default gql`
fragment PickupLocationData on PickupLocation {
  pickup_location_code
  name
  email
  fax
  description
  latitude
  longitude
  country_id
  region_id
  region
  city
  street
  postcode
  phone
}`;
