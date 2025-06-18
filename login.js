document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;
  const errorMessage = document.getElementById('error-message');

  errorMessage.textContent = '';

  if (!username || !password || !role) {
    errorMessage.textContent = 'Please enter all fields including role.';
    return;
  }

  const users = [
    { username: 'student', password: '123', role: 'student' },
    { username: 'instructor', password: '1234', role: 'instructor' }
  ];

  const user = users.find(user => 
    user.username === username && 
    user.password === password && 
    user.role === role
  );

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    if (user.role === 'student') {
      window.location.href = 'student-dashboard.html';
    } else if (user.role === 'instructor') {
      window.location.href = 'instructor-dashboard.html';
    }
  } else {
    errorMessage.textContent = 'Invalid credentials or role.';
  }
});



