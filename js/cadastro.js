
// função que será chamada quando o usuário selecionar uma imagem
function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('imagePreview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// ------------------------------------------------------------------------------
document.querySelector('form').addEventListener('submit', function (event) {
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

        fetch('http://localhost:8080/cadastro', {
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
});

function encoder(imageFile) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onloadend = function() {
            var base64Image = reader.result.split(',')[1];
            resolve(base64Image);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    });
}


