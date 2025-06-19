let isLogin = true;

const form = document.getElementById('authForm');
const toggleLink = document.getElementById('toggleForm');
const toggleMessage = document.getElementById('toggleMessage');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('error-message');

toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
  submitBtn.textContent = isLogin ? 'Login' : 'Sign Up';
  toggleMessage.innerHTML = isLogin
    ? `Don't have an account? <a href="#" id="toggleForm">Sign Up</a>`
    : `Already have an account? <a href="#" id="toggleForm">Login</a>`;
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'toggleForm') {
    e.preventDefault();
    toggleLink.click();
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;
  errorMessage.textContent = '';
  errorMessage.style.color = 'red';

  if (!username || !password || !role) {
    errorMessage.textContent = 'Please fill all fields.';
    return;
  }

  const studentUsers = JSON.parse(localStorage.getItem('studentUsers')) || [];
  const instructorUsersStorage = JSON.parse(localStorage.getItem('instructorUsers')) || [];

  // Hardcoded instructor
  const defaultInstructor = { username: 'instructor', password: '1234', role: 'instructor' };
  const allInstructors = [defaultInstructor, ...instructorUsersStorage];

  if (isLogin) {
    const allUsers = role === 'student' ? studentUsers : allInstructors;
    const user = allUsers.find(user =>
      user.username === username &&
      user.password === password &&
      user.role === role
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = user.role === 'student'
        ? 'student-dashboard.html'
        : 'instructor-dashboard.html';
    } else {
      errorMessage.innerHTML = `Invalid credentials. ${
        role === 'student'
          ? 'No student account found. Please sign up.'
          : 'No instructor account found. Please sign up.'
      }`;
    }
  } else {
    const userListKey = role === 'student' ? 'studentUsers' : 'instructorUsers';
    const users = role === 'student' ? studentUsers : instructorUsersStorage;

    const userExists = users.some(user => user.username === username);
    if (userExists) {
      errorMessage.textContent = 'Username already exists.';
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem(userListKey, JSON.stringify(users));

    errorMessage.style.color = 'green';
    errorMessage.textContent = 'Account created! You can now log in.';
    toggleLink.click(); 
  }
});
