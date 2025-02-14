/* istanbul ignore file */
import {
  ComposableFunctionArgs,
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  ProductReviewRatingMetadata,
  CreateProductReviewInput,
  CustomerProductReviewParams,
} from '@absolute-web/magento-api';
import { useReviewFactory, UseReviewFactoryParams } from '../../factories/useReviewFactory';

const factoryParams: UseReviewFactoryParams<any,
ComposableFunctionArgs<GetProductSearchParams>,
ComposableFunctionArgs<CustomerProductReviewParams>,
CreateProductReviewInput,
ProductReviewRatingMetadata> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params?: ComposableFunctionArgs<GetProductSearchParams>) => {
    Logger.debug('[Magento] search review params input:', JSON.stringify(params, null, 2));
    const {
      customQuery,
      signal,
      ...input
    } = params;

    const { data } = await context.$magento.getApi.productReview(input as GetProductSearchParams, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.products.items;
  },
  addReview: async (context: Context, params: ComposableFunctionArgs<CreateProductReviewInput>) => {
    Logger.debug('[Magento] add review params input:', JSON.stringify(params, null, 2));
    const {
      customQuery,
      signal,
      ...input
    } = params;

    const { data } = await context.$magento.api.createProductReview(input, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.createProductReview.review;
  },
  loadReviewMetadata: async (context: Context, params) => {
    Logger.debug('[Magento] load review metadata');

    const {
      customQuery,
      signal
    } = params;

    const { data } = await context.$magento.getApi.productReviewRatingsMetadata(undefined, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.productReviewRatingsMetadata.items;
  },
  loadCustomerReviews: async (
    context: Context,
    params?: ComposableFunctionArgs<CustomerProductReviewParams>,
  ) => {
    Logger.debug('[Magento] load customer review based on:', { params });
    const {
      customQuery,
      signal,
      ...input
    } = params;

    const { data } = await context.$magento.api.customerProductReview(input, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.customer;
  },
};

export default useReviewFactory<any,
ComposableFunctionArgs<GetProductSearchParams>,
ComposableFunctionArgs<CustomerProductReviewParams>,
CreateProductReviewInput,
ProductReviewRatingMetadata>(factoryParams);
