// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const baseApiUrl: string = 'https://www.googleapis.com/youtube/v3/';

export const environment = {
    production: false,
    endpoints: {
        commentThreads: {
            getComments: `${baseApiUrl}commentThreads?part=snippet`,
        },
        channel: {
            getChannel: `${baseApiUrl}channels?part=snippet,brandingSettings,statistics`,
        },
        channelSections: {
            getChannelSections: `${baseApiUrl}channelSections?part=snippet,contentDetails`,
        },
        playlists: {
            getPlaylists: `${baseApiUrl}playlists?maxResults=10&part=snippet,contentDetails`,
            getPlaylistItems: `${baseApiUrl}playlistItems?part=contentDetails,snippet`,
        },
        search: {
            getVideoBySearchingByKeyword: `${baseApiUrl}search?part=snippet&maxResults=25`,
            getRelatedVideos: `${baseApiUrl}search?part=snippet&maxResults=25&type=video`,
        },
        videos: {
            getVideo: `${baseApiUrl}videos?part=snippet,statistics`,
        },
        categories: {
            getCategories: `${baseApiUrl}videoCategories?part=snippet&regionCode=BY`,
        },
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
