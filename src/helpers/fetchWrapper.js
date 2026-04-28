const API_URL = "http://localhost:8001";
// const API_URL = "https://api.venbuk.com";

async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path}`;
  try {
    let res = await fetch(url, { ...options, credentials: "include" });

    if (res.status === 401) {
      // Access token expired ? try to refresh silently
      const refreshRes = await fetch("/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        // Refresh token also expired ? send user to login
        window.location.href = "/login";
        return;
      }

      // New access token cookie is set ? retry the original request
      res = await fetch(url, { ...options, credentials: "include" });
    }

    return res;
  } catch (fetchError) {
    throw Error(fetchError);
  }
}

export default apiFetch;
