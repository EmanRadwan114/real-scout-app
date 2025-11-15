import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface IReturnedData<T, P> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

interface IParams<
  T,
  P extends Record<string, string | number> = { ["key"]: string | number },
> {
  fn: (params?: P) => Promise<T>;
  params?: P;
}

export const useAppwrite = <
  T = unknown,
  P extends Record<string, string | number> = { ["key"]: string | number },
>({
  fn,
  params = {} as P,
}: IParams<T, P>): IReturnedData<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fnParams?: P) => {
      try {
        setIsLoading(true);
        const result = await fn(fnParams);
        setData(result);
      } catch (err: unknown) {
        const errMsg =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errMsg);
        Alert.alert("Error", errMsg!);
      } finally {
        setIsLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    fetchData(params);
  }, []);

  const refetch = async (newParams?: P) => await fetchData(newParams ?? params);

  return { data, isLoading, error, refetch };
};
