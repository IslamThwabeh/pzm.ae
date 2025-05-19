// store-status.js
function loadBusinessHours() {
    const hoursDivs = document.querySelectorAll('.hours');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ1aZJvMBtXz4RLrOI1vITjBU&fields=opening_hours&key=AIzaSyBcD7hYodf1KBgvfejaxk9Lk-vVEcV1go8`;
	// store-status.js
	const apiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ1aZJvMBtXz4RLrOI1vITjBU&fields=opening_hours&key=AIzaSyBcD7hYodf1KBgvfejaxk9Lk-vVEcV1go8`;

    // Fallback hours
    const fallbackHtml = `
        <h4>Business Hours</h4>
        <p>Monday-Friday: 10:00 AM - 10:00 PM</p>
        <p>Saturday-Sunday: 10:00 AM - 11:00 PM</p>
    `;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.result?.opening_hours?.weekday_text) {
                const hoursHtml = `
                    <h4>Business Hours</h4>
                    ${data.result.opening_hours.weekday_text.map(day => `<p>${day}</p>`).join('')}
                `;
                hoursDivs.forEach(div => div.innerHTML = hoursHtml);
            }
        })
        .catch(error => {
            console.error('Error loading business hours:', error);
            hoursDivs.forEach(div => div.innerHTML = fallbackHtml);
        });
}

document.addEventListener('DOMContentLoaded', loadBusinessHours);