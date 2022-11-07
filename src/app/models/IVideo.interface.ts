import { IVideoSnippet } from './IVideoSnippet.interface';
import { IVideoStatistics } from './IVideoStatistics.interface';

export interface IVideo {
    id: string;
    snippet: IVideoSnippet;
    statistics: IVideoStatistics;
}
