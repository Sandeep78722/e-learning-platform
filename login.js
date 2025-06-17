document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = [
    { username: 'sandeep', password: '143', role: 'student' },
    { username: 'instructor', password: '1432', role: 'instructor' }
  ];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));

    if (user.role === 'student') {
      window.location.href = 'student-dashboard.html';
    } else if (user.role === 'instructor') {
      window.location.href = 'instructor-dashboard.html';  // Add a redirect for the instructor
    }
  } else {
    document.getElementById('error-message').textContent = 'Invalid username or password.';
  }
});
