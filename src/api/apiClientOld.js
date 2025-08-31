import { mockResponses } from "../mocks/mockResponses";
import { findMockResponse } from "../mocks/findMockResponse";

const isMockMode = process.env.REACT_APP_API_MOCK === 'true';

const apiClient = {
  get: async (url) => {
    if (isMockMode) {
      const [baseUrl, queryString] = url.split("?");
      const queryParams = new URLSearchParams(url.split("?")[1] || "");
      const fullMockUrl = `${baseUrl}${queryString ? `?${queryString}` : ""}`;

      console.log(`[MOCK] GET: ${fullMockUrl}`);

      // Try direct match first
      //const handler = mockResponses[baseUrl] || findMockResponse(baseUrl);
      let handler = mockResponses[baseUrl];
      let params = {};

      // If not found, try dynamic matching
      if (!handler) {
        const match = findMockResponse(baseUrl, mockResponses);
        if (match) {
          handler = match.handler;
          params = match.params;
        }
      }

      // If no direct match, try dynamic pattern match
      if (typeof handler === "function") {
        //return await handler(queryParams);
        return await handler({ ...params, queryParams });
      }

      throw new Error(`No mock handler found for URL: ${url}`);
    }

    // Real API request
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  },

  post: async (url, body) => {

    if (isMockMode) {
      console.log(`[MOCK] POST: ${url}`, body);

      let handler = mockResponses[`${url}|POST`];
      let params = {};

      if (!handler) {
        const match = findMockResponse(url, mockResponses, "POST");
        if (match) {
          handler = match.handler;
          params = match.params;
        }
      }

      if (typeof handler === "function") {
        return await handler({ ...params, body });
      }

      throw new Error(`No mock handler found for POST ${url}`);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    /*if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();*/

    const text = await response.text(); // Handle empty response body safely
    //const data = await response.json();
    const data = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      // Include message from the response in the thrown error
      const error = new Error(data.message || 'Network response was not ok');
      error.response = data;
      throw error;
    }
    return data;
    
  },

  put: async (url, body) => {
    if (isMockMode) {
      console.log(`[MOCK] PUT: ${url}`, body);

      let handler = mockResponses[`${url}|PUT`];
      let params = {};

      if (!handler) {
        const match = findMockResponse(url, mockResponses, "PUT");
        if (match) {
          handler = match.handler;
          params = match.params;
        }
      }

      if (typeof handler === "function") {
        return await handler({ ...params, body });
      }

      throw new Error(`No mock handler found for PUT ${url}`);
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();

  },

  delete: async (url) => {

    if (isMockMode) {
      console.log(`[MOCK] DELETE: ${url}`);

      let handler = mockResponses[`${url}|DELETE`];
      let params = {};

      if (!handler) {
        const match = findMockResponse(url, mockResponses, "DELETE");
        if (match) {
          handler = match.handler;
          params = match.params;
        }
      }

      if (typeof handler === "function") {
        return await handler(params);
      }

      throw new Error(`No mock handler found for DELETE ${url}`);
    }

    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();

  },


};

export default apiClient;
