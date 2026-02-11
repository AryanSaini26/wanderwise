// web/src/App.tsx
import { useState } from "react";
import "./App.css";

// 'export default' makes this component available for other files to use.
// 'App' is the name of our main functional component.
export default function App() {
  // --- STATE BANK ---
  // We use state to track things that change over time and should trigger a UI update.
  
  // Tracks if the request is "in flight." We use this to show loading spinners.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Tracks any error messages. We start with 'null' because there's no error yet.
  const [error, setError] = useState<string | null>(null);
  
  // Tracks the data we get back from the server.
  const [response, setResponse] = useState<string | null>(null);

  // 'async' tells JS this function will perform tasks that take time (like fetching data).
  async function handleCheckApi() {
    // 1. Reset everything before we start a new request.
    setIsLoading(true);
    setError(null);
    setResponse(null);

    // 2. The "Try" block: where we put code that might fail (e.g., if the server is off).
    try {
      // 'await' pauses the function until the server responds. 
      const res = await fetch("http://localhost:3000/health");

      // 'res.ok' is true if the status code is 200-299. 
      // If it's 404 or 500, we manually "throw" an error to jump to the 'catch' block.
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      // We turn the raw response into a readable JSON object.
      const data = await res.json();
      
      // We turn that object into a "pretty" string to display it in a <div> or <pre> tag.
      setResponse(JSON.stringify(data, null, 2));
      
    } catch (err) {
      // 3. The "Catch" block: runs ONLY if something went wrong inside the 'try'.
      // This checks if the error is a real JS Error object or just a random string/object.
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      
    } finally {
      // 4. The "Finally" block: runs no matter what (success or failure).
      // This ensures the loading spinner stops spinning once the dust settles.
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>
            WanderWise
          </h1>
          <p style={{ margin: "8px 0 0 0", color: "#4b5563" }}>
            Itinerary Builder (Phase A)
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            type="button"
            onClick={handleCheckApi}
            disabled={isLoading}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid #111827",
              background: isLoading ? "#374151" : "#111827",
              color: "white",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.8 : 1,
            }}
          >
            {isLoading ? "Checking..." : "Check API"}
          </button>

          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Response will appear below
          </span>
        </div>

        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            Response
          </div>

          <pre
            style={{
              margin: 0,
              padding: "12px",
              borderRadius: "12px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              overflowX: "auto",
              minHeight: "120px",
            }}
          >
            {error ? `Error: ${error}` : response ?? "(waiting...)"}
          </pre>
        </div>
      </div>
    </div>
  );
}
