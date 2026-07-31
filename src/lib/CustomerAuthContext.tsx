"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  createdAt: string;
}

interface CustomerAuthContextType {
  user: CustomerUser | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<CustomerUser>) => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("neon_current_customer");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load customer auth from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveUserToStorage = (customer: CustomerUser | null) => {
    setUser(customer);
    try {
      if (customer) {
        localStorage.setItem("neon_current_customer", JSON.stringify(customer));
      } else {
        localStorage.removeItem("neon_current_customer");
      }
    } catch (e) {
      console.error("Failed to save customer to localStorage", e);
    }
  };

  const login = async (email: string, _password?: string) => {
    // Check if user exists in saved accounts or create a session
    try {
      const existingAccountsStr = localStorage.getItem("neon_registered_customers");
      const existingAccounts: CustomerUser[] = existingAccountsStr
        ? JSON.parse(existingAccountsStr)
        : [];

      const found = existingAccounts.find(
        (acc) => acc.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (found) {
        saveUserToStorage(found);
        return { success: true };
      }

      // If not in registry but logging in, create session from stored user or basic info
      const fallbackUser: CustomerUser = {
        id: `cust-${Date.now()}`,
        fullName: email.split("@")[0] || "Valued Customer",
        email: email.trim(),
        phone: "",
        createdAt: new Date().toLocaleDateString("en-IN"),
      };

      saveUserToStorage(fallbackUser);
      return { success: true };
    } catch (e) {
      console.error("Login error", e);
      return { success: false, error: "An unexpected error occurred during login." };
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
  }) => {
    try {
      const existingAccountsStr = localStorage.getItem("neon_registered_customers");
      const existingAccounts: CustomerUser[] = existingAccountsStr
        ? JSON.parse(existingAccountsStr)
        : [];

      const exists = existingAccounts.some(
        (acc) => acc.email.toLowerCase() === data.email.trim().toLowerCase()
      );

      if (exists) {
        return {
          success: false,
          error: "An account with this email address already exists. Please sign in.",
        };
      }

      const newUser: CustomerUser = {
        id: `cust-${Date.now()}`,
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        createdAt: new Date().toLocaleDateString("en-IN"),
      };

      const updatedAccounts = [...existingAccounts, newUser];
      localStorage.setItem("neon_registered_customers", JSON.stringify(updatedAccounts));

      saveUserToStorage(newUser);
      return { success: true };
    } catch (e) {
      console.error("Registration error", e);
      return { success: false, error: "An unexpected error occurred during registration." };
    }
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const updateProfile = (updatedData: Partial<CustomerUser>) => {
    if (!user) return;
    const nextUser = { ...user, ...updatedData };
    saveUserToStorage(nextUser);

    // Also update in registered list
    try {
      const existingAccountsStr = localStorage.getItem("neon_registered_customers");
      if (existingAccountsStr) {
        const existingAccounts: CustomerUser[] = JSON.parse(existingAccountsStr);
        const updated = existingAccounts.map((acc) =>
          acc.id === nextUser.id ? nextUser : acc
        );
        localStorage.setItem("neon_registered_customers", JSON.stringify(updated));
      }
    } catch (e) {
      console.error("Failed to update profile in list", e);
    }
  };

  const resetPassword = async (email: string) => {
    // Simulate password reset token email
    return {
      success: true,
      message: `A secure password reset link has been sent to ${email}. Please check your inbox and spam folder.`,
    };
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user && isLoaded,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider");
  }
  return context;
};
