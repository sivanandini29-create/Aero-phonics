export interface HealthStatus {
  status: string;
  node: string;
  latency: string;
  timestamp: string;
}

export const getHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await fetch("/api/health");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error(`Expected JSON but got ${contentType}. Body sample: ${text.slice(0, 100)}`);
      throw new Error("API returned non-JSON content. Possible server misconfiguration or route conflict.");
    }
    return response.json();
  } catch (error) {
    console.error("Health check error:", error);
    throw error;
  }
};

export const getProducts = async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getNodeStatus = async (): Promise<{ status: string }> => {
  const response = await fetch("/api/node-status");
  if (!response.ok) {
    throw new Error(`Failed to fetch node status: ${response.status}`);
  }
  return response.json();
};
