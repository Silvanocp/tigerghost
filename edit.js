let selectedRow = null; // Para armazenar a linha selecionada
let items = []; // Inicializa a variável items como um array vazio

document.addEventListener('DOMContentLoaded', function () {
    const itemClasse = document.getElementById('item-classe');
    const itemItem = document.getElementById('item-item');
    const itemItemType = document.getElementById('item-itemtype');

    // Dados para as opções da segunda e terceira caixas de seleção
    const secondOptions = {
        "Guerreiro": ['Espada', 'Arma 2 Mãos'], // Guerreiro
        "Ninja": ['Espada', 'Adaga', 'Arco', 'Flechas'], // Ninja
        "Sura": ['Espada'], // Sura
        "Shaman": ['Leque', 'Campainha'], // Shaman
        "Lycan": ['Garras'], // Lycan
        all: ['Montadas | Pets', 'Poções', 'Equipes', 'Joalharia', 'Upgrades', 'Pesca | Minerar', 'Alquimia', 'Disfarces', 'Skills', 'Itens Especiais', 'Outros']
    };

    const thirdOptions = {
        'Montadas | Pets': ['1', '2', '3'],
        'Equipes': ['Armadura', 'Elmo', 'Escudo', 'Luvas'],
        'Joalharia': ['Pulseira', 'Sapatos', 'Colar', 'Brincos', 'Cinto', 'Talisma'],
        'Upgrades': ['Upgrade 1', 'Upgrade 2'],
        'Pesca | Minerar': ['Peixe', 'Mineral'],
        'Alquimia': ['Diamante', 'Rubi', 'Jade', 'Safira', 'Granada', 'Ónix', 'Ametista', 'Outras'],
        'Disfarces': ['Disfarce 1', 'Disfarce 2'],
        'Poções': ['Adaga Curta', 'Adaga de Ouro'],
        'Skills': ['Skill 1', 'Skill 2'],
        'Itens Especiais': ['Item Especial 1'],
        'Outros': ['Outro 1', 'Outro 2'],
    };

    // Função para atualizar as opções do item com base na classe selecionada
    function updateItemSelect() {
        const selectedValue = itemClasse.value;
        console.log("Classe selecionada:", selectedValue); // Log da classe selecionada

        // Limpa as opções atuais de item e itemtype
        itemItem.innerHTML = '<option value="null">--</option>'; // Reseta as opções do item
        itemItemType.innerHTML = '<option value="null">--</option>'; // Reseta as opções do tipo de item

        // Adiciona opções relacionadas à classe selecionada
        if (selectedValue !== "null" && secondOptions[selectedValue]) {
            secondOptions[selectedValue].forEach(function (option) {
                const newOption = document.createElement('option');
                newOption.value = option;
                newOption.textContent = option;
                itemItem.appendChild(newOption);
                console.log("Adicionando item:", option); // Log do item adicionado
            });
        }

        // Adiciona todas as opções sempre
        secondOptions.all.forEach(function (option) {
            const newOption = document.createElement('option');
            newOption.value = option;
            newOption.textContent = option;
            itemItem.appendChild(newOption);
            console.log("Adicionando item 'all':", option); // Log do item 'all' adicionado
        });
    }

    // Função para atualizar o tipo de item com base no item selecionado
    function updateItemTypeSelect() {
        const selectedValue = itemItem.value;
        console.log("Item selecionado:", selectedValue); // Log do item selecionado

        // Limpa as opções do tipo de item
        itemItemType.innerHTML = '<option value="null">--</option>'; // Reseta as opções do tipo de item
        if (thirdOptions[selectedValue]) {
            thirdOptions[selectedValue].forEach(function (option) {
                const newOption = document.createElement('option');
                newOption.value = option;
                newOption.textContent = option;
                itemItemType.appendChild(newOption);
                console.log("Adicionando tipo de item:", option); // Log do tipo de item adicionado
            });
        }
    }

// Função para preencher os selects com dados de edição
function fillEditForm(data) {
    console.log("Preenchendo formulário de edição com os dados:", data); // Log dos dados a serem preenchidos

    // Preenche o select da classe
    itemClasse.value = data.classe; // Exemplo: "1", "2", etc.
    console.log("Classe selecionada:", itemClasse.value); // Log da classe selecionada
    updateItemSelect(); // Atualiza o item com base na classe

    // Preenche o select do item
    itemItem.value = data.item; // Exemplo: "Espada", "Adaga", etc.
    console.log("Item selecionado:", itemItem.value); // Log do item selecionado
    updateItemTypeSelect(); // Atualiza o tipo de item com base no item selecionado

    // Preenche o select do tipo de item
    itemItemType.value = data.itemType; // Exemplo: "Armadura", "Elmo", etc.
    console.log("Tipo de item selecionado:", itemItemType.value); // Log do tipo de item selecionado
}

// Exemplo de dados de edição a serem passados
const editData = {
    classe: "1",       // Exemplo: Guerreiro
    item: "Espada",    // Exemplo: Espada
    itemType: "Armadura" // Exemplo: Armadura
};

// Chama a função para preencher o formulário com dados de edição
fillEditForm(editData);

// Adiciona ouvintes de eventos para as seleções
itemClasse.addEventListener('change', updateItemSelect);
itemItem.addEventListener('change', updateItemTypeSelect);

// Chama a função uma vez ao carregar para garantir que as opções estejam atualizadas
updateItemSelect();
});



