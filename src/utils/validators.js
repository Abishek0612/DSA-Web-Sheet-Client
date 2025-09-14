export const validateEmail = (email) => {
  const errors = [];

  if (!email) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePassword = (password) => {
  const errors = [];

  if (!password) {
    errors.push("Password is required");
  } else {
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (name) => {
  const errors = [];

  if (!name) {
    errors.push("Name is required");
  } else if (name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  } else if (name.length > 50) {
    errors.push("Name must be less than 50 characters");
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.push("Name can only contain letters and spaces");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const errors = [];

  if (!confirmPassword) {
    errors.push("Please confirm your password");
  } else if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
