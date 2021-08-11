import {
  Context,
} from '@vue-storefront/core';
import { PickupLocation, QueryPickupLocationsArgs } from '@vue-storefront/magento-api';
import { UsePickupLocationFactory, usePickupLocationFactory } from '../../factories/usePickupLocationFactory';
import { UsePickupLocation } from '../../types/composables';

const factoryParams: UsePickupLocationFactory<PickupLocation, QueryPickupLocationsArgs> = {
  search: async (context: Context, params): Promise<PickupLocation[]> => {
    const { data } = await context.$magento.api.pickupLocations(params);

    return data.pickupLocations.items;
  },
};

const usePickupLocation: (cacheId?: string) => UsePickupLocation<PickupLocation, QueryPickupLocationsArgs> = usePickupLocationFactory<PickupLocation, QueryPickupLocationsArgs>(factoryParams);

export default usePickupLocation;
