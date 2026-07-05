// ===== API Types =====
export interface AnalyzeRequest {
  subject: string;
  body: string;
}

export interface AnalyzeResponse {
  threatScore: number;
  maliciousLinks: string;
  tacticsUsed: string;
}

export interface ApiError {
  error: string;
}

// ===== API Configuration =====
const API_BASE_URL = "http://localhost:8081/api/v1/phishing";

// ===== API Functions =====

/**
 * Analyze an email for phishing threats.
 * Sends a direct POST request to the Spring Boot backend.
 * The backend has CORS configured to accept requests from http://localhost:4321.
 */
export async function analyzeEmail(
  subject: string,
  body: string
): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, body } satisfies AnalyzeRequest),
  });

  // Handle rate limiting (429)
  if (response.status === 429) {
    const errorData: ApiError = await response.json();
    throw new RateLimitError(
      errorData.error || "Límite de peticiones excedido. Intenta más tarde."
    );
  }

  // Handle other HTTP errors
  if (!response.ok) {
    throw new ApiCallError(
      `Error del servidor: ${response.status} ${response.statusText}`
    );
  }

  const data: AnalyzeResponse = await response.json();
  return data;
}

// ===== Custom Error Classes =====

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

export class ApiCallError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiCallError";
  }
}
