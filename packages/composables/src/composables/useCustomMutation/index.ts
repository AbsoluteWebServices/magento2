import { Context, Logger } from '@absolute-web/vsf-core';
import { FetchPolicy } from '../../types';
import { useCustomMutationFactory } from '../../factories/useMutationQueryFactory';

export default useCustomMutationFactory({
  mutation: async (context: Context, {
    mutation,
    variables,
    fetchPolicy,
  }: {
    mutation: string,
    variables: any,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug('[Magento] Custom API Mutation', { variables });
    Logger.error('useCustomMutation REMOVED');
  },
});
