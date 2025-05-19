document.addEventListener('DOMContentLoaded', () => {
  const photoUpload = document.getElementById('photoUpload');
  const taggingInterface = document.getElementById('taggingInterface');
  const photoPreview = document.getElementById('photoPreview');
  const uploadForm = document.getElementById('uploadForm');

  photoUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      photoPreview.innerHTML = '';
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const preview = document.createElement('div');
          preview.className = 'preview-item';
          preview.innerHTML = `<img src="${event.target.result}">`;
          photoPreview.appendChild(preview);
        };
        reader.readAsDataURL(file);
      });
      taggingInterface.style.display = 'block';
    }
  });

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('password', document.getElementById('adminPassword').value);
    formData.append('tags', document.getElementById('peopleTags').value);
    
    Array.from(photoUpload.files).forEach(file => {
      formData.append('photos[]', file);
    });

    try {
      const response = await fetch('/server/upload.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.text();
      alert(result);
      if (response.ok) {
        uploadForm.reset();
        taggingInterface.style.display = 'none';
      }
    } catch (error) {
      alert("Upload failed: " + error.message);
    }
  });
});