export default interface IRepository {
    url: string;
    repo: string;
    owner: string;
    enabled: boolean;
}

export type Repositories = IRepository[];
