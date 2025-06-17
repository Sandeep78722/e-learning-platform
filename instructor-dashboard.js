document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allCourses = JSON.parse(localStorage.getItem("courses")) || [];
  const allAssignments = JSON.parse(localStorage.getItem("assignments")) || [];

  if (!user || user.role !== "instructor") {
    window.location.href = "index.html"; 
    return;
  }

  document.getElementById("welcome").textContent = `Welcome, ${user.username}`;

  function renderCourses() {
    const courseContainer = document.getElementById("courseContainer");
    courseContainer.innerHTML = ""; // Clear the courses list
    allCourses.forEach((course, index) => {
      const div = document.createElement("div");
      div.className = "course-card";
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button onclick="viewAssignments('${course.title}')">View Assignments</button>
        <button onclick="deleteCourse(${index})">Delete Course</button>
      `;
      courseContainer.appendChild(div);
    });
  }

  window.viewAssignments = function (courseTitle) {
    const courseAssignments = allAssignments.filter(
      (assignment) => assignment.course === courseTitle
    );

    const assignmentsContainer = document.getElementById("assignmentsContainer");
    assignmentsContainer.innerHTML = ""; // Clear previous assignments

    if (courseAssignments.length === 0) {
      assignmentsContainer.innerHTML = `<p>No assignments submitted for this course.</p>`;
    }

    courseAssignments.forEach((assignment) => {
      const div = document.createElement("div");
      div.className = "assignment-card";
      div.innerHTML = `
        <h4>Student: ${assignment.student}</h4>
        <p>Submitted: ${new Date(assignment.submittedAt).toLocaleString()}</p>
        <a href="${assignment.url}" target="_blank">View Assignment</a>
        <textarea id="feedback-${assignment.student}" placeholder="Enter feedback"></textarea>
        <button onclick="submitFeedback('${assignment.student}')">Submit Feedback</button>
        <p><strong>Feedback:</strong> ${assignment.feedback || "No feedback yet."}</p>
      `;
      assignmentsContainer.appendChild(div);
    });
  };

  window.submitFeedback = function (studentUsername) {
    const feedback = document.getElementById(`feedback-${studentUsername}`).value;
    const assignment = allAssignments.find(
      (assignment) => assignment.student === studentUsername
    );

    if (assignment) {
      assignment.feedback = feedback; // Update the feedback
      localStorage.setItem("assignments", JSON.stringify(allAssignments));
      alert("Feedback submitted successfully.");
      // Optionally, refresh the assignments view to show updated feedback
      viewAssignments(assignment.course);
    }
  };

  window.deleteCourse = function (courseIndex) {
    if (confirm("Are you sure you want to delete this course?")) {
      allCourses.splice(courseIndex, 1); // Remove course from the array
      localStorage.setItem("courses", JSON.stringify(allCourses)); // Update localStorage
      renderCourses(); // Re-render courses list
      alert("Course deleted successfully.");
    }
  };

  renderCourses();

  // Handle adding new course
  const courseForm = document.getElementById("courseForm");
  courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const courseTitle = document.getElementById("courseTitle").value.trim();
    const courseDescription = document.getElementById("courseDescription").value.trim();

    if (courseTitle && courseDescription) {
      // Check for duplicate course title
      const duplicate = allCourses.find(c => c.title.toLowerCase() === courseTitle.toLowerCase());
      if (duplicate) {
        alert("A course with this title already exists.");
        return;
      }

      const newCourse = {
        title: courseTitle,
        description: courseDescription
      };

      allCourses.push(newCourse); // Add the new course to the array
      localStorage.setItem("courses", JSON.stringify(allCourses)); // Save to localStorage
      renderCourses(); // Re-render courses list

      // Clear the form fields
      document.getElementById("courseTitle").value = "";
      document.getElementById("courseDescription").value = "";
      alert("Course added successfully.");
    } else {
      alert("Please fill in all fields.");
    }
  });

  window.logout = function () {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  };
});
