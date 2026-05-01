const API_URL = import.meta.env.VITE_API_URL ?? "";

let refreshPromise = null;

async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path}`;
  try {
    let res = await fetch(url, { ...options, credentials: "include" });

    if (res.status === 401) {
      // Deduplicate concurrent refresh attempts — only one refresh at a time
      if (!refreshPromise) {
        refreshPromise = fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        }).finally(() => {
          refreshPromise = null;
        });
      }

      const refreshRes = await refreshPromise;

      if (!refreshRes.ok) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        // Return the original 401, not the refresh endpoint's response
        return res;
      }

      // New access token cookie is set — retry the original request
      res = await fetch(url, { ...options, credentials: "include" });
    }

    return res;
  } catch (fetchError) {
    throw Error(fetchError);
  }
}

export default apiFetch;
