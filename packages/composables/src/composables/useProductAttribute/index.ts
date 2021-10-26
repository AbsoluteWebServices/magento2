import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import { useCache } from '@absolute-web/vsf-cache';
import {
  FocusProductAttribute,
} from '@absolute-web/magento-api';
import {
  useProductAttributeFactory,
  UseProductAttributeFactoryParams,
} from '../../factories/useProductAttributeFactory';
import { UseProductAttribute } from '../../types/composables';

const factoryParams: UseProductAttributeFactoryParams<FocusProductAttribute> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  load: async (context: Context, code: string) => {
    Logger.debug('[Magento] product attribute with code ', { code });

    const { data } = await context
      .$magento
      .getApi
      .focusProductAttribute(code);

    Logger.debug('[Result]:', { data });

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.focusProductAttribute;
  },
};

const useProductAttribute:
(cacheId?: string) => UseProductAttribute<FocusProductAttribute> = useProductAttributeFactory<FocusProductAttribute>(factoryParams);

export default useProductAttribute;
