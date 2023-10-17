//  this is for the dom manipulation. BROWSER SIDE OF JAVASCRIPT
const registerForm = document.querySelector('#register-form');

function registerUser(e) {
  e.preventDefault();

  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  const formData = {email, password}
  

  // Send a POST fetch request to our register route

  fetch('/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(res => res.text())
  .then( data => {
    window.location = '/';
  });

  // Attach the form data (email& password) from our inputs to the body

  // Stringify the body object as JSON and console.log the server response

  console.log('submitted');
}

registerForm.addEventListener('submit', registerUser);
