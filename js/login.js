document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: email,
            senha: senha
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                try {
                    return JSON.parse(text); // Tenta analisar a resposta como JSON
                } catch {
                    throw new Error(text); // Se a resposta não for JSON, usa a resposta como está
                }
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.contaId);
        window.location.href = '/lembretes.html'; // Redireciona para a página de lembretes
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message); // Exibe um alerta com a mensagem de erro
    });
});