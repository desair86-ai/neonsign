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
  updateProfile: (updatedData: Partial<CustomerUser>) => Promise<{ success: boolean; error?: string }>;
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

  const login = async (email: string, password?: string) => {
    try {
      const res = await fetch('/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed. Please check your credentials.' };
      }

      saveUserToStorage(data.customer);
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
      const res = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const resData = await res.json();

      if (!res.ok) {
        return { success: false, error: resData.error || 'Registration failed.' };
      }

      saveUserToStorage(resData.customer);
      return { success: true };
    } catch (e) {
      console.error("Registration error", e);
      return { success: false, error: "An unexpected error occurred during registration." };
    }
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const updateProfile = async (updatedData: Partial<CustomerUser>) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    try {
      const res = await fetch('/api/customer/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, ...updatedData })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to update profile' };
      }

      saveUserToStorage(data.customer);
      return { success: true };
    } catch (e) {
      console.error("Update profile error", e);
      return { success: false, error: "An unexpected error occurred while updating." };
    }
  };

  const resetPassword = async (email: string) => {
    // Password resets in WooCommerce typically require triggering a reset email endpoint,
    // For now, we return a simulated success message until we build the specific WP endpoint.
    return {
      success: true,
      message: `If an account exists, a secure password reset link has been sent to ${email}. Please check your inbox and spam folder.`,
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
