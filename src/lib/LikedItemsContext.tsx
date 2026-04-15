import { createContext, useContext, useState, ReactNode } from 'react';

export interface LikedItem {
  id: number;
  type: 'vendor' | 'venue';
  name: string;
  category: string; // e.g. type in vendor/venue
  image: string;
  min_price: number;
}

interface LikedItemsContextProps {
  likedItems: LikedItem[];
  toggleLike: (item: LikedItem) => void;
  isLiked: (id: number, type: 'vendor' | 'venue') => boolean;
  clearLikes: () => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const LikedItemsContext = createContext<LikedItemsContextProps | undefined>(undefined);

export const LikedItemsProvider = ({ children }: { children: ReactNode }) => {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleLike = (item: LikedItem) => {
    setLikedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id && i.type === item.type);
      if (exists) {
        return prev.filter((i) => !(i.id === item.id && i.type === item.type));
      }
      return [...prev, item];
    });
  };

  const isLiked = (id: number, type: 'vendor' | 'venue') => {
    return likedItems.some((i) => i.id === id && i.type === type);
  };

  const clearLikes = () => {
    setLikedItems([]);
  };

  return (
    <LikedItemsContext.Provider value={{ likedItems, toggleLike, isLiked, clearLikes, isSidebarOpen, setSidebarOpen }}>
      {children}
    </LikedItemsContext.Provider>
  );
};

export const useLikedItems = () => {
  const context = useContext(LikedItemsContext);
  if (!context) {
    throw new Error('useLikedItems must be used within a LikedItemsProvider');
  }
  return context;
};
