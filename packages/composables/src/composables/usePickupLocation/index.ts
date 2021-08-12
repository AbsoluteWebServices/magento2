import {
  Context,
} from '@vue-storefront/core';
import { useCache } from '@absolute-web/vsf-cache';
import { PickupLocation, QueryPickupLocationsArgs } from '@vue-storefront/magento-api';
import { UsePickupLocationFactory, usePickupLocationFactory } from '../../factories/usePickupLocationFactory';
import { UsePickupLocation } from '../../types/composables';

const factoryParams: UsePickupLocationFactory<PickupLocation, QueryPickupLocationsArgs> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (context: Context, params): Promise<PickupLocation[]> => {
    const { data } = await context.$magento.api.pickupLocations(params);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.pickupLocations.items;
  },
};

const usePickupLocation: (cacheId?: string) => UsePickupLocation<PickupLocation, QueryPickupLocationsArgs> = usePickupLocationFactory<PickupLocation, QueryPickupLocationsArgs>(factoryParams);

export default usePickupLocation;
