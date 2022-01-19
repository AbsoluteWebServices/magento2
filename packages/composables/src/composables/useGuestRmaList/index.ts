import { Context } from '@absolute-web/vsf-core';
import { Returns, FocusGuestRmaListInput } from '@absolute-web/magento-api';
import { UseGuestRma } from '../../types/composables';
import { UseGuestRmaFactoryParams, useGuestRmaFactory } from '../../factories/useGuestRmaFactory';

const factoryParams: UseGuestRmaFactoryParams<Returns, FocusGuestRmaListInput> = {
  load: async (context: Context, params: FocusGuestRmaListInput): Promise<Returns> => {
    const { data } = await context.$magento.api.focusGuestRmaList(params);

    return data;
  },
};

const useGuestRma: (cacheId?: string) => UseGuestRma<
Returns,
FocusGuestRmaListInput
> = useGuestRmaFactory<Returns, FocusGuestRmaListInput>(factoryParams);

export default useGuestRma;
