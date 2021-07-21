import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';
import { htmlDecode } from '../../helpers/htmlDecoder';

const getChildrenUids = (category: Category) => {
  if(!Array.isArray(category.children) || category.children.length < 1) {
    return [];
  }

  return category
    .children
    .reduce((acc, curr) => [...acc, curr.uid, ...getChildrenUids(curr)], [])
};

const getChildrenProductCount = (category: Category) => {
  if(!Array.isArray(category.children) || category.children.length < 1) {
    return 0;
  }

  return category
  .children
  .reduce((acc, curr) => acc + curr.product_count + getChildrenProductCount(curr), 0)
};

const buildTree = (rootCategory: Category, currentCategory: string, withProducts = false): AgnosticCategoryTree => {
  const hasChildren = Array.isArray(rootCategory.children) && rootCategory.children.length > 0;
  const isCurrent = rootCategory.uid === currentCategory;
  const label = htmlDecode(rootCategory.name);
  const slug = `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`;
  const childrenUid = getChildrenUids(rootCategory);
  const childProductCount = getChildrenProductCount(rootCategory);

  const items = hasChildren
    ? rootCategory
      .children
      .filter((c) => (withProducts ? c.product_count > 0 : true))
      .map((c) => buildTree(c, currentCategory))
    : [];

  return {
    label,
    slug,
    uid: [rootCategory.uid, ...childrenUid],
    items,
    count: childProductCount || rootCategory.product_count,
    isCurrent,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTree = (category: Category): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }
  return buildTree(category, '');
};

export const getCategoryTree = (
  category: Category,
  currentCategory: string = '',
  withProducts = false,
): AgnosticCategoryTree | null => (
  category
    ? buildTree(category, currentCategory, withProducts)
    : null
);

export const getCategoryBreadcrumbs = (category: Category): AgnosticBreadcrumb[] => {
  let breadcrumbs = [];

  if (!category) {
    return [];
  }

  if (Array.isArray(category?.breadcrumbs)) {
    breadcrumbs = category.breadcrumbs.map((breadcrumb) => ({
      text: breadcrumb.category_name,
      link: `/${breadcrumb.category_url_path}${category.url_suffix || ''}`,
    } as AgnosticBreadcrumb));
  }

  breadcrumbs.push({
    text: category.name,
    link: `/${category.url_path}${category.url_suffix || ''}`,
  } as AgnosticBreadcrumb);

  return breadcrumbs;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree,
  getBreadcrumbs: getCategoryBreadcrumbs,
  getCategoryTree,
};

export default categoryGetters;
