import {
  Composable,
  ComposableFunctionArgs,
  ComputedProperty,
  Context,
  CustomQuery,
  UseCart as UseCartBase,
  UseCartErrors as UseCartErrorsBase,
} from '@absolute-web/vsf-core';
import { ComputedRef, computed } from '@vue/composition-api';
import { PlatformApi, UseProductErrors } from '@absolute-web/vsf-core/lib/src/types';
import { FetchPolicy } from '@apollo/client/core';

export type CustomQueryParams = { customQuery?: CustomQuery; [ k: string]: any };

export interface UseUrlResolver<ROUTE, API extends PlatformApi = any> extends Composable<API>{
  search: (url: string) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseExternalCheckout<API extends PlatformApi = any> extends Composable<API>{
  initializeCheckout: (baseUrl: string) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
}

export interface UseCategorySearch<CATEGORY, API extends PlatformApi = any> extends Composable<API>{
  search: (params: { term: string }) => Promise<CATEGORY[]>;
  result: ComputedProperty<CATEGORY[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}

export interface UseCountrySearch<COUNTRIES, COUNTRY, API extends PlatformApi = any> extends Composable<API> {
  load: () => Promise<COUNTRIES[]>;
  search: (params: { id: string }) => Promise<COUNTRY>;
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
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UseContentErrors {
  content: Error;
  blocks: Error;
}

export interface UseContent<PAGE, BLOCK, API extends PlatformApi = any> extends Composable<API>{
  page: ComputedProperty<PAGE>;
  blocks: ComputedProperty<BLOCK[]>
  loadContent: (identifier: string) => Promise<void>;
  loadBlocks: (identifiers: string[]) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}

export interface UseGetShippingMethods<SHIPPING_METHOD, API extends PlatformApi = any> extends Composable<API>{
  state: ComputedProperty<SHIPPING_METHOD[]>;

  setState(state: SHIPPING_METHOD[]): void;

  load: (params: { cartId: string }) => Promise<SHIPPING_METHOD[]>;
  result: ComputedProperty<SHIPPING_METHOD[]>;
  error: ComputedProperty<UseGetShippingMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetShippingMethodsErrors {
  load: Error;
}

export interface UsePaymentProviderErrors {
  load: Error;
  save: Error;
}

export interface UsePaymentProvider<STATE, PAYMENT_METHOD, API extends PlatformApi = any> extends Composable<API>{
  error: ComputedProperty<UsePaymentProviderErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;

  setState(state: STATE): void;

  load(): Promise<void>;

  load(params: { customQuery?: CustomQuery }): Promise<void>;

  save(params: { paymentMethod: PAYMENT_METHOD, customQuery?: CustomQuery }): Promise<void>;
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

export interface UseGuestUser<GUEST_USER, API extends PlatformApi = any> extends Composable<API>{
  guestUser: ComputedProperty<GUEST_USER>;
  setGuestUser: (user: GUEST_USER) => void;
  attachToCart: (params: { user: UseGuestUserRegisterParams }) => Promise<void>;
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
  API extends PlatformApi = any> extends Composable<API>{
  search(params?: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;

  loadCustomerReviews(params?: ComposableFunctionArgs<REVIEWS_USER_SEARCH_PARAMS>): Promise<void>;

  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;

  loadReviewMetadata(): Promise<void>;

  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  metadata: ComputedProperty<REVIEW_METADATA[]>;
  loading: ComputedProperty<boolean>;

  [x: string]: any;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}

export interface UseNewsletter<UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends Composable<API>{
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: { email: UPDATE_NEWSLETTER_PARAMS }) => Promise<void>;
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
  load: (loadParams?: LOAD_ADDRESS_PARAMS) => Promise<void>,
  save: (saveParams: SAVE_ADDRESS_PARAMS) => Promise<void>,
  remove: (removeParams: REMOVE_ADDRESS_PARAMS) => Promise<void>,
  update: (updateParams: UPDATE_ADDRESS_PARAMS) => Promise<void>,
}

export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

export interface UseForgotPassword<RESULT> {
  result: ComputedProperty<RESULT>;
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
  setQueryString: (newQueryString: string) => void;
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
  error: ComputedProperty<UseUpsellProductsErrors>;
  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  query: Error;
}

export interface UseCustomMutation<MUTATION, MUTATION_VARIABLES, MUTATION_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setMutationString: (newMutationString: string) => void;
  mutationString: ComputedProperty<MUTATION>;
  mutation: ({
    variables,
    fetchPolicy,
  }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => Promise<MUTATION_RETURN>;
  result: ComputedProperty<MUTATION_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  query: Error;
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
  addItem: (
    params: {
      product: PRODUCT;
      quantity: any;
      enteredOptions?: any;
      customQuery?: CustomQuery;
    }
  ) => Promise<void>;
  addItems: (
    params: {
      products: {
        product: PRODUCT;
        quantity: any;
        enteredOptions?: any;
      }[];
      customQuery?: CustomQuery;
    }
  ) => Promise<void>;
  checkGiftCard(params: {
    giftCardCode: string;
  }): Promise<GIFT_CARD_ACCOUNT>;
  applyGiftCard(params: {
    giftCardCode: string;
    customQuery?: CustomQuery;
  }): Promise<void>;
  removeGiftCard(params: {
    giftCardCode: string;
    customQuery?: CustomQuery;
  }): Promise<void>;
  focusSetGroupOnItem(params: {
    product: CART_ITEM;
    groupType: string;
  }): Promise<void>;
  focusUpdateCartGroup(params: {
    groupType: string; data: any
  }): Promise<void>;
  focusUnsetPickupDate: (params: {
    currentCart: CART
  }) => Promise<void>;
  error: ComputedProperty<UseCartErrors>;
}

export interface UsePickupLocationErrors {
  search: Error;
}

export interface UsePickupLocation<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS> {
  search: (params: PICKUP_LOCATION_SEARCH_PARAMS) => Promise<PICKUP_LOCATION[]>;
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
  load: (params) => Promise<SHIPPING_METHOD[]>;
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
  load: (params: { uid: string; customQuery?: any }) => Promise<void>;
  loadCustomerCompareList: (params?: { customQuery?: any }) => Promise<void>;
  create: (params: { products: PRODUCT[]; customQuery?: any }) => Promise<void>;
  clear: (params?: { customQuery?: any }) => Promise<boolean>;
  assignToCustomer: (params?: { customQuery?: any }) => Promise<void>;
  addItems: (
    params: {
      products: PRODUCT[];
      customQuery?: CustomQuery;
    }
  ) => Promise<void>;
  removeItems: (params: { products: PRODUCT[]; customQuery?: CustomQuery }) => Promise<void>;
  isInCompareList: (params: { product: PRODUCT }) => boolean;
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

export interface UseProductAttributeErrors {
  load: Error;
}

export interface UseProductAttribute<PRODUCT_ATTRIBUTE> {
  load: (code: string) => Promise<void>;
  result: ComputedProperty<PRODUCT_ATTRIBUTE>;
  error: ComputedProperty<UseProductAttributeErrors>;
  loading: ComputedProperty<boolean>;
}
