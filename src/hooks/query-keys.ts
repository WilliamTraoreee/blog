export const postKeys = {
	root: ['post'] as const,
	lists: () => [...postKeys.root, 'lists'] as const,
	details: () => [...postKeys.root, 'details'] as const,
	detail: (id: string) => [...postKeys.details(), id] as const,
};
