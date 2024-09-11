let metas = JSON.parse(localStorage.getItem('metas')) || [];

const salvarMetas = () => {
    localStorage.setItem('metas', JSON.stringify(metas));
};

function showForm() {
    document.getElementById('form-section').classList.remove('hidden');
    document.getElementById('meta-list-section').classList.add('hidden');
    document.getElementById('menu').classList.add('hidden');
}

function listarMetas() {
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
    salvarMetas();
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
    salvarMetas();
}

function metasRealizadas() {
    const realizadas = metas.filter((meta) => meta.checked);
    if (realizadas.length === 0) {
        alert('Não existem metas realizadas!');
    } else {
        let mensagem = `Metas realizadas (${realizadas.length}):\n`;
        realizadas.forEach(meta => {
            mensagem += `>> ${meta.value}\n`;
        });
        alert(mensagem);
    }
}

function metasAbertas() {
    const abertas = metas.filter((meta) => !meta.checked);
    if (abertas.length === 0) {
        alert('Não existem metas em aberto!');
    } else {
        let mensagem = `Metas em aberto (${abertas.length}):\n`;
        abertas.forEach(meta => {
            mensagem += `>> ${meta.value}\n`;
        });
        alert(mensagem);
    }
}

function deletarMetas() {
    const deletarOpcoes = metas.map((meta, index) => {
        return {
            text: meta.value,
            id: index
        };
    });

    if (deletarOpcoes.length === 0) {
        alert('Não existem metas cadastradas para deletar!');
        return;
    }

    let mensagem = 'Selecione a meta que deseja deletar (Digite o número correspondente):\n';
    deletarOpcoes.forEach((meta, index) => {
        mensagem += `${index + 1}. ${meta.text}\n`;
    });

    const escolha = prompt(mensagem);

    if (escolha && !isNaN(escolha) && escolha > 0 && escolha <= deletarOpcoes.length) {
        const indexEscolhido = deletarOpcoes[escolha - 1].id;
        const metaDeletada = metas.splice(indexEscolhido, 1);
        salvarMetas();
        alert(`Meta "${metaDeletada[0].value}" deletada com sucesso!`);
        renderMetas();
    } else {
        alert('Escolha inválida!');
    }
}

function voltarParaMenu() {
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('meta-list-section').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
}

function sair() {
    alert('Até a próxima!');
}
