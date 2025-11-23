export {};

declare global {
	interface Window {
		editCompany: (index: number) => void;
		deleteCompany: (index: number) => void;
	}
}
