import { ApolloQueryResult, FetchPolicy, FetchResult } from '@apollo/client/core';
import { ExecutionResult } from 'graphql';
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
  AvailableStoresQuery,
  BundleProduct,
  Cart as CartInterface,
  CartItemInterface,
  CartQuery,
  CategoryQuery,
  CategoryFilterInput,
  CategoryListQuery,
  CategoryListQueryVariables,
  CategorySearchQuery,
  CategorySearchQueryVariables,
  CategoryTree,
  CmsPage,
  CmsPageQuery,
  CompareList as CompareListInterface,
  CompareListQuery,
  ConfigurableProduct,
  CountriesListQuery,
  CountryInformationQuery,
  CreateCompareListInput,
  CreateCompareListMutation,
  CurrencyQuery,
  CustomerAddress as CustomerAddressInterface,
  CustomerAddressInput,
  CustomerAvailablePaymentMethodsQuery,
  CustomerAvailableShippingMethodsQuery,
  CustomerCartQuery,
  CustomerCompareListQuery,
  CustomerCreateInput,
  CustomerOrder as CustomerOrderInterface,
  CustomerOrdersQueryFocus,
  CustomerQueryFocus,
  CustomerUpdateInput,
  DeleteCompareListMutation,
  DeleteCustomerAddressMutation,
  GenerateCustomerTokenMutation,
  GiftCardAccount as GiftCardAccountInterface,
  GiftCardAccountQuery,
  GuestAvailablePaymentMethodsQuery,
  GuestAvailableShippingMethodsQuery,
  MergeCartsMutation,
  Order as OrderInterface,
  PaypalExpressTokenInput,
  PaypalExpressTokenMutation,
  PickupLocationsQuery,
  PlaceOrderInput,
  PlaceOrderMutation,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQueryFocus as ProductDetailsQuery,
  ProductInterface,
  ProductReviewQuery,
  ProductReviewRatingsMetadataQuery,
  ProductsListQuery,
  QueryPickupLocationsArgs,
  RelatedProductQuery,
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
  UpsellProductsQuery,
  UrlResolverQuery,
  UsedProductsQuery,
  WishlistItemInterface,
  WishlistQuery,
  WishlistQueryVariables,
  CreateProductReviewInput,
  CreateEmptyCartMutation,
  CreateProductReviewMutation,
  CustomerProductReviewQuery,
  StagingPreviewQueryVariables,
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
  GetCustomerAddressesQuery,
  AddProductsToCartMutation,
  CmsBlockQuery,
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
  CachedQuery,
  CheckoutSessionConfigQuery,
  CheckoutSessionConfigQueryVariables,
  CheckoutSessionDetailsQuery,
  CheckoutSessionDetailsQueryVariables,
  CheckoutSessionSignInQuery,
  CheckoutSessionSignInQueryVariables,
  CompleteCheckoutSessionMutation,
  CompleteCheckoutSessionMutationVariables,
  SetCustomerLinkMutation,
  SetCustomerLinkMutationVariables,
  UpdateCheckoutSessionMutation,
  UpdateCheckoutSessionMutationVariables,
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
  FocusProductAttributesQuery,
  CustomerReturnQueryVariables,
  CustomerReturnsQueryVariables,
  CustomerReturnQuery,
  CustomerReturnsQuery,
  FocusGuestRequestReturnInput,
  FocusGuestRequestReturnMutation,
  FocusGuestRmaInput,
  FocusGuestRmaListInput,
  FocusGuestRmaListQuery,
  FocusGuestRmaQuery,
  FocusProductKitComponent,
  FocusProductAttr,
  FocusProductAttributeGroup,
  FocusDeliveryTimeForAddressInput,
  FocusDeliveryTimeQuery,
} from './GraphQL';
import { SetPaymentMethodOnCartInputs } from '../api/setPaymentMethodOnCart';
import { CustomerProductReviewParams } from '../api/customerProductReview';
import { AddProductsToCartInput } from '../api/addProductsToCart';

export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> {
}