// Função para carregar a tabela (exemplo)
function loadTable() {
    const tableBody = document.querySelector('#csv-table tbody');
    tableBody.innerHTML = ''; // Limpar a tabela

    items.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>       <!-- Nome do Item -->
            <td>${item.data}</td>       <!-- Data -->
            <td>${item.quantidade}</td> <!-- Quantidade -->
            <td>${item.won}</td         <!-- Won -->
            <td>${item.yang}</td        <!-- Yang -->
            <td>${item.classe}</td      <!-- Classe -->
            <td>${item.item}</td        <!-- Item -->
            <td>${item.itemtype}</td    <!-- ItemType -->
            <td>${item.nivel}</td       <!-- Nível -->
            <td>${item.niveldoitem}</td <!-- Nível do Item -->
            <td>${item.won2}</td        <!-- Won2 -->
            <td>${item.yang2}</td       <!-- Yang2 -->
        `;
        
        // Adicionar o evento de clique na linha
        row.addEventListener('click', function() {
            console.log('Linha clicada:', row);
            
            // Remove a seleção de todas as linhas
            const selectedRows = document.querySelectorAll('#csv-table tr.selected');
            selectedRows.forEach(selectedRow => {
                selectedRow.classList.remove('selected');
            });
            
            // Adiciona a classe de seleção na linha clicada
            row.classList.add('selected');
            
            // Atualiza a linha selecionada
            selectedRow = row;

            // Habilitar o botão de editar
            document.getElementById('edit-selected').disabled = false;
        });

        tableBody.appendChild(row);
    });
}

// Função para abrir a área de edição
document.getElementById('edit-selected').onclick = function() {
    if (selectedRow !== null) {
        console.log('Editando a linha:', selectedRow);
        
        // Obtém os dados da linha selecionada diretamente de selectedRow
        const cells = selectedRow.querySelectorAll('td');
        
        // Preenche o formulário de edição com os dados da linha selecionada
        document.getElementById('item-name').value = cells[0].textContent;
        // Configurar a data atual e torná-la apenas leitura
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        document.getElementById('item-date').value = formattedDate; // Definir a data atual

        document.getElementById('item-quantity').value = cells[2].textContent; // Quantidade
        document.getElementById('item-won').value = cells[3].textContent; // Won
        document.getElementById('item-yang').value = cells[4].textContent; // Yang
        document.getElementById('item-classe').value = cells[5].textContent; // Classe
        document.getElementById('item-item').value = cells[6].textContent; // Item
        document.getElementById('item-itemtype').value = cells[7].textContent; // ItemType
        document.getElementById('item-nivel').value = cells[8].textContent; // Nível
        document.getElementById('item-niveldoitem').value = cells[9].textContent; // Nível do Item
        document.getElementById('item-won2').value = cells[10].textContent; // Won2
        document.getElementById('item-yang2').value = cells[11].textContent; // Yang2

        // Mostrar a área de edição
        document.getElementById('edit-area').style.display = 'block'; 

        // Configurar o evento de salvar o item
        document.getElementById('edit-form').onsubmit = function(event) {
            event.preventDefault(); // Prevenir o comportamento padrão do formulário
            saveItem();
        };
    } else {
        console.log('Nenhuma linha selecionada.');
    }
};

// Função para salvar as alterações
function saveItem() {
    if (selectedRow !== null) {
        const cells = selectedRow.querySelectorAll('td');
        
        // Atualizar os dados na linha selecionada diretamente
        cells[0].textContent = document.getElementById('item-name').value; // Nome do Item
        cells[1].textContent = document.getElementById('item-date').value; // Data
        cells[2].textContent = document.getElementById('item-quantity').value; // Quantidade
        cells[3].textContent = document.getElementById('item-won').value; // Won
        cells[4].textContent = document.getElementById('item-yang').value; // Yang
        cells[5].textContent = document.getElementById('item-classe').value; // Classe
        cells[6].textContent = document.getElementById('item-item').value; // Item
        cells[7].textContent = document.getElementById('item-itemtype').value; // ItemType
        cells[8].textContent = document.getElementById('item-nivel').value; // Nível
        cells[9].textContent = document.getElementById('item-niveldoitem').value; // Nível do Item
        cells[10].textContent = document.getElementById('item-won2').value; // Won2
        cells[11].textContent = document.getElementById('item-yang2').value; // Yang2

        console.log('Alterações salvas:', {
            name: cells[0].textContent,
            date: cells[1].textContent,
            quantity: cells[2].textContent,
            won: cells[3].textContent,
            yang: cells[4].textContent,
            classe: cells[5].textContent,
            item: cells[6].textContent,
            itemtype: cells[7].textContent,
            nivel: cells[8].textContent,
            niveldoitem: cells[9].textContent,
            won2: cells[10].textContent,
            yang2: cells[11].textContent,
        });

        // Ocultar a área de edição após salvar
        document.getElementById('edit-area').style.display = 'none';
    }
}

// Função para cancelar a edição
document.getElementById('cancel-edit').onclick = function() {
    console.log('Edição cancelada.');
    document.getElementById('edit-area').style.display = 'none'; // Ocultar a área de edição
};

// Carregar a tabela inicialmente
loadTable();