'use client';

import { useAuth } from "@clerk/nextjs";
import Loader from "../Loader";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded } = useAuth();
  
    if (!isLoaded) {
      return <Loader />;
    }
  
    return <>{children}</>;
};

export default AuthGate;