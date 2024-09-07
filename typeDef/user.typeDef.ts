import { gql } from "apollo-server-express";

// graphql
export const typeDefsUser = gql`
    type User {
        id: ID,
        fullName: String,
        email: String,
        token: String,
        code: Int,
        message: String,
    }

    type Query {
        getUser: User
    }

    input RegisterUserInput {
        fullName: String,
        email: String,
        password: String,
    }

    input loginUserInput {
        email: String,
        password: String,
    }

    # chứa câu lệnh thêm, sửa, xoá, ....
    type Mutation {
        registerUser(user: RegisterUserInput): User,
        loginUser(user: loginUserInput): User
    }
`;
