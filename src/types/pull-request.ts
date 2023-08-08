export interface IReview {
    state: 'APPROVED' | 'COMMENTED' | string;
    lastEditedAt: string;
    createdAt: string;
    author: {
        login: string
    }
}

export interface IPullRequest {
    number: number;
    title: string;
    url: string;
    isDraft: boolean;
    lastEditedAt: string;
    createdAt: string;
    author: {
        login: string;
    }
    reviews: {
        nodes: IReview[]
    }
}

export interface IRepositoryResponse {
    repository: {
        name: string;
        owner: {
            login: string;
        }
        url: string;
        pullRequests: {
            nodes: IPullRequest[]
        }
    };
    viewer: {
        login: string;
    }
}
