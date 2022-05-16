import {
  Composable,
  ComposableFunctionArgs,
  ComputedProperty,
  CustomQuery,
  PlatformApi,
  ForgotPasswordResult,
  UseCart as UseCartBase,
  UseCartErrors as UseCartErrorsBase,
  UseUser as UseUserBase,
  UseUserErrors as UseUserErrorsBase,
  UseMakeOrder as UseMakeOrderBase,
  UseMakeOrderErrors as UseMakeOrderErrorsBase,
} from '@absolute-web/vsf-core';
import { ComputedRef, Ref } from '@vue/composition-api';
import { FetchPolicy } from './index';

export type CustomQueryParams = { customQuery?: CustomQuery; [k: string]: any };

export interface UseUrlResolver<ROUTE, API extends PlatformApi = any> extends Composable<API> {
  search: (params: ComposableFunctionArgs<{ url: string }>) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseExternalCheckout<API extends PlatformApi = any> extends Composable<API> {
  initializeCheckout: (params: ComposableFunctionArgs<{ baseUrl: string }>) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
}

export interface UseCategorySearch<CATEGORY, CATEGORY_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  search: (params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>) => Promise<CATEGORY[]>;
  result: ComputedProperty<CATEGORY[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}

export interface UseCountrySearch<COUNTRIES, COUNTRY, API extends PlatformApi = any> extends Composable<API> {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<COUNTRIES[]>;
  search: (params: ComposableFunctionArgs<{ id: string }>) => Promise<COUNTRY>;
  countries: ComputedProperty<COUNTRIES[]>;
  country: ComputedProperty<COUNTRY>;
  error: ComputedProperty<UseCountrySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCountrySearchErrors {
  load: Error;
  search: Error;
}

export interface UseConfig<CONFIG, API extends PlatformApi = any> extends Composable<API> {
  config: ComputedRef<CONFIG>;
  loadConfig: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UseContentErrors {
  content: Error;
  blocks: Error;
}

export interface UseContent<PAGE, BLOCK, API extends PlatformApi = any> extends Composable<API> {
  page: ComputedProperty<PAGE>;
  blocks: ComputedProperty<BLOCK[]>
  loadContent: (params: ComposableFunctionArgs<{ identifier: string }>) => Promise<void>;
  loadBlocks: (params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}

export interface UseGetCartMethods<METHOD, API extends PlatformApi = any> extends Composable<API> {
  setMethods: (newMethods: METHOD[]) => void;
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  result: ComputedProperty<METHOD[]>;
  error: ComputedProperty<UseGetCartMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetCartMethodsErrors {
  load: Error;
}

export interface UsePaymentProviderErrors {
  load: Error;
  save: Error;
}

export interface UsePaymentProvider<STATE, PAYMENT_METHOD, API extends PlatformApi = any> extends Composable<API> {
  error: ComputedProperty<UsePaymentProviderErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;

  setState(state: STATE): void;

  load(params?: ComposableFunctionArgs<{}>): Promise<void>;

  save(params: ComposableFunctionArgs<{ paymentMethod: PAYMENT_METHOD }>): Promise<void>;
}

export interface UseGuestUserErrors {
  attachToCart: Error;
}

export interface UseGuestUserRegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;

