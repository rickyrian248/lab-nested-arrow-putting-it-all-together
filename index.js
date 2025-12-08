


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};


const users = {
  Kim: { password: "password123", attempts: 0, locked: false },
  James: { password: "securepass", attempts: 0, locked: false }
};


function login(username, password) {
  const user = users[username];

  if (!user) {
    return "User does not exist.";
  }

  if (user.locked) {
    return "Account is locked. Please contact support.";
  }

  if (user.password === password) {
    user.attempts = 0;
    return `Welcome, ${username}!`;
  } else {
    user.attempts += 1;

    if (user.attempts >= 3) {
      user.locked = true;
      return "Account locked due to too many failed login attempts.";
    }

    return `Incorrect password. You have ${3 - user.attempts} attempts left.`;
  }
}

