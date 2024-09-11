let metas = [];

function showForm() {
    document.getElementById('form-section').classList.remove('hidden');
    document.getElementById('meta-list-section').classList.add('hidden');
    document.getElementById('menu').classList.add('hidden');
}

function showMetas() {
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('meta-list-section').classList.remove('hidden');
    document.getElementById('menu').classList.add('hidden');
    renderMetas();
}

function addMeta() {
    const input = document.getElementById('new-meta');
    const errorMessage = document.getElementById('error-message');
    
    if (input.value.trim() === '') {
        errorMessage.textContent = 'A meta não pode ser vazia.';
        return;
    }

    metas.push({ value: input.value, checked: false });
    input.value = '';
    errorMessage.textContent = '';
    alert('Meta adicionada com sucesso!');
}

function renderMetas() {
    const metaList = document.getElementById('meta-list');
    metaList.innerHTML = '';

    metas.forEach((meta, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = meta.checked;
        checkbox.addEventListener('change', () => toggleMeta(index));

        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(meta.value));

        metaList.appendChild(listItem);
    });
}

function toggleMeta(index) {
    metas[index].checked = !metas[index].checked;
}

function voltarParaMenu() {
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('meta-list-section').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
}

function sair() {
    alert('Até a próxima!');
    // Você pode adicionar mais funcionalidade para realmente encerrar ou redirecionar
}
