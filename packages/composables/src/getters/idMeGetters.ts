/* istanbul ignore file */
import { FocusIDmeCustomerData } from '@absolute-web/magento-api';

export interface IDmeGetters {
  getCustomerGroupData(customerData: FocusIDmeCustomerData, handle: string): string;

  getExpirationDate(customerData: FocusIDmeCustomerData): string;

  getExpirationDays(verifiedDate: string, graduationDate: string): number;

  getVerifiedDate(locales?: string): string;
}

export const getCustomerGroupData = (
  customerData: FocusIDmeCustomerData,
  handle: string,
): string => (customerData?.group_data && customerData?.group_data.length
  ? customerData.group_data.find((group) => group.handle === handle)
    ?.value || ''
  : '');

export const getExpirationDate = (
  customerData: FocusIDmeCustomerData,
  locales = 'en-US',
): string => {
  let graduationDate = customerData?.group_data && customerData?.group_data.length
    ? customerData.group_data.find(
      (group) => group.handle === 'student_anticipated_graduation_date',
    )?.value || null
    : null;

  if (/\d{2}\/\d{4}/.test(graduationDate)) {
    const [month, year] = graduationDate.split('/');
    graduationDate = `${year}-${month}-01`;
  }

  return graduationDate
    ? new Intl.DateTimeFormat(locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(graduationDate))
    : '';
};

export const getExpirationDays = (
  verifiedDate: string,
  graduationDate: string,
): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  const verifiedDateNumber = Number(new Date(verifiedDate));
  const graduationDateNumber = Number(new Date(graduationDate));

  return !Number.isNaN(verifiedDateNumber) && !Number.isNaN(graduationDateNumber)
    ? Math.round(Math.abs((verifiedDateNumber - graduationDateNumber) / oneDay))
    : null;
};

export const getVerifiedDate = (locales = 'en-US'): string => new Date().toLocaleDateString(locales);

const idMeGetters: IDmeGetters = {
  getCustomerGroupData,
  getExpirationDate,
  getExpirationDays,
  getVerifiedDate,
};

export default idMeGetters;
