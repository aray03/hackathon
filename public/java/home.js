console.log('home.js has been loaded and requested correctly');

// Alias React.createElement to 'e' to make the code cleaner
const e = React.createElement;

function PhotoUpload() {
    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            console.log("Server response:", result);
            //alert("Upload successful!");
        } catch (error) {
            console.error("Upload failed:", error);
            //alert("Failed to upload image.");
        }
    };

    return e('div', { className: 'container' },
        e('h2', null, 'Upload Image'),
        e('form', { onSubmit: handleSubmit, id: 'uploadForm' },
            
            // File Input Group
            e('div', { className: 'form-group' },
                e('label', { htmlFor: 'imageInput' }, 'Choose an image:\n'),
                e('input', {
                    type: 'file',
                    id: 'imageInput',
                    name: 'image',
                    accept: 'image/*',
                    onChange: handleFileChange,
                    required: true
                })
            ),
            
            // Image Preview (only render if 'preview' state is not null)
            preview ? e('div', { style: { marginTop: '15px', marginBottom: '15px' } },
                e('img', { 
                    id: 'preview', 
                    src: preview, 
                    alt: 'Upload Preview', 
                    style: { maxWidth: '300px', borderRadius: '8px' } 
                })
            ) : null,
            
            // Submit Button
            e('button', { type: 'submit', className: 'btn btn-primary', style: { marginTop: '10px' } }, 'Upload Image')
        )
    );
}

// Mount the React application to the DOM
const rootContainer = document.getElementById('react-root');
const root = ReactDOM.createRoot(rootContainer);
root.render(e(PhotoUpload));