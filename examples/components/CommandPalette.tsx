import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDocsStore } from "../store/useDocsStore";
import { componentsSchema } from "../components-schema";
import { Search, Compass, Sliders, LayoutDashboard, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CommandPalette: React.FC = () => {
  const { isSearchOpen, setSearchOpen, setSelectedComponent } = useDocsStore();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten catalog items
  const searchItems = useMemo(() => {
    const list: { name: string; importName: string; category: string; type: "component" | "page"; path: string }[] = [
      { name: "Landing Page", importName: "Landing", category: "core", type: "page", path: "/" },
      { name: "Stats Dashboard", importName: "Dashboard", category: "core", type: "page", path: "/dashboard" },
      { name: "Getting Started Guide", importName: "Docs", category: "docs", type: "page", path: "/docs" }
    ];

    Object.entries(componentsSchema).forEach(([catKey, compList]) => {
      compList.forEach((comp) => {
        list.push({
          name: comp.name,
          importName: comp.importName,
          category: catKey,
          type: "component",
          path: `/explore/${catKey}/${comp.importName}`
        });
      });
    });

    return list;
  }, []);

  const filteredItems = useMemo(() => {
    if (!query) return searchItems.slice(0, 8); // Top items
    return searchItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.importName.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const handleSelect = (item: typeof searchItems[0]) => {
    setSearchOpen(false);
    if (item.type === "component") {
      setSelectedComponent(item.category, item.importName);
    }
    navigate(item.path);
  };

  const handleNavKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        handleSelect(filteredItems[activeIndex]);
      }
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={() => setSearchOpen(false)}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-lg bg-[#0c0c14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3 bg-slate-950">
          <Search className="w-4 h-4 text-slate-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search component..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleNavKeyDown}
            className="flex-1 bg-transparent text-sm border-none focus:outline-none text-slate-200 placeholder-slate-500"
          />
        </div>

        {/* Results items */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No results found. Try typing another term.
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.importName}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-all ${
                    idx === activeIndex
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.type === "page" ? (
                      item.importName === "Landing" ? (
                        <Compass className="w-4 h-4 text-indigo-400" />
                      ) : item.importName === "Dashboard" ? (
                        <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-amber-400" />
                      )
                    ) : (
                      <Sliders className="w-4 h-4 text-indigo-400" />
                    )}
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className={`text-[10px] ${idx === activeIndex ? "text-indigo-200" : "text-slate-500"}`}>
                        import &#123; {item.importName} &#125; from "@hemanath-afk/afk-motion"
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/60 text-[10px] text-slate-500 flex justify-between items-center font-mono">
          <div className="flex gap-4">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
