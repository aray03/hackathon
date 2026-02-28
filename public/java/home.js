console.log('home.js has been loaded and requested correctly')
const imageInput = document.getElementById('imageInput');
const uploadForm = document.getElementById('uploadForm');
const preview = document.getElementById('preview');


imageInput.addEventListener('change', () => {
    let img = imageInput.files[0]
    if (!img) {
        return;
    }
    preview.src = URL.createObjectURL(img);
});


