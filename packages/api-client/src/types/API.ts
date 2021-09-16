import { ApolloQueryResult } from 'apollo-client';
import { ExecutionResult } from 'graphql';
import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import {
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AppliedCoupon,
  AppliedGiftCard,
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  ApplyGiftCardToCartInput,
  ApplyGiftCardToCartMutation,
  AvailableShippingMethod,
  BundleProduct,
  Cart as CartInterface,
  CartItemInterface,
  CartQueryFocus,
  CategoryQueryFocus,
  CategoryFilterInput,
  CategoryListQueryFocus,
  CategoryListQueryVariables,
  CategorySearchQueryFocus,
  CategorySearchQueryVariables,
  CategoryTree,
  CmsPage,
  CmsPageQueryFocus,
  ConfigurableProduct,
  ConfigurableProductDetailQueryFocus,
  CountriesListQueryFocus,
  CountryInformationQueryFocus,
  CreateCustomerAddressMutation,
  CustomerAddress as CustomerAddressInterface,
  CustomerAddressInput,
  CustomerAvailablePaymentMethodsQueryFocus,
  CustomerAvailableShippingMethodsQueryFocus,
  CustomerCartQueryFocus,
  CustomerCreateInput,
  CustomerDataFragment as CustomerFragment,
  CustomerOrder as CustomerOrderInterface,
  CustomerOrdersQueryFocus,
  CustomerOrdersQueryVariables,
  CustomerQueryFocus,
  CustomerUpdateInput,
  DeleteCustomerAddressMutation,
  GenerateCustomerTokenMutation,
  GuestAvailablePaymentMethodsQueryFocus,
  GuestAvailableShippingMethodsQueryFocus,
  MergeCartsMutation,
  Order as OrderInterface,
  PickupLocationsQueryFocus,
  PlaceOrderInput,
  PlaceOrderMutation,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQueryFocus,
  ProductsFiltersQueryFocus,
  ProductInterface,
  ProductReviewQueryFocus,
  ProductReviewRatingsMetadataQueryFocus,
  ProductsListQueryFocus,
  QueryPickupLocationsArgs,
  RelatedProductQueryFocus,
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveGiftCardFromCartInput,
  RemoveGiftCardFromCartMutation,
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RevokeCustomerTokenMutation,
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetGuestEmailOnCartInput,
  SetGuestEmailOnCartMutation,
  SetPaymentMethodOnCartMutation,
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutationFocus,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutationFocus,
  ShippingCartAddress,
  StoreConfigQueryFocus,
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCustomerAddressMutation,
  UpsellProductsQueryFocus,
  UrlResolverQueryFocus,
  WishlistItemInterface,
  WishlistQueryFocus,
  WishlistQueryVariables,
  CreateProductReviewInput,
  CreateEmptyCartMutation,
  CreateProductReviewMutation,
  CustomerProductReviewQueryFocus,
  SubscribeEmailToNewsletterMutationVariables,
  SubscribeEmailToNewsletterMutation,
  UpdateCustomerMutation,
  CreateCustomerMutation,
  AddProductsToWishlistMutationVariables,
  AddProductsToWishlistMutation,
  WishlistDataFragment,
  UpdateCustomerEmailMutationVariables,
  RemoveProductsFromWishlistMutationVariables,
  RemoveProductsFromWishlistMutation,
  GetCustomerAddressesQueryFocus,
  AddProductsToCartMutation,
  CmsBlockQuery,
  GroupedProductDetailQuery,
  GroupedProduct,
  AddBundleProductsToCartInput,
  AddBundleProductsToCartMutation,
  BundleProductDetailQuery,
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
  /** FOCUS */
  FocusSetGroupOnItemInput,
  FocusSetGroupOnItemMutation,
  FocusUpdateCartGroupInput,
  FocusUpdateCartGroupMutation,
  FocusTrackedOrdersQuery,
  FocusTrackedOrdersQueryVariables,
  FocusInventoryQuery,
  FocusInventoryQueryVariables,
} from './GraphQL';
import { SetPaymentMethodOnCartInputs } from '../api/setPaymentMethodOnCart';
import { CustomerProductReviewParams } from '../api/customerProductReview';
import { AddProductsToCartInput } from '../api/addProductsToCart';

