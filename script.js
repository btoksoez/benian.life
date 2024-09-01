// Timeline animation
const timeline = document.querySelector('.timeline');
const timelineLine = document.querySelector('.timeline-line');
const timelineItems = document.querySelectorAll('.timeline-item');
const experiencesSection = document.getElementById('experiences');

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateTimeline() {
    const experiencesSectionRect = experiencesSection.getBoundingClientRect();
    const timelineRect = timeline.getBoundingClientRect();
    
    let lineHeight;
    
    if (experiencesSectionRect.top <= 0) {
        lineHeight = Math.min(timelineRect.bottom - timelineRect.top, window.innerHeight - experiencesSectionRect.top);
    } else {
        lineHeight = Math.max(0, window.innerHeight - experiencesSectionRect.top);
    }
    
    timelineLine.style.height = `${lineHeight}px`;

    timelineItems.forEach((item, index) => {
        if (isElementInViewport(item)) {
            item.classList.add('visible');
        }
    });
}

window.addEventListener('load', animateTimeline);
window.addEventListener('scroll', animateTimeline);
window.addEventListener('resize', animateTimeline);

// Select all links with hashes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbarHeight = document.querySelector('nav').offsetHeight;

        if (targetElement) {
            const yOffset = -navbarHeight;
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('.viewAllBtn');
    const blogGrid = document.getElementById('blogGrid');
    const hiddenPosts = blogGrid.querySelectorAll('.blog-post.hidden');

    viewAllBtn.addEventListener('click', function() {
        hiddenPosts.forEach(post => post.classList.toggle('hidden'));
        
        if (viewAllBtn.textContent === 'View All') {
            viewAllBtn.textContent = 'Show Less';
        } else {
            viewAllBtn.textContent = 'View All';
        }
    });
});

// Function to fetch and display GitHub repos
function fetchGitHubRepos() {
    fetch('github.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            const reposContainer = document.getElementById('repos-container');
            if (reposContainer) {
                reposContainer.innerHTML = ''; // Clear existing content
                repos.forEach(repo => {
                    const repoElement = document.createElement('div');
                    repoElement.className = 'repo-item';
                    repoElement.innerHTML = `
                        <h3><a href="${repo.url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || 'No description'}</p>
                        <p>Stars: ${repo.stars}, Language: ${repo.language || 'Not specified'}</p>
                    `;
                    reposContainer.appendChild(repoElement);
                });
            } else {
                console.error('repos-container element not found');
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            const reposContainer = document.getElementById('repos-container');
            if (reposContainer) {
                reposContainer.innerHTML = '<p>Error loading repositories. Please try again later.</p>';
            }
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
