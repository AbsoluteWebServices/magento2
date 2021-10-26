import { Context, Logger } from '@absolute-web/vsf-core';
import {
  UseCustomQueryFactoryFactoryParams,
  useCustomQueryFactory,
} from '../../factories/useCustomQueryFactory';
import { FetchPolicy } from '../../types';

const factoryParams: UseCustomQueryFactoryFactoryParams<any, any> = {
  query: async (context: Context, {
    query,
    variables,
    fetchPolicy,
  }: {
    query: string,
    variables: any,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug('[Magento] Custom API Query', { variables });

    const result = await context.$magento.api.customQuery({
      query,
      queryVariables: variables,
      fetchPolicy,
    });

    Logger.debug('[Custom Query -> Result]:', result);

    return result;
  },
};

export default useCustomQueryFactory<any, any>(factoryParams);
