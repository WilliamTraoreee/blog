import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export const useSpotify = (spotifyId: string) => {
	return useQuery({
		queryKey: ['spotify', spotifyId],
		queryFn: async () => {
			const data = await ky
				.get(`https://id-to-spotify.hello8286.workers.dev/${spotifyId}`)
				.text();

			return data;
		},
		staleTime: Infinity,
	});
};
