export const renderCompanies = (companies: string[], container: HTMLElement): void => {
	if (companies.length === 0) {
		container.innerHTML = '<div class="empty-state">No hay empresas agregadas</div>';
		return;
	}

	container.innerHTML = companies.map((company, index) => `
		<div class="company-item">
			<span class="company-number">${index + 1}.</span>
			<span class="company-name">${company}</span>
			<div class="company-actions">
				<button class="btn-icon btn-edit" onclick="window.editCompany(${index})" title="Editar">
					<i class="ph ph-pencil"></i>
				</button>
				<button class="btn-icon btn-delete" onclick="window.deleteCompany(${index})" title="Eliminar">
					<i class="ph ph-trash"></i>
				</button>
			</div>
		</div>
	`).join('');
};

export const showAlert = (message: string): void => alert(message);