  [x: string]: any;
}

export interface UseGuestUser<GUEST_USER, REGISTER_GUEST_USER_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  guestUser: ComputedProperty<GUEST_USER>;
  setGuestUser: (user: GUEST_USER) => void;
  attachToCart: (params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseGuestUserErrors>;
}

export interface UseReviewErrors {
  search: Error;
  addReview: Error;
  loadReviewMetadata: Error;
  loadCustomerReviews: Error;
}

export interface UseReview<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API extends PlatformApi = any> extends Composable<API> {
  search(params?: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;

  loadCustomerReviews(params?: ComposableFunctionArgs<REVIEWS_USER_SEARCH_PARAMS>): Promise<void>;

  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;

  loadReviewMetadata(params?: ComposableFunctionArgs<{}>): Promise<void>;

  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  metadata: ComputedProperty<REVIEW_METADATA[]>;
  loading: ComputedProperty<boolean>;

  [x: string]: any;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}

export interface UseNewsletter<UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: ComposableFunctionArgs<{ email: UPDATE_NEWSLETTER_PARAMS }>) => Promise<void>;
}

export interface UseAddressesErrors {
  load: Error;
  save: Error;
  remove: Error;
  update: Error;
}

export interface UseAddresses<ADDRESS,
  LOAD_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  SAVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  UPDATE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  API extends PlatformApi = any,
> extends Composable<API> {
  error: ComputedProperty<UseAddressesErrors>;
  loading: ComputedProperty<boolean>;
  addresses: ComputedProperty<ADDRESS[]>;
  load: (loadParams?: ComposableFunctionArgs<LOAD_ADDRESS_PARAMS>) => Promise<void>,
  save: (saveParams: ComposableFunctionArgs<SAVE_ADDRESS_PARAMS>) => Promise<void>,
  remove: (removeParams: ComposableFunctionArgs<REMOVE_ADDRESS_PARAMS>) => Promise<void>,
  update: (updateParams: ComposableFunctionArgs<UPDATE_ADDRESS_PARAMS>) => Promise<void>,
}

export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

export interface UseForgotPassword<RESULT> {
  result: ComputedProperty<ForgotPasswordResult<RESULT>>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseForgotPasswordErrors>;

  setNew(params: ComposableFunctionArgs<{ tokenValue: string, newPassword: string, email: string }>): Promise<void>;

  request(params: ComposableFunctionArgs<{ email: string }>): Promise<void>;
}

export interface UseRelatedProducts<PRODUCTS, RELATED_PRODUCT_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseRelatedProductsErrors>;

  search(params: ComposableFunctionArgs<RELATED_PRODUCT_SEARCH_PARAMS>): Promise<void>;

  [x: string]: any;
}

export interface UseRelatedProductsErrors {
  search: Error;
}

export interface UseUpsellProducts<PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;

  search(params: ComposableFunctionArgs<UPSELL_PRODUCTS_SEARCH_PARAMS>): Promise<void>;

  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  search: Error;
}

export interface UseUsedProducts<PRODUCTS, USED_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUsedProductsErrors>;
  search(params: ComposableFunctionArgs<USED_PRODUCTS_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}

export interface UseUsedProductsErrors {
  search: Error;
}

export interface UseCustomQuery<QUERY, QUERY_VARIABLES, QUERY_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setQueryString: (newQueryString: QUERY) => void;
  queryString: ComputedProperty<QUERY>;
  query: ({
    variables,
    fetchPolicy,
  }: {
    variables: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => Promise<QUERY_RETURN>;
  result: ComputedProperty<QUERY_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCustomQueryErrors>;

  [x: string]: any;
}

export interface UseCustomQueryErrors {
  query: Error;
}

export interface UseCustomMutation<MUTATION, MUTATION_VARIABLES, MUTATION_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setMutationString: (newMutationString: MUTATION) => void;
  mutationString: ComputedProperty<MUTATION>;
  mutation: ({
    variables,
    fetchPolicy,
  }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
    // eslint-disable-next-line consistent-return
  }) => Promise<MUTATION_RETURN>;
  result: ComputedProperty<MUTATION_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCustomMutationErrors>;

  [x: string]: any;
}

export interface UseCustomMutationErrors {
  mutation: Error;
}

export interface UseStore<STORES, STORE, API extends PlatformApi = any> extends Composable<API> {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  change: (params: ComposableFunctionArgs<STORE>) => void;
  stores: ComputedRef<STORES>;
  loading: ComputedRef<boolean>;
}

export interface UseStoreErrors {
  stores: Error;
}

