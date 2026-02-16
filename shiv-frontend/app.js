const API_BASE_URL = 'http://localhost:5000';

const button = document.getElementById('health-button');
const output = document.getElementById('health-output');

button.addEventListener('click', async () => {
  output.textContent = 'Checking backend...';

  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const text = await response.text();
    output.textContent = `Status: ${response.status}\nResponse: ${text}`;
  } catch (error) {
    output.textContent = `Unable to reach backend at ${API_BASE_URL}.\n${error.message}`;
  }
});
