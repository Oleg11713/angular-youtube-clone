export interface ISnippet {
    title: string,
    publishedAt: string,
    description: string,
    country: string,
    thumbnails: {
        default: {
            url: string
        }
    }
}

export interface IChannel {
    snippet: ISnippet;
    id: string;
    statistics: {
        subscriberCount: number,
        viewCount: number
    };
    brandingSettings: {
        image: {
            bannerExternalUrl: string
        }
    };
}
