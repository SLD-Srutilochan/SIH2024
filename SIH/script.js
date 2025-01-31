// Function to update the sensor data on the webpage
function updateSensorData(data) {
    document.getElementById('temperature').textContent = data.temperature.toFixed(2);
    document.getElementById('humidity').textContent = data.humidity.toFixed(2);
    document.getElementById('soilMoistureRaw').textContent = data.soilMoistureRaw;
    document.getElementById('soilMoisturePercent').textContent = data.soilMoisturePercent.toFixed(2);

    updateChart(data);
}

// Simulate fetching data from Arduino
function fetchSensorData() {
    const mockData = {
        temperature: Math.random() * 30 + 10, // Random temp 10°C - 40°C
        humidity: Math.random() * 50 + 30,   // Random humidity 30% - 80%
        soilMoistureRaw: Math.floor(Math.random() * 1024),
        soilMoisturePercent: Math.random() * 100
    };

    updateSensorData(mockData);
}

// Fetch data every 2 seconds
setInterval(fetchSensorData, 2000);

// Initial fetch
fetchSensorData();

// Chart.js for sensor data visualization
const ctx = document.getElementById('sensorChart').getContext('2d');
const sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            borderColor: 'red',
            data: [],
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Update the chart with new data
function updateChart(data) {
    if (sensorChart.data.labels.length > 10) {
        sensorChart.data.labels.shift();
        sensorChart.data.datasets[0].data.shift();
    }
    
    sensorChart.data.labels.push(new Date().toLocaleTimeString());
    sensorChart.data.datasets[0].data.push(data.temperature);
    sensorChart.update();
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check if dark mode was enabled previously
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});
