let selectedRow = null; // Para armazenar a linha selecionada
let items = []; // Inicializa a variável items como um array vazio

// Função para carregar a tabela (exemplo)
function loadTable() {
    const tableBody = document.querySelector('#csv-table tbody');
    tableBody.innerHTML = ''; // Limpar a tabela

    items.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.date}</td>
            <td>${item.quantity}</td>
            <td>${item.won}</td>
            <td>${item.yang}</td>
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


        document.getElementById('item-quantity').value = cells[2].textContent;
        document.getElementById('item-won').value = cells[3].textContent;
        document.getElementById('item-yang').value = cells[4].textContent;

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
        cells[0].textContent = document.getElementById('item-name').value;
        cells[1].textContent = document.getElementById('item-date').value;
        cells[2].textContent = document.getElementById('item-quantity').value;
        cells[3].textContent = document.getElementById('item-won').value;
        cells[4].textContent = document.getElementById('item-yang').value;

        console.log('Alterações salvas:', {
            name: cells[0].textContent,
            date: cells[1].textContent,
            quantity: cells[2].textContent,
            won: cells[3].textContent,
            yang: cells[4].textContent,
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