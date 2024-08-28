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

        if (targetElement) {
            // Calculate the distance to scroll
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            // Perform the smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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
    const viewAllBtn = document.getElementById('viewAllBtn');
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
