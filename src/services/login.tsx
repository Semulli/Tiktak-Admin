import api from "./api";

;

// const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjEsImlhdCI6MTc1MDg5MjU2NywiZXhwIjoxNzUwOTM1NzY3fQ.DnlfdKp-UT-DJM4gzb4NZjH7J-XB3FaTib-oO348TtQ"


export const loginData = async (phone: string, password: string) => {
  const response = await api.post("/auth/admin/login", {
    phone,
    password,
  });
  console.log("Login cavabı:", response.data);
  const { access_token, refresh_token } = response.data.data.tokens;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  return response.data;

}
export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");

  try {
    const response = await api.post("/auth/refresh", {
      refresh_token,
    });

    const newToken = response.data.tokens.access_token;
    localStorage.setItem("access_token", newToken);

    return newToken;
  } catch (err) {
    console.error("Refresh token xətası:", err);
    localStorage.clear();
    window.location.href = "/";
    throw err;
  }
};

