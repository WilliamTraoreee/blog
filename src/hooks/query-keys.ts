export const postKeys = {
	root: ['post'] as const,
	lists: () => [...postKeys.root, 'lists'] as const,
	details: () => [...postKeys.root, 'details'] as const,
	detail: (id: string) => [...postKeys.details(), id] as const,
	page: (page: number) => [...postKeys.lists(), page] as const,
	search: (query: string) => [...postKeys.lists(), query] as const,
};
