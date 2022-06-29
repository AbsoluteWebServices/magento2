import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import {
  FocusProductAttribute,
} from '@absolute-web/magento-api';
import {
  useProductAttributeFactory,
  UseProductAttributeFactoryParams,
} from '../../factories/useProductAttributeFactory';
import { UseProductAttribute } from '../../types/composables';

const factoryParams: UseProductAttributeFactoryParams<FocusProductAttribute> = {
  load: async (context: Context, params) => {
    Logger.debug('[Magento] product attribute with code ', params);

    const {
      customQuery,
      signal,
      code
    } = params;

    const { data } = await context
      .$magento
      .getApi
      .focusProductAttribute(code, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.focusProductAttribute;
  },
  loadList: async (context: Context, params) => {
    Logger.debug('[Magento] product attributes with codes ', params);

    const {
      customQuery,
      signal,
      codes
    } = params;

    const { data } = await context
      .$magento
      .getApi
      .focusProductAttributes(codes, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.focusProductAttributes;
  },
};

const useProductAttribute:
(cacheId?: string) => UseProductAttribute<FocusProductAttribute> = useProductAttributeFactory<FocusProductAttribute>(factoryParams);

export default useProductAttribute;
