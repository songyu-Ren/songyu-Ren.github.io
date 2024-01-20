
// Function to load data from JSON and display it on the webpage
function loadData() {
    fetch('./data/personal_data.json')
    .then(response => response.json())
    .then(data => {
        displayExperiences(data.experiences);
        displayEducation(data.education);
    })
    .catch(error => console.error('Error:', error));
}

function displayExperiences(experiences) {
    const experienceSection = document.getElementById('experience-section');
    experiences.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.innerHTML = `
            <h3>${exp.title} at ${exp.company}</h3>
            <p>${exp.duration}</p>
            <p>${exp.description}</p>
        `;
        experienceSection.appendChild(expDiv);
    });
}

function displayEducation(education) {
    const educationSection = document.getElementById('education-section');
    education.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.innerHTML = `
            <img src="${edu.logo}" alt="${edu.institution}" height="100">
            <p><a href="${edu.link}" target="_blank">${edu.institution}</a>, ${edu.degree}, ${edu.years}</p>
        `;
        educationSection.appendChild(eduDiv);
    });
}

window.onload = loadData;