export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'> {
}

export type AddressOnCart = ShippingCartAddress;
export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree;
export type CategoryFilter = CategoryFilterInput;
export type CategoryMenu = CategoryTree;
export type Countries = CountriesListQueryFocus['countries'][0];
export type Coupon = AppliedCoupon;
export type Customer = CustomerFragment;
export type CustomerAddress = CustomerAddressInterface;
export type CustomerOrder = CustomerOrderInterface;
export type CustomerUpdateParameters = CustomerCreateInput;
export type GiftCard = AppliedGiftCard;
export type Order = OrderInterface;
export type Page = CmsPage;
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ProductReview = ProductReviewQueryFocus['products']['items'][0]['reviews']['items'][0];
export type ProductReviews = ProductReviewQueryFocus['products']['items'][0];
export type ReviewMetadata = ProductReviewRatingsMetadataQueryFocus['productReviewRatingsMetadata']['items'][0];
export type Route = UrlResolverQueryFocus['urlResolver'];
export type ShippingMethod = AvailableShippingMethod;
export type StoreConfig = StoreConfigQueryFocus['storeConfig'];
export type Wishlist = WishlistDataFragment;
export type WishlistProduct = WishlistItemInterface;

export const enum ProductsQueryType {
  List = 'LIST',
  Detail = 'DETAIL',
  Filters = 'FILTERS',
  Upsell = 'UPSELL',
  Related = 'RELATED',
}

export type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

export enum MagentoCustomerGender {
  Male = 1,
  Female = 2,
}

