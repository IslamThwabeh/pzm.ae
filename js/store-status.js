// Fetch and display business hours
function loadBusinessHours() {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ1aZJvMBtXz4RLrOI1vITjBU&fields=opening_hours&key=AIzaSyBcD7hYodf1KBgvfejaxk9Lk-vVEcV1go8`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const hoursDivs = document.querySelectorAll('.hours');
            if (data.result && data.result.opening_hours) {
                const hoursHtml = data.result.opening_hours.weekday_text
                    .map(day => `<p>${day}</p>`)
                    .join('');
                
                hoursDivs.forEach(div => {
                    div.innerHTML = `<h4>Business Hours</h4>${hoursHtml}`;
                });
            }
        })
        .catch(error => {
            console.error('Error loading business hours:', error);
            hoursDivs.forEach(div => {
                div.innerHTML = '<p>Business hours not available</p>';
            });
        });
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', loadBusinessHours);