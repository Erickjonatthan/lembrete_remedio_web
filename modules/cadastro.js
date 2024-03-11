import { cadastrarUsuario } from './services/userServices.js';
import { previewImage as _previewImage } from './utils/previewImage.js';

window.previewImage = _previewImage;


document.querySelector('form').addEventListener('submit', cadastrarUsuario);



