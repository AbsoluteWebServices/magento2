import { Context, Logger } from '@absolute-web/vsf-core';
import {
  useCustomQueryFactory,
} from '../../factories/useCustomQueryFactory';
import { FetchPolicy } from '../../types';

export default useCustomQueryFactory({
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
    Logger.error('useCustomQuery REMOVED');
  },
});
