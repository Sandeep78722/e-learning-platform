document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'student') {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('welcomeMessage').textContent = `Welcome, ${user.username}!`;

  // Load courses dynamically from localStorage
  const courses = JSON.parse(localStorage.getItem('courses')) || [];

  const courseContainer = document.getElementById('studentCourses');
  courseContainer.innerHTML = ""; // Clear previous content if any

  if (courses.length === 0) {
    courseContainer.innerHTML = `<p>No courses available currently.</p>`;
  } else {
    courses.forEach(course => {
      const div = document.createElement('div');
      div.className = 'course-card';
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button onclick="startCourse('${course.title}')">Start Course</button>
        <button class="btn submit-assignment-btn" onclick="submitAssignment('${course.title}')">Submit Assignment</button>
      `;
      courseContainer.appendChild(div);
    });
  }
});

// Start course function (example)
function startCourse(courseTitle) {
  window.location.href = `course-video.html?course=${encodeURIComponent(courseTitle)}`;
}

function submitAssignment(courseTitle) {
  const assignmentURL = prompt('Please enter your Google Drive link for the assignment:');

  if (!isValidGoogleDriveLink(assignmentURL)) {
    alert('Please provide a valid Google Drive link.');
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const allAssignments = JSON.parse(localStorage.getItem('assignments')) || [];

  const newAssignment = {
    student: user.username,
    course: courseTitle,
    url: assignmentURL,
    submittedAt: new Date().toISOString(),
    feedback: null,
  };

  allAssignments.push(newAssignment);
  localStorage.setItem('assignments', JSON.stringify(allAssignments));

  alert(`Assignment for ${courseTitle} has been submitted.`);
}

function isValidGoogleDriveLink(url) {
  const driveLinkRegex = /https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view/;
  return driveLinkRegex.test(url);
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Animate Counter Function (optional)
document.addEventListener('DOMContentLoaded', function () {
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const updateCounter = () => {
      const increment = target / 200;
      count += increment;

      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  const statsSection = document.querySelector('.success-stats');
  if (!statsSection) return; // Safety check if section doesn't exist

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(statsSection);
});
