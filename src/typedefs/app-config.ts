import {Repositories} from "./repositories.ts";

export default interface IAppConfig {
    githubToken: string;
    repositories: Repositories
}
