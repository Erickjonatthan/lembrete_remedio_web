let token = localStorage.getItem('token');
let userId = localStorage.getItem('userId');

let headers = new Headers();
headers.append('Authorization', `Bearer ${token}`);

fetch(`http://localhost:8080/cadastro/${userId}`, { headers })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                try {
                    return JSON.parse(text); 
                } catch {
                    throw new Error(text); 
                }
            });
        }
        return response.json();
    })
    .then(data => {
        let fotoPerfilBase64 = data.fotoPerfil;
        let outputImage = document.getElementById('outputImage');
        outputImage.src = 'data:image/png;base64,' + fotoPerfilBase64;
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });

// Função para obter dados do lembrete
function getReminderData(pageNumber) {
    fetch(`http://localhost:8080/lembretes?page=${pageNumber}`, { headers })
        .then(response => response.json())
        .then(data => {
            if (data.content.length === 0) {
                showNoRemindersMessage();
            } else {
                data.content.forEach(updateReminderData); // Atualiza a página para cada lembrete
            }
        })
        .catch(error => console.error('Error:', error));
}

// Função para atualizar os dados do lembrete na página
function updateReminderData(reminder) {
    const reminderTemplate = document.querySelector('.reminder-template');
    const reminderElement = reminderTemplate.cloneNode(true);
    reminderElement.style.display = 'block';
    reminderElement.querySelector('.start-date').textContent = reminder.dataInicio;
    reminderElement.querySelector('.medication-name').textContent = reminder.nomeMedicamento;
    reminderElement.querySelector('.time').textContent = reminder.horario;
    reminderElement.querySelector('.dosage').textContent = reminder.dosagem;
    reminderElement.querySelector('.hour-interval').textContent = reminder.intervaloHora;
    document.querySelector('.container').appendChild(reminderElement);
}

// Função para mostrar uma mensagem quando não há lembretes
function showNoRemindersMessage() {
    const messageElement = document.createElement('p');
    messageElement.textContent = 'Você não tem nenhum lembrete.';
    document.querySelector('.container').appendChild(messageElement);
}

// Chamar a função quando a página carregar
window.onload = () => getReminderData(0); // Começa na página 0