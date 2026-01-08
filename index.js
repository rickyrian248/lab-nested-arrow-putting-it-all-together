


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

/**
 * Outer function that creates a secure login tracker
 * @param {Object} userInfo - Contains username and password
 */
function createLoginTracker(userInfo) {
  // Tracks the number of login attempts
  let attemptCount = 0;

  /**
   * Inner arrow function that handles each login attempt
   * @param {string} passwordAttempt - Password entered by the user
   */
  const loginAttempt = (passwordAttempt) => {
    // If attempts exceed 3, lock the account
    if (attemptCount >= 3) {
      return "Account locked due to too many failed login attempts";
    }

    // Increment attempt count on each call
    attemptCount++;

    // Debugging logs
    console.log(`Attempt #: ${attemptCount}`);
    console.log(`Password entered: ${passwordAttempt}`);

    // Check if password matches
    if (passwordAttempt === userInfo.password) {
      return "Login successful";
    } else {
      return `Attempt ${attemptCount}: Login failed`;
    }
  };

  // Return the inner function to maintain closure
  return loginAttempt;
}

const user = {
  username: "user1",
  password: "password123"
};

const login = createLoginTracker(user);

// Failed attempts
console.log(login("wrongpass"));   // Attempt 1: Login failed
console.log(login("123456"));      // Attempt 2: Login failed
console.log(login("admin"));       // Attempt 3: Login failed

// Account should now be locked
console.log(login("password123")); 
// Account locked due to too many failed login attempts

const login2 = createLoginTracker(user);
console.log(login2("password123")); // Login successful