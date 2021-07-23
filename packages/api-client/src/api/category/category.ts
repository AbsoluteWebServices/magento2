import gql from 'graphql-tag';
import CategoryData from '../../fragments/categoryDataFragment';
import CategoryUrlData from '../../fragments/categoryUrlData';
import CategoryChildData from '../../fragments/categoryChildDataFragment';

export default gql`
${CategoryData}
${CategoryUrlData}
${CategoryChildData}

query category($filters: CategoryFilterInput) {
  categoryList(filters: $filters) {
    ...CategoryData
    ...CategoryUrlData
    siblings {
      category_uid
      category_name
      category_level
      category_url_key
      category_url_path
    }
    children {
      ...CategoryChildData
      ...CategoryUrlData
      children {
        ...CategoryChildData
        ...CategoryUrlData
        children {
          ...CategoryChildData
          ...CategoryUrlData
          children {
            ...CategoryChildData
            ...CategoryUrlData
            children {
              ...CategoryChildData
              ...CategoryUrlData
              children {
                ...CategoryChildData
                ...CategoryUrlData
                children {
                  ...CategoryChildData
                  ...CategoryUrlData
                  children {
                    ...CategoryChildData
                    ...CategoryUrlData
                    children {
                      ...CategoryChildData
                      ...CategoryUrlData
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
