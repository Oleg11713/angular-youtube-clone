export interface IPlaylistItem {
    snippet: {
        publishedAt: string,
        title: string,
        channelTitle: string,
        playlistId: string,
        resourceId: {
            videoId: string
        }
        thumbnails: {
            high: {
                url: string
            }
        }
    }
}
