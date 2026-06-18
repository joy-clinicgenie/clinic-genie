/** Dev health probe — logs localhost chunk/process state for debug session 407ac1 */
const LOG = "http://127.0.0.1:7635/ingest/d575c12b-b50c-44fb-a806-53f7ac924454";
const runId = process.argv[2] ?? "pre-fix";

async function probe() {
  const checks = {};
  try {
    const home = await fetch("http://localhost:3000/");
    checks.homeStatus = home.status;
    const html = await home.text();
    checks.htmlHasMainApp = html.includes("main-app.js");
  } catch (e) {
    checks.homeError = String(e.message ?? e);
  }

  for (const path of ["/_next/static/chunks/main-app.js", "/_next/static/chunks/app-pages-internals.js"]) {
    try {
      const res = await fetch(`http://localhost:3000${path}`);
      checks[path] = res.status;
    } catch (e) {
      checks[path] = `error:${e.message ?? e}`;
    }
  }

  const payload = {
    sessionId: "407ac1",
    runId,
    hypothesisId: "B",
    location: "scripts/debug-dev-health.mjs",
    message: "dev server chunk health probe",
    data: checks,
    timestamp: Date.now(),
  };

  await fetch(LOG, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "407ac1" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  console.log(JSON.stringify(checks, null, 2));
}

probe();
