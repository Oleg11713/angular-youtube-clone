export interface IVideoSnippet {
    title: string;
    description: string;
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    thumbnails: {
        high: {
            url: string;
        };
    };
}
