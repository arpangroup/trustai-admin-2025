import { useEffect, useState } from "react";
import apiClient from "./apiClient";

/**
 * usePaginatedFetch
 *
 * @param {string} baseUrl - The base URL (e.g., `/api/v1/users`)
 * @param {number} page - Current page index (0-based)
 * @param {number} size - Page size
 * @param {object} filters - Optional query parameters (e.g., { status: "active" })
 * @returns {object} - { data, totalPages, loading, error }
 */
export const usePaginatedFetch = (baseUrl, page = 0, size = 9999, filters = {}) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
          ...filters,
        });

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        const response = await apiClient.get(fullUrl);
        // console.log("RESPONSE: ", response);

        if(isMounted){
          setData(response.content || []);
          setTotalPages(response.totalPages || 0);
        }
      } catch (err) {
        console.error("usePaginatedFetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, [baseUrl, page, size, JSON.stringify(filters)]); // re-run on dependency change

  return { data, totalPages, loading };
};