import React from "react";
import { useDocsStore } from "../store/useDocsStore";
import { 
  Sun, Moon, Monitor, Tablet, Smartphone, Bookmark, BookmarkCheck,
  Search, Sliders, Play, Share2, Compass, LayoutDashboard
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { 
    selectedComponent, 
    theme, 
    toggleTheme, 
    previewDevice, 
    setPreviewDevice,
    bookmarks,
    toggleBookmark,
    setSearchOpen
  } = useDocsStore();

  const location = useLocation();

  const isBookmarked = bookmarks.includes(selectedComponent);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#07070a]/90 backdrop-blur-md px-6 flex items-center justify-between select-none shrink-0 z-20">
      {/* Route Info */}
      <div className="flex items-center gap-6">
        {/* Navigation links */}
        <nav className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <Link 
            to="/" 
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${location.pathname === "/" ? "text-white" : ""}`}
          >
            <Compass className="w-3.5 h-3.5" /> Landing
          </Link>
          <Link 
            to="/dashboard" 
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${location.pathname === "/dashboard" ? "text-white" : ""}`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <Link 
            to="/explore/entrance/FadeUp" 
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${location.pathname.startsWith("/explore") ? "text-white" : ""}`}
          >
            <Sliders className="w-3.5 h-3.5" /> Explorer
          </Link>
          <Link 
            to="/docs" 
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${location.pathname === "/docs" ? "text-white" : ""}`}
          >
            📘 Docs
          </Link>
        </nav>

        {location.pathname.startsWith("/explore") && (
          <div className="flex items-center gap-1.5 text-xs border-l border-slate-800 pl-6 text-slate-500 font-mono">
            <span>explorer</span>
            <span className="text-slate-700">/</span>
            <span className="text-indigo-400 font-bold">{selectedComponent}</span>
          </div>
        )}
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Ctrl + K command shortcut trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          title="Search Command Palette"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="text-[10px] text-slate-600 font-mono bg-slate-950 border border-slate-800 px-1.5 py-0.2 rounded">Ctrl + K</kbd>
        </button>

        {/* Responsive Preview Selectors (Only shown in explorer page) */}
        {location.pathname.startsWith("/explore") && (
          <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-md transition-all ${
                previewDevice === "desktop" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Desktop Preview"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-1.5 rounded-md transition-all ${
                previewDevice === "tablet" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Tablet Preview"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-md transition-all ${
                previewDevice === "mobile" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Mobile Preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Favorite/Bookmark Toggle */}
        {location.pathname.startsWith("/explore") && (
          <button
            onClick={() => toggleBookmark(selectedComponent)}
            className={`p-2 rounded-lg border transition-all ${
              isBookmarked
                ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
            title={isBookmarked ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Theme Toggler */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
          title="Toggle Color Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
};
