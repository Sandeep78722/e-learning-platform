function showMessage(message, divId, color = 'red') {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.color = color;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// === REGISTRATION ===
document.getElementById('submitSignUp').addEventListener('click', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('fName').value.trim();
  const lastName = document.getElementById('lName').value.trim();
  const email = document.getElementById('rEmail').value.trim();
  const password = document.getElementById('rPassword').value;

  if (!firstName || !lastName || !email || !password) {
    showMessage("Please fill in all fields", 'signUpMessage');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    showMessage("Email already exists!", 'signUpMessage');
    return;
  }

  users.push({ fullName: `${firstName} ${lastName}`, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  showMessage("Account created successfully!", 'signUpMessage', 'green');

  setTimeout(() => {
    document.getElementById('signIn').style.display = "block";
    document.getElementById('signup').style.display = "none";
  }, 1000);
});

// === LOGIN (Only Email + Password) ===
document.getElementById('submitSignIn').addEventListener('click', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user =>
    user.email === email &&
    user.password === password
  );

  if (user) {
    showMessage("Login successful!", 'signInMessage', 'green');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  } else {
    showMessage("Invalid credentials!", 'signInMessage');
  }
});

// === TOGGLE FORMS ===
document.getElementById('signUpButton').addEventListener('click', () => {
  document.getElementById('signIn').style.display = "none";
  document.getElementById('signup').style.display = "block";
});

document.getElementById('signInButton').addEventListener('click', () => {
  document.getElementById('signIn').style.display = "block";
  document.getElementById('signup').style.display = "none";
});
