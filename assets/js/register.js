// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn5wF7ELqU5KngBnKqzZ_6EFr_gfJlaZI",
  authDomain: "project-login-3140b.firebaseapp.com",
  projectId: "project-login-3140b",
  storageBucket: "project-login-3140b.firebasestorage.app",
  messagingSenderId: "998417835725",
  appId: "1:998417835725:web:f2142fd8530ad539d02b84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get the registration form element
const registerForm = document.getElementById('registerForm');

// Listen for the form submission event
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the values from the form inputs
  const organizationName = document.getElementById('organizationName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const accountType = document.querySelector('.type-option.active').dataset.type;

  // Client-side validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
  }

  try {
    // Try creating the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Show a message only when the account is actually created
    alert('Creating your account...');

    // Save additional user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      organizationName: organizationName,
      email: email,
      phone: phone,
      accountType: accountType,
      createdAt: new Date()
    });

    // Success message
    alert('Account created successfully! Redirecting...');

    // Redirect to a new page
    window.location.href = 'dashboard.html';

  } catch (error) {
    // Handle specific Firebase errors
    let errorMessage = 'An unknown error occurred. Please try again.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already in use. Please use a different one or log in.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        break;
      default:
        console.error("Firebase Auth Error:", error.message);
        errorMessage = `Error: ${error.message}`;
    }
    alert(errorMessage);
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // Select the registration form
    const registerForm = document.getElementById('registerForm');

    // Add a submit event listener to the form
    registerForm.addEventListener('submit', (e) => {
        // Prevent the default form submission to handle it with JavaScript
        e.preventDefault();

        // Get the values from the form inputs
        const organizationName = document.getElementById('organizationName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Get the selected account type (Restaurant or NGO)
        const accountTypeElement = document.querySelector('.type-option.active');
        const accountType = accountTypeElement.getAttribute('data-type');
        
        // Create an object to store the user data
        const userData = {
            organizationName: organizationName,
            email: email,
            phone: phone,
            accountType: accountType // Store the type to display it on the dashboard
        };

        // Save the user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Redirect the user to the dashboard page
        window.location.href = 'dashboard.html';
    });
});
