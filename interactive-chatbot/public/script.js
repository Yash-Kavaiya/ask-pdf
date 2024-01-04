document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const jobDescBtn = document.getElementById('jobDescBtn');
    const jobDescInput = document.getElementById('jobDescInput');
    const saveJobDescBtn = document.getElementById('saveJobDesc');
    const resumeInput = document.getElementById('resumeInput');
    const uploadResumeBtn = document.getElementById('uploadResume');
  
    jobDescBtn.addEventListener('click', () => {
      jobDescInput.classList.toggle('hidden');
    });
  
    saveJobDescBtn.addEventListener('click', async () => {
      const userId = document.getElementById('userId').value;
      const jobDesc = document.getElementById('jobDesc').value;
  
      try {
        const response = await fetch('/job-description', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, jobDescription: jobDesc })
        });
        const data = await response.json();
        output.textContent = data.message;
        jobDescInput.classList.add('hidden');
        resumeInput.classList.remove('hidden');
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    uploadResumeBtn.addEventListener('click', async () => {
      const userId = document.getElementById('userIdResume').value;
      const resumeFile = document.getElementById('resumeFile').files[0];
  
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('resume', resumeFile);
  
      try {
        const response = await fetch('/upload-resume', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        output.textContent = data.message;
        resumeInput.classList.add('hidden');
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  