export interface MagentoApiMethods {
  addBundleProductsToCart(input: AddBundleProductsToCartInput): Promise<FetchResult<AddBundleProductsToCartMutation>>;
  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;
  addProductsToCart(input: AddProductsToCartInput): Promise<FetchResult<AddProductsToCartMutation>>;
  addProductToWishList(input: AddProductsToWishlistMutationVariables): Promise<FetchResult<AddProductsToWishlistMutation>>;
  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<FetchResult<AddSimpleProductsToCartMutation>>;
  applyCouponToCart(input: ApplyCouponToCartInput): Promise<FetchResult<ApplyCouponToCartMutation>>;
  bundleProductDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<BundleProductDetailQuery>>;
  applyGiftCardToCart(input: ApplyGiftCardToCartInput): Promise<FetchResult<ApplyGiftCardToCartMutation>>;
  cart(cartId: string): Promise<ApolloQueryResult<CartQueryFocus>>;
  category(categoryInput?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CategoryQueryFocus>>;
  categoryList(categoryFilter?: CategoryListQueryVariables): Promise<ApolloQueryResult<CategoryListQueryFocus>>;
  categorySearch(categoryFilter?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CategorySearchQueryFocus>>;
  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<CustomerFragment>;
  cmsBlocks(identifiers: string[]): Promise<ApolloQueryResult<CmsBlockQuery>>;
  cmsPage(identifier: string): Promise<ApolloQueryResult<CmsPageQueryFocus>>;
  configurableProductDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery):
  Promise<ApolloQueryResult<ConfigurableProductDetailQueryFocus>>;
  countries(): Promise<ApolloQueryResult<CountriesListQueryFocus>>;
  country(id: string): Promise<ApolloQueryResult<CountryInformationQueryFocus>>;
  createCustomer(input: CustomerCreateInput): Promise<FetchResult<CreateCustomerMutation>>;
  createCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<CreateCustomerAddressMutation>>;
  createEmptyCart(): Promise<FetchResult<CreateEmptyCartMutation>>;
  createProductReview(input: CreateProductReviewInput): Promise<FetchResult<CreateProductReviewMutation>>;
  customer(): Promise<ApolloQueryResult<CustomerQueryFocus>>;
  customerCart(): Promise<ApolloQueryResult<CustomerCartQueryFocus>>;
  customerOrders(orderParams: CustomerOrdersQueryVariables): Promise<ApolloQueryResult<CustomerOrdersQueryFocus>>;
  customerProductReview(input: CustomerProductReviewParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerProductReviewQueryFocus>>;
  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;
  generateCustomerToken(email: string, password: string): Promise<FetchResult<GenerateCustomerTokenMutation>>;
  getAvailableCustomerPaymentMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQueryFocus>>;
  getAvailableCustomerShippingMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQueryFocus>>;
  getAvailablePaymentMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQueryFocus>>;
  getAvailableShippingMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQueryFocus>>;
  getCustomerAddresses(customQuery?: CustomQuery): Promise<ApolloQueryResult<GetCustomerAddressesQueryFocus>>;
  groupedProductDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<GroupedProductDetailQuery>>;
  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<FetchResult<MergeCartsMutation>>;
  pickupLocations(searchParams: QueryPickupLocationsArgs): Promise<FetchResult<PickupLocationsQueryFocus>>;
  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;
  productDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductDetailsQueryFocus>>;
  productsFilters(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductsFiltersQueryFocus>>;
  productReview(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductReviewQueryFocus>>;
  productReviewRatingsMetadata(): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQueryFocus>>;
  products(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductsListQueryFocus>>;
  relatedProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<RelatedProductQueryFocus>>;
  removeCouponFromCart(input: RemoveCouponFromCartInput): Promise<FetchResult<RemoveCouponFromCartMutation>>;
  removeGiftCardFromCart(input: RemoveGiftCardFromCartInput): Promise<FetchResult<RemoveGiftCardFromCartMutation>>;
  removeItemFromCart(input: RemoveItemFromCartInput): Promise<FetchResult<RemoveItemFromCartMutation>>;
  removeProductsFromWishlist(input: RemoveProductsFromWishlistMutationVariables): Promise<FetchResult<RemoveProductsFromWishlistMutation>>;
  revokeCustomerToken(): Promise<FetchResult<RevokeCustomerTokenMutation>>;
  requestPasswordResetEmail(input: RequestPasswordResetEmailMutationVariables): Promise<FetchResult<RequestPasswordResetEmailMutation>>;
  setBillingAddressOnCart(input: SetBillingAddressOnCartInput): Promise<FetchResult<SetBillingAddressOnCartMutation>>;
  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>>;
  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInputs): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;
  setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput):Promise<FetchResult<SetShippingAddressesOnCartMutationFocus>>;
  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput):Promise<FetchResult<SetShippingMethodsOnCartMutationFocus>>;
  storeConfig(): Promise<ApolloQueryResult<StoreConfigQueryFocus>>;
  subscribeEmailToNewsletter(input: SubscribeEmailToNewsletterMutationVariables): Promise<FetchResult<SubscribeEmailToNewsletterMutation>>;
  orderTracker(orderParams: FocusTrackedOrdersQueryVariables): Promise<ApolloQueryResult<FocusTrackedOrdersQuery>>;
  updateCartItems(input: UpdateCartItemsInput): Promise<FetchResult<UpdateCartItemsMutation>>;
  updateCustomer(input: CustomerUpdateInput): Promise<FetchResult<UpdateCustomerMutation>>;
  updateCustomerAddress(input: { addressId: number; input: CustomerAddressInput; }): Promise<FetchResult<UpdateCustomerAddressMutation>>;
  updateCustomerEmail(input: UpdateCustomerEmailMutationVariables): Promise<FetchResult<UpdateCustomerAddressMutation>>;
  upsellProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery):Promise<ApolloQueryResult<UpsellProductsQueryFocus>>;
  urlResolver(url: string): Promise<ApolloQueryResult<UrlResolverQueryFocus>>;
  wishlist(queryParams: WishlistQueryVariables): Promise<ApolloQueryResult<WishlistQueryFocus>>;
  focusSetGroupOnItem(input: FocusSetGroupOnItemInput): Promise<FetchResult<FocusSetGroupOnItemMutation>>;
  focusUpdateCartGroup(input: FocusUpdateCartGroupInput): Promise<FetchResult<FocusUpdateCartGroupMutation>>;

  focusInventory(filter: FocusInventoryQueryVariables): Promise<ApolloQueryResult<FocusInventoryQuery>>;
}
