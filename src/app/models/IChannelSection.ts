export interface IChannelSection {
    snippet: {
        type: string,
        title: string
    },
    contentDetails: {
        playlists: string[],
        channels: string[]
    }
}
