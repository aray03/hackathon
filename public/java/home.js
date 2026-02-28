console.log('home.js has been loaded and requested correctly');

// Alias React.createElement to 'e' to make the code cleaner
const e = React.createElement;

function PhotoUpload() {
    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const [result, setResult] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || isLoading) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            setIsLoading(true);
            setResult(null);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log("Upload response:", data);
            if (data.success) {
                console.log("Setting result with:", data.result);
                setResult(data.result);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            //alert("Failed to upload image.");
        } finally {
            setIsLoading(false);
        }
    };

    return e('div', { className: 'container' },
        e('h2', null, 'Upload Image of Trash'),
        e('form', { onSubmit: handleSubmit, id: 'uploadForm' },
            
            // File Input Group
            e('div', { className: 'form-group' },
                e('label', { htmlFor: 'imageInput' }, '\n'),
                e('input', {
                    type: 'file',
                    id: 'imageInput',
                    name: 'image',
                    accept: 'image/*',
                    onChange: handleFileChange,
                    disabled: isLoading,
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

            isLoading ? e('div', { className: 'loading-container' },
                e('div', { className: 'recycle-spinner', role: 'status', 'aria-live': 'polite' }, '♻️'),
                e('p', { className: 'loading-text' }, 'Analyzing image...')
            ) : null,

            // Display result if available
            result ? e('div', {
                className: 'result-container',
                style: { backgroundColor: result.color, color: 'white' }
            },
                e('h3', null, result.type),
                e('p', { className: 'result-message' }, result.message),
                e('div', { className: 'result-confidence' }, `Confidence: ${(result.confidence * 100).toFixed(1)}%`)
            ) : null,
            
            // Submit Button
            e('button', {
                type: 'submit',
                className: 'btn btn-primary',
                style: { marginTop: '10px' },
                disabled: isLoading
            }, isLoading ? 'Uploading...' : 'Upload Image')
        )
    );
}

// Mount the React application to the DOM
const rootContainer = document.getElementById('react-root');
const root = ReactDOM.createRoot(rootContainer);
root.render(e(PhotoUpload));