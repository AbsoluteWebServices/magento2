import { Return } from '@vue-storefront/magento-api';

export interface CustomerReturnsGetters {
  getDate(customerReturn: Return): string;

  getOrderId(customerReturn: Return): string;

  getReturnId(customerReturn: Return): string;

  getStatus(customerReturn: Return): string;
}

export const getDate = (customerReturn: Return): string =>
  customerReturn?.created_at ? new Date(customerReturn.created_at).toLocaleDateString()) : ''

export const getOrderId = (customerReturn: Return): string =>
  customerReturn?.order?.number;

export const getReturnId = (customerReturn: Return): string =>
  customerReturn?.number;

export const getStatus = (customerReturn: Return): string => 
  customerReturn?.status.replaceAll('_', ' ').toLowerCase();

const customerReturnsGetters: CustomerReturnsGetters = {
  getDate,
  getOrderId,
  getReturnId,
  getStatus,
};

export default customerReturnsGetters;
