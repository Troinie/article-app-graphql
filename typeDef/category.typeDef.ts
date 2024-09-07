import { gql } from "apollo-server-express";

// graphql
export const typeDefsCategory = gql`
    type Category {
        id: ID,
        title: String,
        avatar: String,
    }

    # lấy data 
    type Query {
        getListCategory: [Category],
        getCategory(id: ID): Category,
    }

    input CategoryInput {
        title: String,
        avatar: String,
    }

    # chứa câu lệnh thêm, sửa, xoá, ....
    type Mutation {
        createCategory(category: CategoryInput): Category,
        updateCategory(id: ID, category: CategoryInput): Category,
        deleteCategory(id: ID): String,
    }
`;
