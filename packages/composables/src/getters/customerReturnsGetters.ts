import { Return } from '@vue-storefront/magento-api';

export interface CustomerReturnsGetters {
  getCustomerEmail(customerReturn: Return): string;

  getDate(customerReturn: Return, locales: string, options: object): string;

  getOrderId(customerReturn: Return): string;

  getReturnId(customerReturn: Return): string;

  getReturnUid(customerReturn: Return): string;

  getStatus(customerReturn: Return): string;
}

export const getCustomerEmail = (customerReturn: Return): string => (customerReturn?.customer?.email ? customerReturn?.customer?.email : '');

export const getDate = (customerReturn: Return, locales: string, options: object): string =>
  customerReturn?.created_at ? new Date(customerReturn.created_at).toLocaleString(locales, options) : '';

export const getOrderId = (customerReturn: Return): string => (customerReturn?.order?.number ? customerReturn?.order?.number : '');

export const getReturnId = (customerReturn: Return): string => (customerReturn?.number ? customerReturn?.number : '');

export const getReturnUid = (customerReturn: Return): string => (customerReturn?.uid ? customerReturn?.uid : '');

export const getStatus = (customerReturn: Return): string =>
  customerReturn?.status ? customerReturn?.status.replaceAll('_', ' ').toLowerCase() : '';

const customerReturnsGetters: CustomerReturnsGetters = {
  getCustomerEmail,
  getDate,
  getOrderId,
  getReturnId,
  getReturnUid,
  getStatus,
};

export default customerReturnsGetters;
