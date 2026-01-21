/* public/login.js
 * Enhanced login behavior for feature/user-authentication branch
 * - calls POST /api/login
 * - shows user-friendly feedback
 */

const form = document.getElementById("loginForm");
const statusEl = document.getElementById("status");

function setStatus(message, type = "info") {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `status status--${type}`;
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email?.value || "";
    const password = form.password?.value || "";

    const btn = form.querySelector("button[type='submit']");
    if (btn) btn.disabled = true;

    setStatus("Signing in...", "info");

    try {
      const result = await postJson("/api/login", { email, password });

      if (result.ok) {
        setStatus("Login validation passed ✅", "success");
      } else {
        const errs =
          result.data?.errors?.[0]?.details ||
          result.data?.errors ||
          ["Login failed."];

        setStatus(errs.join(" "), "error");
      }
    } catch (err) {
      setStatus("Network error. Try again.", "error");
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}
<p id="status" class="status"></p>
