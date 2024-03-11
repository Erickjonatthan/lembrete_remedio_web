export function encoder(imageFile) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onloadend = function () {
            var base64Image = reader.result.split(',')[1];
            resolve(base64Image);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    });
}