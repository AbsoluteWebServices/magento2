import { Context, Logger } from '@vue-storefront/core';
import { FetchPolicy } from '../../types';
import {
  UseCustomMutationFactoryFactoryParams,
  useCustomMutationFactory
} from '../../factories/useMutationQueryFactory';

const factoryParams: UseCustomMutationFactoryFactoryParams<any, any> = {
  mutation: async (context: Context, {
    mutation,
    variables,
    fetchPolicy,
  }: {
    mutation: string,
    variables: any,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug('[Magento] Custom API Mutation', { variables });

    const result = await context.$magento.api.customMutation({
      mutation,
      mutationVariables: variables,
      fetchPolicy,
    });

    Logger.debug('[Custom Mutation -> Result]:', result);

    return result;
  },
};

export default useCustomMutationFactory<any, any>(factoryParams);
