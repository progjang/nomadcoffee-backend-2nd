import { gql } from "apollo-server"

export default gql`
    scalar Upload,
    type ResolverResult{
        ok: Boolean!,
        error: String
    }
`;