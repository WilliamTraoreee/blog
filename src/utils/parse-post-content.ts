import { PostContent } from '../types/post';
import { marked } from 'marked';

const spotifyRegex = new RegExp(
	/(https?:\/\/open.spotify.com\/.*\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|)).*/gm
);

const youtubeRegex = new RegExp(
	/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/i
);

const twitchRegex = new RegExp(
	/(?:https?:\/\/)?(?:www\.)?twitch\.tv\/[a-zA-Z0-9_]+/gm
);

const getSpotifyId = (content: string): string | undefined => {
	return spotifyRegex.exec(content)?.[0].split('/')[5].toString();
};

const getYoutubeId = (content: string): string | undefined => {
	return youtubeRegex
		.exec(content)?.[0]
		.split('/')[3]
		.split('?')[1]
		.split('=')[1]
		.toString();
};

const getTwitchId = (content: string): string | undefined => {
	const url = twitchRegex.exec(content)?.[0];
	if (url) {
		if (url.includes('https://')) {
			return url.split('/')[3];
		} else {
			return url.split('/')[1];
		}
	}
};

export const parsePostContent = (content: string): PostContent => {
	const textContentMarkdown = content
		.replace(spotifyRegex, '')
		.replace(youtubeRegex, '')
		.replace(twitchRegex, '');
	const textContentHTML = marked(textContentMarkdown);

	return {
		text: textContentHTML,
		spotifyId: getSpotifyId(content),
		youtubeId: getYoutubeId(content),
		twitchId: getTwitchId(content),
	};
};
