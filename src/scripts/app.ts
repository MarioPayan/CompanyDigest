import { getCompanies, saveCompanies } from '../lib/storage';
import { buildPromptWithCompanies, openChatGPT } from '../lib/openai';
import { renderCompanies, showAlert } from '../lib/ui';

export const initApp = (promptText: string): void => {
	let companies = getCompanies();
	let editingIndex = -1;

	const input = document.getElementById('companyInput') as HTMLInputElement;
	const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
	const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
	const companiesList = document.getElementById('companiesList') as HTMLElement;

	const render = () => renderCompanies(companies, companiesList);

	const addOrUpdate = () => {
		const name = input.value.trim();
		if (!name) return;

		if (editingIndex >= 0) {
			companies[editingIndex] = name;
			editingIndex = -1;
			addBtn.textContent = 'Agregar';
		} else {
			companies.push(name);
		}

		saveCompanies(companies);
		input.value = '';
		render();
	};

	const edit = (index: number) => {
		input.value = companies[index];
		editingIndex = index;
		addBtn.textContent = 'Actualizar';
		input.focus();
	};

	const remove = (index: number) => {
		companies.splice(index, 1);
		saveCompanies(companies);
		render();
	};

	const analyze = () => {
		if (companies.length === 0) {
			showAlert('Agrega al menos una empresa');
			return;
		}

		const fullPrompt = buildPromptWithCompanies(promptText, companies);
		openChatGPT(fullPrompt);
	};

	window.editCompany = edit;
	window.deleteCompany = remove;

	addBtn.addEventListener('click', addOrUpdate);
	input.addEventListener('keypress', (e) => e.key === 'Enter' && addOrUpdate());
	analyzeBtn.addEventListener('click', analyze);

	render();
};
