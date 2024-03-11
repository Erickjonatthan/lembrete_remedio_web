import { encoder } from '../utils/encoder.js';
import { API_URL } from '../consts/constants.js';

// Função para cadastrar um usuário
export function cadastrarUsuario(event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var perfilFoto = document.getElementById('perfilFoto').files[0];

    var base64String = null; // Define como null por padrão

    var encodeAndPost = async function () {
        if (perfilFoto) { // Verifica se um arquivo foi selecionado
            base64String = await encoder(perfilFoto);
        }

        var data = {
            nome: nome,
            email: email,
            senha: senha,
            dataNascimento: dataNascimento,
            perfilFoto: base64String
        };

        fetch(`${API_URL}/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
                console.log(data);
                window.location.href = "login.html";
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message); // Exibe um alerta com a mensagem de erro
            });
    }

    encodeAndPost();
}


// Função para fazer login
export function Login(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    fetch(`${API_URL}/login`, {
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
}