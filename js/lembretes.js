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