export interface UseCurrency<CURRENCY, API extends PlatformApi = any> extends Composable<API> {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  change: (params: ComposableFunctionArgs<{ id: string }>) => void;
  currencies: ComputedRef<CURRENCY>;
  loading: ComputedRef<boolean>;
}

export interface UseWishlistErrors {
  addItem: Error;
  removeItem: Error;
  load: Error;
  clear: Error;
}

export interface UseWishlist<WISHLIST,
  WISHLIST_ITEM,
  PRODUCT,
  API extends PlatformApi = any,
> extends Composable<API> {
  wishlist: ComputedProperty<WISHLIST>;
  loading: ComputedProperty<boolean>;

  addItem(params: ComposableFunctionArgs<{ product: PRODUCT; }>): Promise<void>;

  removeItem(params: ComposableFunctionArgs<{ product: WISHLIST_ITEM; }>): Promise<void>;

  load(params: ComposableFunctionArgs<{
    searchParams?: Partial<{
      currentPage: number;
      pageSize: number;
    }>,
  }>): Promise<void>;

  clear(): Promise<void>;

  setWishlist: (wishlist: WISHLIST) => void;

  isInWishlist({ product: PRODUCT }): boolean;

  error: ComputedProperty<UseWishlistErrors>;
}

export interface UseCartErrors extends UseCartErrorsBase {
  addItems: Error;
  checkGiftCard: Error;
  applyGiftCard: Error;
  removeGiftCard: Error;
  focusSetGroupOnItem: Error;
  focusUpdateCartGroup: Error;
  focusUnsetPickupDate: Error;
}

export interface CartCompliance {
  itar?: boolean;
  twenty_one_and_over?: boolean;
}

export interface UseCart<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API extends PlatformApi = any>
  extends UseCartBase<CART, CART_ITEM, PRODUCT, API> {
  compliance: ComputedProperty<CartCompliance>;
  setCompliance: (compliance: CartCompliance) => void;
  load(): Promise<void>;
  load(params: ComposableFunctionArgs<{
    forceReload?: boolean;
  }>): Promise<void>;
  /** @deprecated Use `addItems`. */
  addItem: (
    params: ComposableFunctionArgs<{
      product: PRODUCT;
      quantity: any;
      enteredOptions?: any;
    }>
  ) => Promise<void>;
  addItems: (
    params: ComposableFunctionArgs<{
      products: {
        product: PRODUCT;
        quantity: any;
        enteredOptions?: any;
      }[];
    }>
  ) => Promise<void>;
  checkGiftCard(params: ComposableFunctionArgs<{
    giftCardCode: string;
  }>): Promise<GIFT_CARD_ACCOUNT>;
  applyGiftCard(params: ComposableFunctionArgs<{
    giftCardCode: string;
  }>): Promise<void>;
  removeGiftCard(params: ComposableFunctionArgs<{
    giftCardCode: string;
  }>): Promise<void>;
  focusSetGroupOnItem(params: ComposableFunctionArgs<{
    product: CART_ITEM;
    groupType: string;
  }>): Promise<void>;
  focusUpdateCartGroup(params: ComposableFunctionArgs<{
    groupType: string; data: any
  }>): Promise<void>;
  focusUnsetPickupDate: (params: ComposableFunctionArgs<{}>) => Promise<void>;
  error: ComputedProperty<UseCartErrors>;
  token: ComputedProperty<string>;
  updateToken: () => void;
  setToken: (token: string) => void;
  clear: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
}

export interface UsePickupLocationErrors {
  search: Error;
}

