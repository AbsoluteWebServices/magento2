import {
  ComposableFunctionArgs,
  ComputedProperty,
  CustomQuery,
  UseCart as UseCartBase,
  UseCartErrors as UseCartErrorsBase,
} from '@vue-storefront/core';
import { ComputedRef } from 'vue-demi';

export type CustomQueryParams = { customQuery?: CustomQuery; [ k: string]: any };

export interface UseUrlResolver<ROUTE> {
  search: (url: string) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseExternalCheckout {
  initializeCheckout: (baseUrl: string) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
}

export interface UseCategorySearch<CATEGORY> {
  search: (params: { term: string }) => Promise<CATEGORY[]>;
  result: ComputedProperty<CATEGORY[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}

export interface UseCountrySearch<COUNTRIES, COUNTRY> {
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

export interface UseConfig<CONFIG> {
  config: ComputedRef<CONFIG>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UseContent<PAGE> {
  page: ComputedProperty<PAGE>;
  loadContent: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetShippingMethods<SHIPPING_METHOD> {
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

export interface UsePaymentProvider<STATE, PAYMENT_METHOD> {
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

export interface UseGuestUser<GUEST_USER> {
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

export interface UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEWS_USER_SEARCH_PARAMS, REVIEW_ADD_PARAMS, REVIEW_METADATA> {
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

export interface UseNewsletter<UPDATE_NEWSLETTER_PARAMS> {
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
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams> {
  error: ComputedProperty<UseAddressesErrors>;
  loading: ComputedProperty<boolean>;
  addresses: ComputedProperty<ADDRESS[]>;
  load: (loadParams?: LOAD_ADDRESS_PARAMS) => Promise<void>,
  save: (saveParams: SAVE_ADDRESS_PARAMS) => Promise<void>,
  remove: (removeParams: REMOVE_ADDRESS_PARAMS) => Promise<void>,
  update: (updateParams: UPDATE_ADDRESS_PARAMS) => Promise<void>,
}

export interface UseCartErrors extends UseCartErrorsBase {
  applyGiftCard: Error;
  removeGiftCard: Error;
  focusSetGroupOnItem: Error;
  focusUpdateCartGroup: Error;
}

export interface UseCart<CART, CART_ITEM, PRODUCT, COUPON, GIFT_CARD> extends UseCartBase<CART, CART_ITEM, PRODUCT, COUPON> {
  addItem: (
    params: {
      product: PRODUCT;
      quantity: any;
      enteredOptions?: any;
      customQuery?: CustomQuery;
    }
  ) => Promise<void>;
  applyGiftCard(params: {
      giftCardCode: string;
      customQuery?: CustomQuery;
  }): Promise<void>;
  removeGiftCard(params: {
      giftCard: GIFT_CARD;
      customQuery?: CustomQuery;
  }): Promise<void>;
  focusSetGroupOnItem(params: {
    product: CART_ITEM;
    groupType: string;
  }): Promise<void>;
  focusUpdateCartGroup(params: {
    groupType: string; data: any
  }): Promise<void>;
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
