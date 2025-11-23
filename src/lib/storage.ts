const STORAGE_KEY = 'company-digest-list';

export const getCompanies = (): string[] => 
	JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const saveCompanies = (companies: string[]): void => 
	localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
