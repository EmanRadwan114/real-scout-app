import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "../hooks/useAppwrite";
import { fetchUserInfo } from "../lib/appwrite";

interface IUserInfo {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface IUserContext {
  isLoggedIn: boolean;
  user: IUserInfo | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user = null,
    isLoading,
    error,
    refetch,
  } = useAppwrite({ fn: fetchUserInfo });

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider
      value={{ isLoggedIn, user, refetch, isLoading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
