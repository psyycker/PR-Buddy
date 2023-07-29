import { gql } from 'graphql-request';

export const PULL_REQUESTS_QUERY = gql`
    query GetOpenPRs($owner: String!, $repo: String!) {
        viewer {
            login
        }
        repository(owner: $owner, name: $repo) {
            owner {
                login
            }
            name
            url
            pullRequests(states: OPEN, last: 100) {
                nodes {
                    number
                    title
                    url
                    state
                    isDraft
                    lastEditedAt
                    createdAt
                    author {
                        login
                    }
                    reviews(first: 100) {
                        nodes {
                            state,
                            author {
                                login
                            }
                        }
                    }
                }
            }
        }
    }
`;
