// Function to load data from JSON and display it on the webpage
function loadData() {
    fetch('../data/personal_data.json')
    .then(response => response.json())
    .then(data => {
        const page = window.location.pathname.split("/").pop();

        switch (page) {
            case "index.html":
            case "":
                displayProfile(data.profile);
                break;
            case "education.html":
                displayEducation(data.education);
                break;
            case "experience.html":
                displayExperiences(data.experiences);
                break;
            case "projects.html":
                displayProjects(data.projects);
                break;
            default:
                displayProfile(data.profile);
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayProfile(profile) {
    const photoElement = document.querySelector('.photo');
    const nameElement = document.querySelector('.name');
    const descriptionElement = document.querySelector('.description');
    const emailLink = document.querySelector('.email-link');
    const cvLink = document.querySelector('.cv-link');
    const linkedinLink = document.querySelector('.linkedin-link');
    const githubLink = document.querySelector('.github-link');

    photoElement.src = profile.photo; // Set the photo URL
    nameElement.textContent = profile.name;
    descriptionElement.textContent = profile.description;
    emailLink.href = `mailto:${profile.email}`;
    cvLink.href = profile.cvLink;
    linkedinLink.href = profile.linkedinLink;
    githubLink.href = profile.githubLink;
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
        // Create a div for the education item
        const eduDiv = document.createElement('div');
        eduDiv.classList.add('education-item');

        // Set innerHTML for the basic education info
        eduDiv.innerHTML = `
            <img src="${edu.logo}" alt="${edu.institution}" class="university-logo">
            <div class="education-details">
                <p class="education-institution">
                    <a href="${edu.link}" target="_blank">${edu.institution}</a>, ${edu.degree}, ${edu.years}
                </p>
            </div>
        `;

        // Create a div for projects if they exist
        if (edu.projects && edu.projects.length > 0) {
            const projectsDiv = document.createElement('div');
            projectsDiv.classList.add('education-projects');

            // Add each project to the projects div
            edu.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.innerHTML = `
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                `;
                projectsDiv.appendChild(projectDiv); // Append project to projects div
            });

            eduDiv.appendChild(projectsDiv); // Append projects div to education item
        }

        educationSection.appendChild(eduDiv); // Append education item to the main section
    });
}

window.onload = loadData;
