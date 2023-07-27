export default interface IRepository {
    url: string;
    repo: string;
    owner: string;
}

export type Repositories = IRepository[];
