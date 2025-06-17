
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Business } from '@/components/BusinessCard';
import { businesses as initialBusinesses } from '@/data/mockData';

interface BusinessContextType {
  businesses: Business[];
  addBusiness: (business: Omit<Business, 'id' | 'status'>) => void;
  updateBusinessStatus: (id: number, status: 'pending' | 'approved' | 'rejected') => void;
  deleteBusiness: (id: number) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);

  const addBusiness = (businessData: Omit<Business, 'id' | 'status'>) => {
    const newBusiness: Business = {
      ...businessData,
      id: Math.max(0, ...businesses.map(b => b.id)) + 1,
      status: 'pending',
      // Ensure all required fields have proper types
      businessType: businessData.businessType || 'Startup',
      revenue: businessData.revenue || 'Not disclosed',
      teamSize: businessData.teamSize || 'Not disclosed',
      yearEstablished: businessData.yearEstablished || new Date().getFullYear(),
      highlights: businessData.highlights || [],
    };
    
    setBusinesses(prev => [newBusiness, ...prev]);
  };

  const updateBusinessStatus = (id: number, status: 'pending' | 'approved' | 'rejected') => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id ? { ...business, status } : business
      )
    );
  };

  const deleteBusiness = (id: number) => {
    setBusinesses(prev => prev.filter(business => business.id !== id));
  };

  return (
    <BusinessContext.Provider value={{
      businesses,
      addBusiness,
      updateBusinessStatus,
      deleteBusiness
    }}>
      {children}
    </BusinessContext.Provider>
  );
};