export type AddressOnCart = ShippingCartAddress;
export type AvailableStores = AvailableStoresQuery['availableStores'];
export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree | CategorySearchQuery['categoryList'][0];
export type CategoryFilter = CategoryFilterInput;
export type CategoryMenu = CategoryTree;
export type CompareList = CompareListInterface;
export type Countries = CountriesListQuery['countries'][0];
export type Coupon = AppliedCoupon;
export type CustomerAddress = CustomerAddressInterface;
export type CustomerOrder = CustomerOrderInterface;
export type CustomerUpdateParameters = CustomerCreateInput;
export type GiftCard = AppliedGiftCard;
export type GiftCardAccount = GiftCardAccountInterface;
export type Order = OrderInterface;
export type Page = CmsPage | CmsPageQuery['cmsPage'];
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ProductReview = ProductReviewQuery['products']['items'][0]['reviews']['items'][0];
export type ProductReviews = ProductReviewQuery['products']['items'][0];
export type ReviewMetadata = ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'][0];
export type Route = UrlResolverQuery['urlResolver'];
export type ShippingMethod = AvailableShippingMethod;
export type StoreConfig = StoreConfigQueryFocus['storeConfig'];
export type WishlistProduct = WishlistItemInterface;
export type ProductKitComponent = FocusProductKitComponent;
export type ProductAttr = FocusProductAttr;
export type ProductAttributeGroup = FocusProductAttributeGroup;


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
  withAggregations?: boolean;
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

  cart(cartId: string): Promise<ApolloQueryResult<CartQuery>>;

  changeCustomerPassword(params: { currentPassword: string; newPassword: string }): Promise<FetchResult<ChangeCustomerPasswordMutation>>;

  compareList(uid: string): Promise<ApolloQueryResult<CompareListQuery>>;

  createCompareList(input: CreateCompareListInput): Promise<FetchResult<CreateCompareListMutation>>;

  createCustomer(input: CustomerCreateInput): Promise<FetchResult<CreateCustomerMutation>>;

  createCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(_?: unknown): Promise<FetchResult<CreateEmptyCartMutation>>;

  createPaypalExpressToken(input: PaypalExpressTokenInput): Promise<FetchResult<PaypalExpressTokenMutation>>;

  createProductReview(input: CreateProductReviewInput): Promise<FetchResult<CreateProductReviewMutation>>;

  customer(_?: unknown): Promise<ApolloQueryResult<CustomerQueryFocus>>;

  customerCart(_?: unknown): Promise<ApolloQueryResult<CustomerCartQuery>>;

  customerCompareList(_?: unknown): Promise<ApolloQueryResult<CustomerCompareListQuery>>;

  customerOrders(searchParams: GetOrdersSearchParams): Promise<ApolloQueryResult<CustomerOrdersQueryFocus>>;

  customerProductReview(input: CustomerProductReviewParams): Promise<ApolloQueryResult<CustomerProductReviewQuery>>;

  deleteCompareList(uid: string): Promise<FetchResult<DeleteCompareListMutation>>;

  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(params: { email: string, password: string }): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getAvailableCustomerPaymentMethods(_?: unknown): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>>;

  getAvailableCustomerShippingMethods(_?: unknown): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>>;

  getAvailablePaymentMethods(params: { cartId: string }): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>>;

  getAvailableShippingMethods(params: { cartId: string }): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>>;

  getCustomerAddresses(_?: unknown): Promise<ApolloQueryResult<GetCustomerAddressesQuery>>;

  giftCardAccount(code: string): Promise<ApolloQueryResult<GiftCardAccountQuery>>;

  mergeCarts(params: { sourceCartId: string; destinationCartId: string }): Promise<FetchResult<MergeCartsMutation>>;

  orderTracker(orderParams: FocusTrackedOrdersQueryVariables): Promise<ApolloQueryResult<FocusTrackedOrdersQuery>>;

  pickupLocations(searchParams: QueryPickupLocationsArgs): Promise<FetchResult<PickupLocationsQuery>>;

  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;

  removeCouponFromCart(input: RemoveCouponFromCartInput): Promise<FetchResult<RemoveCouponFromCartMutation>>;

  removeGiftCardFromCart(input: RemoveGiftCardFromCartInput): Promise<FetchResult<RemoveGiftCardFromCartMutation>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<FetchResult<RemoveItemFromCartMutation>>;

  removeProductsFromCompareList(input: RemoveProductsFromCompareListInput): Promise<FetchResult<RemoveProductsFromCompareListMutation>>;

  removeProductsFromWishlist(input: RemoveProductsFromWishlistMutationVariables): Promise<FetchResult<RemoveProductsFromWishlistMutation>>;

  revokeCustomerToken(_?: unknown): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  requestPasswordResetEmail(input: RequestPasswordResetEmailMutationVariables): Promise<FetchResult<RequestPasswordResetEmailMutation>>;

  resetPassword(input: ResetPasswordMutationVariables): Promise<FetchResult<ResetPasswordMutation>>;

  setBillingAddressOnCart(input: SetBillingAddressOnCartInput): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodAndPlaceOrder(
    input: {
      setPaymentMethod: SetPaymentMethodOnCartInputs,
      placeOrder: PlaceOrderInput
    }
  ): Promise<FetchResult<SetPaymentMethodOnCartMutation & PlaceOrderMutation>>;

  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInputs): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput): Promise<FetchResult<SetShippingAddressesOnCartMutationFocus>>;

  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): Promise<FetchResult<SetShippingMethodsOnCartMutationFocus>>;

  subscribeEmailToNewsletter(input: SubscribeEmailToNewsletterMutationVariables): Promise<FetchResult<SubscribeEmailToNewsletterMutation>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(input: CustomerUpdateInput): Promise<FetchResult<UpdateCustomerMutation>>;

  updateCustomerAddress(input: { addressId: number; input: CustomerAddressInput; }): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  updateCustomerEmail(input: UpdateCustomerEmailMutationVariables): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  wishlist(searchParams: WishlistQueryVariables): Promise<ApolloQueryResult<WishlistQuery>>;

  checkoutSessionConfig(input: CheckoutSessionConfigQueryVariables): Promise<ApolloQueryResult<CheckoutSessionConfigQuery>>;

  checkoutSessionDetails(input: CheckoutSessionDetailsQueryVariables): Promise<ApolloQueryResult<CheckoutSessionDetailsQuery>>;

  checkoutSessionSignIn(input: CheckoutSessionSignInQueryVariables): Promise<ApolloQueryResult<CheckoutSessionSignInQuery>>;

  completeCheckoutSession(input: CompleteCheckoutSessionMutationVariables): Promise<FetchResult<CompleteCheckoutSessionMutation>>;

  setCustomerLink(input: SetCustomerLinkMutationVariables): Promise<FetchResult<SetCustomerLinkMutation>>;

  updateCheckoutSession(input: UpdateCheckoutSessionMutationVariables): Promise<FetchResult<UpdateCheckoutSessionMutation>>;

  focusSetGroupOnItem(input: FocusSetGroupOnItemInput): Promise<FetchResult<FocusSetGroupOnItemMutation>>;

  focusUpdateCartGroup(input: FocusUpdateCartGroupInput): Promise<FetchResult<FocusUpdateCartGroupMutation>>;

  focusEstimateShippingMethods(input: FocusEstimateShippingMethodsInput): Promise<FetchResult<FocusEstimateShippingMethodsMutation>>;

  focusIDmeVerify(input: FocusIDmeVerifyInput): Promise<FetchResult<FocusIDmeVerifyMutation>>;

  customerReturns(returnParams: CustomerReturnsQueryVariables): Promise<ApolloQueryResult<CustomerReturnsQuery>>;

  customerReturn(returnParams: CustomerReturnQueryVariables): Promise<ApolloQueryResult<CustomerReturnQuery>>;

  focusGuestRequestReturn(input: FocusGuestRequestReturnInput): Promise<FetchResult<FocusGuestRequestReturnMutation>>;

  focusGuestRma(input: FocusGuestRmaInput): Promise<ApolloQueryResult<FocusGuestRmaQuery>>;

  focusGuestRmaList(input: FocusGuestRmaListInput): Promise<ApolloQueryResult<FocusGuestRmaListQuery>>;
}

