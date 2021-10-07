import { ApolloQueryResult, FetchResult, FetchPolicy } from '@apollo/client/core';
import { ExecutionResult } from 'graphql';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddProductsToCompareListInput,
  AddProductsToCompareListMutation,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  AppliedCoupon,
  AppliedGiftCard,
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  ApplyGiftCardToCartInput,
  ApplyGiftCardToCartMutation,
  AssignCompareListToCustomerMutation,
  AvailableShippingMethod,
  BaseQuery,
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
  CompareList as CompareListInterface,
  CompareListQueryFocus,
  ConfigurableProduct,
  CountriesListQueryFocus,
  CountryInformationQueryFocus,
  CreateCompareListInput,
  CreateCompareListMutation,
  CustomerAddress as CustomerAddressInterface,
  CustomerAddressInput,
  CustomerAvailablePaymentMethodsQueryFocus,
  CustomerAvailableShippingMethodsQueryFocus,
  CustomerCartQueryFocus,
  CustomerCompareListQueryFocus,
  CustomerCreateInput,
  CustomerOrder as CustomerOrderInterface,
  CustomerOrdersQueryFocus,
  CustomerQueryFocus,
  CustomerUpdateInput,
  DeleteCompareListMutation,
  DeleteCustomerAddressMutation,
  GenerateCustomerTokenMutation,
  GiftCardAccount as GiftCardAccountInterface,
  GiftCardAccountQueryFocus,
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
  UpdateCustomerEmailMutationVariables,
  RemoveProductsFromCompareListInput,
  RemoveProductsFromCompareListMutation,
  RemoveProductsFromWishlistMutationVariables,
  RemoveProductsFromWishlistMutation,
  GetCustomerAddressesQueryFocus,
  AddProductsToCartMutation,
  CmsBlockQueryFocus,
  GroupedProduct,
  AddBundleProductsToCartInput,
  AddBundleProductsToCartMutation,
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
  ResetPasswordMutationVariables,
  ResetPasswordMutation,
  ChangeCustomerPasswordMutation,
  CreateCustomerAddressMutation,
  DownloadableProduct,
  VirtualProduct, CustomerOrdersFilterInput,
  /** FOCUS */
  FocusSetGroupOnItemInput,
  FocusSetGroupOnItemMutation,
  FocusUpdateCartGroupInput,
  FocusUpdateCartGroupMutation,
  FocusTrackedOrdersQuery,
  FocusTrackedOrdersQueryVariables,
  FocusInventoryQuery,
  FocusInventoryQueryVariables,
  FocusEstimateShippingMethodsInput,
  FocusEstimateShippingMethodsMutation,
  FocusIDmeVerifyInput,
  FocusIDmeVerifyMutation,
  FocusProductAttributeQuery,
  CustomerReturnQueryVariables,
  CustomerReturnsQueryVariables,
  CustomerReturnQueryFocus,
  CustomerReturnsQueryFocus,
} from './GraphQL';
import { SetPaymentMethodOnCartInputs } from '../api/setPaymentMethodOnCart';
import { CustomerProductReviewParams } from '../api/customerProductReview';
import { AddProductsToCartInput } from '../api/addProductsToCart';

export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> {
}

export type AddressOnCart = ShippingCartAddress;
export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree | CategorySearchQueryFocus['categoryList'][0];
export type CategoryFilter = CategoryFilterInput;
export type CategoryMenu = CategoryTree;
export type CompareList = CompareListInterface;
export type Countries = CountriesListQueryFocus['countries'][0];
export type Coupon = AppliedCoupon;
export type CustomerAddress = CustomerAddressInterface;
export type CustomerOrder = CustomerOrderInterface;
export type CustomerUpdateParameters = CustomerCreateInput;
export type GiftCard = AppliedGiftCard;
export type GiftCardAccount = GiftCardAccountInterface;
export type Order = OrderInterface;
export type Page = CmsPage | CmsPageQueryFocus['cmsPage'];
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ProductReview = ProductReviewQueryFocus['products']['items'][0]['reviews']['items'][0];
export type ProductReviews = ProductReviewQueryFocus['products']['items'][0];
export type ReviewMetadata = ProductReviewRatingsMetadataQueryFocus['productReviewRatingsMetadata']['items'][0];
export type Route = UrlResolverQueryFocus['urlResolver'];
export type ShippingMethod = AvailableShippingMethod;
export type StoreConfig = StoreConfigQueryFocus['storeConfig'];
export type WishlistProduct = WishlistItemInterface;

