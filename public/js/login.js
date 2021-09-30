const loginFormHandler = async (event) => {
  // The below statement prevents the event from triggering the default event handler
  event.preventDefault();

  // The below expressons finds the email and password fields from the 
  // HTML conetent and gets the values from those fields and trims any spaces before
  // and after the values and stores to respective constants.
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // If both email and password are entered, trigger the api call to check 
    // if the credentials passed are valid.
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