export interface MagentoGetApiMethods {
  availableStores(_?: unknown): Promise<ApolloQueryResult<CachedQuery<AvailableStoresQuery>>>;

  category(categoryInput?: StagingPreviewQueryVariables<CategorySearchQueryVariables>): Promise<ApolloQueryResult<CachedQuery<CategoryQuery>>>;

  categoryList(categoryFilter?: CategoryListQueryVariables): Promise<ApolloQueryResult<CachedQuery<CategoryListQuery>>>;

  categorySearch(categoryFilter?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CachedQuery<CategorySearchQuery>>>;

  cmsBlocks(identifiers: string[]): Promise<ApolloQueryResult<CachedQuery<CmsBlockQuery>>>;

  cmsPage(
    identifier: string
  ): Promise<ApolloQueryResult<CachedQuery<CmsPageQuery>>>;

  countries(_?: unknown): Promise<ApolloQueryResult<CachedQuery<CountriesListQuery>>>;

  country(id: string): Promise<ApolloQueryResult<CachedQuery<CountryInformationQuery>>>;

  currency(_?: unknown): Promise<FetchResult<CurrencyQuery>>

  pickupLocations(searchParams: QueryPickupLocationsArgs): Promise<FetchResult<PickupLocationsQuery>>;

  productDetail(searchParams: StagingPreviewQueryVariables<GetProductSearchParams>): Promise<ApolloQueryResult<CachedQuery<ProductDetailsQuery>>>;

  productReview(searchParams: GetProductSearchParams): Promise<ApolloQueryResult<ProductReviewQuery>>;

  productReviewRatingsMetadata(_?: unknown): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>>;

  products(searchParams: GetProductSearchParams): Promise<ApolloQueryResult<CachedQuery<ProductsListQuery>>>;

  relatedProduct(searchParams: GetProductSearchParams): Promise<ApolloQueryResult<CachedQuery<RelatedProductQuery>>>;

  storeConfig(_?: unknown): Promise<ApolloQueryResult<StoreConfigQueryFocus>>;

  upsellProduct(searchParams: GetProductSearchParams): Promise<ApolloQueryResult<CachedQuery<UpsellProductsQuery>>>;

  urlResolver(url: string): Promise<ApolloQueryResult<CachedQuery<UrlResolverQuery>>>;

  usedProduct(searchParams: GetProductSearchParams): Promise<ApolloQueryResult<UsedProductsQuery>>;

  focusInventory(filter: FocusInventoryQueryVariables): Promise<ApolloQueryResult<CachedQuery<FocusInventoryQuery>>>;

  focusProductAttribute(attribute_code: string): Promise<FetchResult<FocusProductAttributeQuery>>;

  focusProductAttributes(attribute_codes: string[]): Promise<FetchResult<FocusProductAttributesQuery>>;

  focusDeliveryTimeForAddress(input: FocusDeliveryTimeForAddressInput): Promise<ApolloQueryResult<FocusDeliveryTimeQuery>>;
}
