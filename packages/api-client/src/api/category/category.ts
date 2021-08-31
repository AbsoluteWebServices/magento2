import gql from 'graphql-tag';
import CategoryData from '../../fragments/categoryDataFragment';
import CategoryUrlData from '../../fragments/categoryUrlData';
import CategoryChildData from '../../fragments/categoryChildDataFragment';

export default gql`
${CategoryData}
${CategoryUrlData}
${CategoryChildData}

query category($id: Int) {
  category(id: $id) {
    ...CategoryData
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
