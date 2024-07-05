export const signup = async (userData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      }),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "An error occurred");
  }
  return result;
};

export const login = async (credentials) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "An error occurred");
  }
  return result;
};

export const logout = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "An error occurred");
    }
    return result;
  } catch (err) {
    console.error("Error:", err.message);
    throw new Error(err.message || "An error occurred");
  }
};

export const changePassword = async (passwords) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "An error occurred");
    }
    return result;
  } catch (err) {
    console.error("Error:", err.message);
    throw new Error(err.message || "An error occurred");
  }
};