export const enum ProductsQueryType {
  List = 'LIST',
  Detail = 'DETAIL',
}

export type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

export type GetOrdersSearchParams = {
  pageSize?: number;
  currentPage?: number;
  filter?: CustomerOrdersFilterInput;
};

export enum MagentoCustomerGender {
  Male = 1,
  Female = 2,
}

export interface MagentoApiMethods {
  addBundleProductsToCart(input: AddBundleProductsToCartInput): Promise<FetchResult<AddBundleProductsToCartMutation>>;

  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;

  addProductsToCart(input: AddProductsToCartInput): Promise<FetchResult<AddProductsToCartMutation>>;

  addProductsToCompareList(input: AddProductsToCompareListInput): Promise<FetchResult<AddProductsToCompareListMutation>>;

  addProductToWishList(input: AddProductsToWishlistMutationVariables): Promise<FetchResult<AddProductsToWishlistMutation>>;

  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<FetchResult<AddSimpleProductsToCartMutation>>;

  addDownloadableProductsToCart(input: AddDownloadableProductsToCartInput): Promise<FetchResult<AddDownloadableProductsToCartMutation>>;

  addVirtualProductsToCart(input: AddVirtualProductsToCartInput): Promise<FetchResult<AddVirtualProductsToCartMutation>>;

  applyCouponToCart(input: ApplyCouponToCartInput): Promise<FetchResult<ApplyCouponToCartMutation>>;

  applyGiftCardToCart(input: ApplyGiftCardToCartInput): Promise<FetchResult<ApplyGiftCardToCartMutation>>;

  assignCompareListToCustomer(uid: string): Promise<FetchResult<AssignCompareListToCustomerMutation>>;

  cart(cartId: string): Promise<ApolloQueryResult<CartQueryFocus>>;

