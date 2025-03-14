import { useEffect, useState } from "react"
import { Metric } from "../types/Metric";
import { fetchMetrics } from "../services/productService";

interface MetricsProps {
    overall: Metric,
    byCategory: Record<string, Metric>;
}

export const useMetrics = (productsSize : number) => {
    const [metrics, setMetrics] = useState<MetricsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // -- fetch metrics --
      useEffect(() => {
        const getMetrics = async () => {
          try {
            const data = await fetchMetrics();
            setMetrics(data);
          } catch (err) {
            setError('Error while fetching metrics');
          } finally {
            setLoading(false);
          }
        };
    
        getMetrics();
      }, [productsSize]);

    return {metrics, loading, error};
}