export interface UsePickupLocation<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS> {
  search: (params: ComposableFunctionArgs<PICKUP_LOCATION_SEARCH_PARAMS>) => Promise<PICKUP_LOCATION[]>;
  result: ComputedProperty<PICKUP_LOCATION[]>;
  error: ComputedProperty<UsePickupLocationErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseInventoryErrors {
  search: Error;
}

export interface UseInventory<INVENTORY_ITEM> {
  search: (params: any) => Promise<INVENTORY_ITEM[]>;
  result: ComputedProperty<INVENTORY_ITEM[]>;
  error: ComputedProperty<UseInventoryErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseEstimateShippingMethodsErrors {
  load: Error;
}

export interface UseEstimateShippingMethods<SHIPPING_METHOD, API extends PlatformApi = any> extends Composable<API>{
  estimatedShippingMethods: ComputedProperty<SHIPPING_METHOD[]>;
  lowerEstimatedShippingMethod: ComputedProperty<SHIPPING_METHOD>;
  setEstimatedShippingMethods(estimatedShippingMethods: SHIPPING_METHOD[]): void;
  setLowerEstimatedShippingMethod(lowerEstimatedShippingMethod: SHIPPING_METHOD): void;
  load: (params: ComposableFunctionArgs<any>) => Promise<SHIPPING_METHOD[]>;
  result: ComputedProperty<SHIPPING_METHOD[]>;
  error: ComputedProperty<UseEstimateShippingMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseIDmeVerifyErrors {
  load: Error;
}

export interface UseIDmeVerify<CUSTOMER_DATA> {
  load: (params: any) => Promise<CUSTOMER_DATA>;
  result: ComputedProperty<CUSTOMER_DATA>;
  error: ComputedProperty<UseIDmeVerifyErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCompareListErrors {
  load: Error;
  loadCustomerCompareList: Error;
  create: Error;
  clear: Error;
  assignToCustomer: Error;
  addItems: Error;
  removeItems: Error;
}

export interface UseCompareList<COMPARE_LIST, PRODUCT> {
  compareList: ComputedProperty<COMPARE_LIST>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCompareListErrors>;
  reset: () => void;
  load: (params: ComposableFunctionArgs<{ uid: string }>) => Promise<void>;
  loadCustomerCompareList: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  create: (params: ComposableFunctionArgs<{ products: PRODUCT[] }>) => Promise<void>;
  clear: (params?: ComposableFunctionArgs<{}>) => Promise<boolean>;
  assignToCustomer: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  addItems: (
    params: ComposableFunctionArgs<{
      products: PRODUCT[];
    }>
  ) => Promise<void>;
  removeItems: (params: ComposableFunctionArgs<{ products: PRODUCT[] }>) => Promise<void>;
  isInCompareList: (params: { product: PRODUCT }) => boolean;
}

export interface UseProductAttributeErrors {
  load: Error;
}

export interface UseProductAttribute<PRODUCT_ATTRIBUTE> {
  load: (params: ComposableFunctionArgs<{ code: string }>) => Promise<void>;
  result: ComputedProperty<PRODUCT_ATTRIBUTE>;
  error: ComputedProperty<UseProductAttributeErrors>;
  loading: ComputedProperty<boolean>;
}
export interface UseCustomerReturnsErrors {
  loadReturns: Error;
  loadReturn: Error;
}

export interface UseCustomerReturns<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURN_DATA, CUSTOMER_RETURNS_PARAMS, CUSTOMER_RETURN_PARAMS> {
  loadReturns: (params: CUSTOMER_RETURNS_PARAMS) => Promise<void>;
  loadReturn: (params: CUSTOMER_RETURN_PARAMS) => Promise<void>;
  customerReturn: ComputedProperty<CUSTOMER_RETURN_DATA>;
  customerReturns: ComputedProperty<CUSTOMER_RETURNS_DATA>;
  error: ComputedProperty<UseCustomerReturnsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseUserErrors extends UseUserErrorsBase {
  cart: Error;
  logInWithAmazon: Error;
  linkAmazon: Error;
}

export interface UseUser<USER, UPDATE_USER_PARAMS, API extends PlatformApi = any> extends UseUserBase<USER, UPDATE_USER_PARAMS, API> {
  context: ComputedProperty<string>;
  updateContext: () => void;
  token: ComputedProperty<string>;
  updateToken: () => void;
  setToken: (token: string) => void;
  mergeCart: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  logInWithAmazon: (params: ComposableFunctionArgs<{ buyerToken: string }>) => Promise<void>;
  linkAmazon: (params: ComposableFunctionArgs<{ buyerToken: string; password: string; }>) => Promise<void>;
}

export interface UsePaypalExpressErrors {
  createToken: Error;
}

export interface UsePaypalExpress<OUTPUT, PARAMS, API extends PlatformApi = any> extends Composable<API> {
  createToken: (params: PARAMS) => Promise<OUTPUT>;
  result: ComputedProperty<OUTPUT>;
  error: ComputedProperty<UsePaypalExpressErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGuestRequestReturnErrors {
  requestReturn: Error;
}

export interface UseGuestRequestReturn<REQUEST_RETURN_DATA, REQUEST_RETURN_PARAMS> {
  requestReturn: (params: ComposableFunctionArgs<REQUEST_RETURN_PARAMS>) => Promise<void>;
  result: ComputedProperty<REQUEST_RETURN_DATA>;
  error: ComputedProperty<UseGuestRequestReturnErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGuestRmaErrors {
  load: Error;
}

export interface UseGuestRma<GUEST_RMA_DATA,
  GUEST_RMA_PARAMS,
  API extends PlatformApi = any,
> extends Composable<API> {
  load: (params: ComposableFunctionArgs<GUEST_RMA_PARAMS>) => Promise<void>;
  result: ComputedProperty<GUEST_RMA_DATA>;
  error: ComputedProperty<UseGuestRmaErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGuestRmaListErrors {
  load: Error;
}

export interface UseGuestRmaList<GUEST_RMA_LIST_DATA,
  GUEST_RMA_LIST_PARAMS,
  API extends PlatformApi = any,
> extends Composable<API> {
  load: (params: ComposableFunctionArgs<GUEST_RMA_LIST_PARAMS>) => Promise<void>;
  result: ComputedProperty<GUEST_RMA_LIST_DATA>;
  error: ComputedProperty<UseGuestRmaListErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseMakeOrderErrors extends UseMakeOrderErrorsBase {
  setPaymentAndMake: Error;
  completeAmazonPay: Error;
}

export interface UseMakeOrder<ORDER, PAYMENT_METHOD, API extends PlatformApi = any> extends UseMakeOrderBase<ORDER, API> {
  setPaymentAndMake: (params: ComposableFunctionArgs<{ paymentMethod: PAYMENT_METHOD }>) => Promise<void>;
  completeAmazonPay: (params: ComposableFunctionArgs<{ amazonSessionId: string }>) => Promise<void>;
  error: ComputedProperty<UseMakeOrderErrors>;
}

export interface UseDeliveryTimeErrors {
  search: Error;
}

export interface UseDeliveryTime<DELIVERY_TIME, DELIVERY_TIME_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  search: (params: ComposableFunctionArgs<DELIVERY_TIME_SEARCH_PARAMS>) => Promise<void>;
  result: ComputedProperty<DELIVERY_TIME[]>;
  error: ComputedProperty<UseDeliveryTimeErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseAmazonPayErrors {
  loadConfig: Error;
  loadSession: Error;
  updateSession: Error;
}

export interface UseAmazonPay<CONFIG, SESSION, API extends PlatformApi = any> extends Composable<API> {
  reset: () => void;
  loadConfig: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  loadSession: (params?: ComposableFunctionArgs<{ amazonSessionId: string, queryTypes?: string[] }>) => Promise<void>;
  updateSession: (params?: ComposableFunctionArgs<{ amazonSessionId: string }>) => Promise<void>;
  sessionId: Ref<string>;
  config: ComputedProperty<CONFIG>;
  session: ComputedProperty<SESSION>;
  redirectUrl: ComputedProperty<string>;
  error: ComputedProperty<UseAmazonPayErrors>;
  loading: ComputedProperty<boolean>;
}