  category(categoryInput?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CategoryQueryFocus>>;

  categoryList(categoryFilter?: CategoryListQueryVariables): Promise<ApolloQueryResult<CategoryListQueryFocus>>;

  categorySearch(categoryFilter?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CategorySearchQueryFocus>>;

  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<FetchResult<ChangeCustomerPasswordMutation>>;

  cmsBlocks(identifiers: string[]): Promise<ApolloQueryResult<CmsBlockQueryFocus>>;

  cmsPage(identifier: string): Promise<ApolloQueryResult<CmsPageQueryFocus>>;

  compareList(uid: string): Promise<ApolloQueryResult<CompareListQueryFocus>>;

  countries(): Promise<ApolloQueryResult<CountriesListQueryFocus>>;

  country(id: string): Promise<ApolloQueryResult<CountryInformationQueryFocus>>;

  createCompareList(input: CreateCompareListInput): Promise<FetchResult<CreateCompareListMutation>>;

  createCustomer(input: CustomerCreateInput): Promise<FetchResult<CreateCustomerMutation>>;

  createCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(): Promise<FetchResult<CreateEmptyCartMutation>>;

  createProductReview(input: CreateProductReviewInput): Promise<FetchResult<CreateProductReviewMutation>>;

  customer(): Promise<ApolloQueryResult<CustomerQueryFocus>>;

  customerCart(): Promise<ApolloQueryResult<CustomerCartQueryFocus>>;

  customerCompareList(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerCompareListQueryFocus>>;

  customerOrders(
    searchParams: GetOrdersSearchParams,
    customQuery?: CustomQuery,
  ): Promise<ApolloQueryResult<CustomerOrdersQueryFocus>>;

  customQuery<QUERY = any, QUERY_VARIABLES = any>({
    query,
    queryVariables,
    fetchPolicy,
  }: {
    query: QUERY,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }): Promise<ApolloQueryResult<QUERY & BaseQuery>>;

  customMutation<MUTATION = any, MUTATION_VARIABLES = any>({
    mutation,
    mutationVariables,
    fetchPolicy,
  }: {
    mutation: MUTATION,
    mutationVariables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }): Promise<FetchResult<MUTATION>>;

  customerProductReview(input: CustomerProductReviewParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerProductReviewQueryFocus>>;

  deleteCompareList(uid: string): Promise<FetchResult<DeleteCompareListMutation>>;

  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(email: string, password: string): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getAvailableCustomerPaymentMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQueryFocus>>;

  getAvailableCustomerShippingMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQueryFocus>>;

  getAvailablePaymentMethods(
    params: { cartId: string },
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQueryFocus>>;

  getAvailableShippingMethods(
    params: { cartId: string },
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQueryFocus>>;

  getCustomerAddresses(customQuery?: CustomQuery): Promise<ApolloQueryResult<GetCustomerAddressesQueryFocus>>;

  giftCardAccount(code: string): Promise<ApolloQueryResult<GiftCardAccountQueryFocus>>;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<FetchResult<MergeCartsMutation>>;

  orderTracker(orderParams: FocusTrackedOrdersQueryVariables): Promise<ApolloQueryResult<FocusTrackedOrdersQuery>>;

  pickupLocations(searchParams: QueryPickupLocationsArgs): Promise<FetchResult<PickupLocationsQueryFocus>>;

  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;

  productDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductDetailsQueryFocus>>;

  productReview(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductReviewQueryFocus>>;

  productReviewRatingsMetadata(): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQueryFocus>>;

  products(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductsListQueryFocus>>;

  relatedProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<RelatedProductQueryFocus>>;

  removeCouponFromCart(input: RemoveCouponFromCartInput): Promise<FetchResult<RemoveCouponFromCartMutation>>;

  removeGiftCardFromCart(input: RemoveGiftCardFromCartInput): Promise<FetchResult<RemoveGiftCardFromCartMutation>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<FetchResult<RemoveItemFromCartMutation>>;

  removeProductsFromCompareList(input: RemoveProductsFromCompareListInput): Promise<FetchResult<RemoveProductsFromCompareListMutation>>;

  removeProductsFromWishlist(input: RemoveProductsFromWishlistMutationVariables): Promise<FetchResult<RemoveProductsFromWishlistMutation>>;

  revokeCustomerToken(): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  requestPasswordResetEmail(
    input: RequestPasswordResetEmailMutationVariables,
    customQuery?: CustomQuery): Promise<FetchResult<RequestPasswordResetEmailMutation>>;

  resetPassword(input: ResetPasswordMutationVariables, customQuery?: CustomQuery,): Promise<FetchResult<ResetPasswordMutation>>;

  setBillingAddressOnCart(input: SetBillingAddressOnCartInput): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInputs): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput): Promise<FetchResult<SetShippingAddressesOnCartMutationFocus>>;

  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): Promise<FetchResult<SetShippingMethodsOnCartMutationFocus>>;

  storeConfig(): Promise<ApolloQueryResult<StoreConfigQueryFocus>>;

  subscribeEmailToNewsletter(input: SubscribeEmailToNewsletterMutationVariables): Promise<FetchResult<SubscribeEmailToNewsletterMutation>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(input: CustomerUpdateInput): Promise<FetchResult<UpdateCustomerMutation>>;

  updateCustomerAddress(input: { addressId: number; input: CustomerAddressInput; }): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  updateCustomerEmail(input: UpdateCustomerEmailMutationVariables): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  upsellProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<UpsellProductsQueryFocus>>;

  urlResolver(url: string): Promise<ApolloQueryResult<UrlResolverQueryFocus>>;

  wishlist(
    searchParams: WishlistQueryVariables,
    customQuery?: CustomQuery,
  ): Promise<ApolloQueryResult<WishlistQueryFocus>>;

  focusSetGroupOnItem(input: FocusSetGroupOnItemInput): Promise<FetchResult<FocusSetGroupOnItemMutation>>;

  focusUpdateCartGroup(input: FocusUpdateCartGroupInput): Promise<FetchResult<FocusUpdateCartGroupMutation>>;

  focusInventory(filter: FocusInventoryQueryVariables): Promise<ApolloQueryResult<FocusInventoryQuery>>;

  focusEstimateShippingMethods(input: FocusEstimateShippingMethodsInput): Promise<FetchResult<FocusEstimateShippingMethodsMutation>>;

  focusIDmeVerify(input: FocusIDmeVerifyInput): Promise<FetchResult<FocusIDmeVerifyMutation>>;
  focusProductAttribute(attribute_code: string): Promise<FetchResult<FocusProductAttributeQuery>>;
  customerReturns(returnParams: CustomerReturnsQueryVariables): Promise<ApolloQueryResult<CustomerReturnsQueryFocus>>;
  customerReturn(returnParams: CustomerReturnQueryVariables): Promise<ApolloQueryResult<CustomerReturnQueryFocus>>;
}
