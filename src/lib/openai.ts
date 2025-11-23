export const buildPromptWithCompanies = (basePrompt: string, companies: string[]): string => {
	const companiesList = companies.map(c => `- ${c}`).join('\n');
	return `${basePrompt}\n${companiesList}`;
};

export const openChatGPT = (prompt: string): void => {
	const query = encodeURIComponent(prompt);
	window.open(`https://chat.openai.com/?q=${query}`, '_blank');
};
