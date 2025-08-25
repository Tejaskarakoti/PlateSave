// Paste your Firebase SDK initialization code here.
// You can get this from your Firebase console -> Project settings.
const firebaseConfig = {
    apiKey: "AIzaSyDyOaD2wmKxprGHssGH5iRhTR6u1ATvr9A",
    authDomain: "database-handling-5d383.firebaseapp.com",
    databaseURL: "https://database-handling-5d383-default-rtdb.firebaseio.com/", // Added database URL
    projectId: "database-handling-5d383",
    storageBucket: "database-handling-5d383.firebasestorage.app",
    messagingSenderId: "66610699458",
    appId: "1:66610699458:web:1faa5c4405544661e86f5b",
    measurementId: "G-5TMKXPYETW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the 'donations' node in your database
const donationsDB = firebase.database().ref("donations");

// Get a reference to the post food form from your HTML
const postFoodForm = document.getElementById("postFoodForm");

// Add an event listener to the form's submit event
if (postFoodForm) {
    postFoodForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the default form submission and page reload

        // Get the form input values by their IDs
        const foodItem = document.getElementById("foodItem").value;
        const foodQuantity = document.getElementById("foodQuantity").value;
        const foodExpiry = document.getElementById("foodExpiry").value;
        const userLocation = document.getElementById("userLocation").value;

        // Retrieve user data from local storage
        const userData = JSON.parse(localStorage.getItem('currentUser'));

        if (!userData) {
            alert("User data not found. Please log in again.");
            return;
        }

        // Create a data object to push to the database
        const donationData = {
            organizationName: userData.organizationName,
            organizationEmail: userData.email,
            foodItem: foodItem,
            quantity: foodQuantity,
            expiryDate: foodExpiry,
            location: userLocation,
            timestamp: new Date().toISOString()
        };

        // Push the data to Firebase using a unique key
        donationsDB.push(donationData)
            .then(() => {
                // Data saved successfully
                alert("Food donation posted successfully! 🎉");
                console.log("Donation data saved to Firebase.");
                postFoodForm.reset(); // Clear the form fields

                // Close the modal
                const postFoodModal = document.getElementById('postFoodModal');
                if (postFoodModal) {
                    postFoodModal.classList.remove('show');
                }
            })
            .catch((error) => {
                // An error occurred
                console.error("Error writing to Firebase:", error);
                alert("Failed to post donation. Please try again.");
            });
    });
} else {
    console.error("The 'postFoodForm' element was not found in the DOM.");
}