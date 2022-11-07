export interface ISnippetPlaylist {
    title: string,
    description: string,
    channelTitle: string,
    thumbnails: {
        default: {
            url: string
        }
    }
}

export interface IPlaylist {
    id: string,
    snippet: ISnippetPlaylist,
    contentDetails: {
        itemCount: number
    }
}
