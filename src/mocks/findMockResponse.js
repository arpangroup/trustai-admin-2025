import { mockResponses } from "./mockResponses";

/**
 * Attempts to match a mock response based on dynamic route pattern
 * e.g., /api/v1/transactions/user/:userId
 * @param {string} url - the incoming full request path (no query params)
 * @returns {function|null} - the matching mock response function
 */
/*export const findMockResponse = (url) => {
  console.log("findMockResponse: ", url);

  for (const [pattern, handler] of Object.entries(mockResponses)) {
    // Convert "/api/v1/transactions/user/:id" to a regex
    const regexPattern = "^" + pattern.replace(/:\w+/g, "\\d+") + "$";
    const regex = new RegExp(regexPattern);

    if (regex.test(url)) {
      return handler;
    }
  }

  return null;
};*/

// findMockResponse.js
export function findMockResponse(url, mockMap) {
  for (const key in mockMap) {
    const match = matchPattern(url, key);
    if (match) {
      return { handler: mockMap[key], params: match };
    }
  }
  return null;
}

function matchPattern(url, pattern) {
  const urlParts = url.split('/');
  const patternParts = pattern.split('/');

  if (urlParts.length !== patternParts.length) return null;

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].substring(1);
      params[paramName] = urlParts[i];
    } else if (patternParts[i] !== urlParts[i]) {
      return null;
    }
  }

  return params;
}
