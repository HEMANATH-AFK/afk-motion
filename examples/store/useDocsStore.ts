import { create } from "zustand";

interface DocsState {
  selectedCategory: string;
  selectedComponent: string;
  theme: "dark" | "light";
  previewDevice: "desktop" | "tablet" | "mobile";
  bookmarks: string[]; // List of component importNames
  recentlyViewed: string[]; // List of component importNames
  speedMultiplier: number; // 0.25, 0.5, 1, 1.5, 2
  isSearchOpen: boolean;
  isInspectorActive: boolean;
  showTimeline: boolean;
  performanceMetrics: {
    fps: number;
    renders: number;
  };
  customProps: Record<string, Record<string, any>>; // componentName -> props
  
  // Actions
  setSelectedComponent: (category: string, name: string) => void;
  toggleTheme: () => void;
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;
  toggleBookmark: (importName: string) => void;
  addRecentlyViewed: (importName: string) => void;
  setSpeedMultiplier: (speed: number) => void;
  setSearchOpen: (open: boolean) => void;
  toggleInspector: () => void;
  toggleTimeline: () => void;
  updatePerformanceMetrics: (fps: number) => void;
  incrementRenders: () => void;
  setCustomProp: (componentName: string, propKey: string, value: any) => void;
  resetCustomProps: (componentName: string) => void;
}

export const useDocsStore = create<DocsState>((set, get) => ({
  selectedCategory: "entrance",
  selectedComponent: "FadeUp",
  theme: "dark",
  previewDevice: "desktop",
  bookmarks: JSON.parse(localStorage.getItem("afk_motion_bookmarks") || "[]"),
  recentlyViewed: JSON.parse(localStorage.getItem("afk_motion_recently") || "[]"),
  speedMultiplier: 1,
  isSearchOpen: false,
  isInspectorActive: false,
  showTimeline: false,
  performanceMetrics: {
    fps: 60,
    renders: 0
  },
  customProps: {},

  setSelectedComponent: (category, name) => {
    set({ selectedCategory: category, selectedComponent: name });
    get().addRecentlyViewed(name);
  },

  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return { theme: nextTheme };
  }),

  setPreviewDevice: (device) => set({ previewDevice: device }),

  toggleBookmark: (importName) => set((state) => {
    const isBookmarked = state.bookmarks.includes(importName);
    const updated = isBookmarked
      ? state.bookmarks.filter((b) => b !== importName)
      : [...state.bookmarks, importName];
    localStorage.setItem("afk_motion_bookmarks", JSON.stringify(updated));
    return { bookmarks: updated };
  }),

  addRecentlyViewed: (importName) => set((state) => {
    const list = state.recentlyViewed.filter((r) => r !== importName);
    const updated = [importName, ...list].slice(0, 10);
    localStorage.setItem("afk_motion_recently", JSON.stringify(updated));
    return { recentlyViewed: updated };
  }),

  setSpeedMultiplier: (speed) => set({ speedMultiplier: speed }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  toggleInspector: () => set((state) => ({ isInspectorActive: !state.isInspectorActive })),
  toggleTimeline: () => set((state) => ({ showTimeline: !state.showTimeline })),
  
  updatePerformanceMetrics: (fps) => set((state) => ({
    performanceMetrics: { ...state.performanceMetrics, fps }
  })),

  incrementRenders: () => set((state) => ({
    performanceMetrics: { ...state.performanceMetrics, renders: state.performanceMetrics.renders + 1 }
  })),

  setCustomProp: (componentName, propKey, value) => set((state) => {
    const componentProps = state.customProps[componentName] || {};
    return {
      customProps: {
        ...state.customProps,
        [componentName]: {
          ...componentProps,
          [propKey]: value
        }
      }
    };
  }),

  resetCustomProps: (componentName) => set((state) => {
    const updated = { ...state.customProps };
    delete updated[componentName];
    return { customProps: updated };
  })
}));
