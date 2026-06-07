import React, { useState, useMemo, useEffect } from "react";
import { useDocsStore } from "../store/useDocsStore";
import { componentsSchema, CATEGORIES_LABELS } from "../components-schema";
import { 
  Search, Bookmark, Clock, ListFilter, Sparkles, BookOpen, 
  HelpCircle, ChevronRight, Settings, Info, Keyboard
} from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const { 
    selectedCategory, 
    selectedComponent, 
    setSelectedComponent,
    bookmarks,
    recentlyViewed
  } = useDocsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "bookmarks" | "recent">("all");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Auto-expand active category
  useEffect(() => {
    if (selectedCategory) {
      setExpandedCategories((prev) => ({
        ...prev,
        [selectedCategory]: true,
      }));
    }
  }, [selectedCategory]);

  const toggleCategory = (catKey: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  const isCategoryExpanded = (catKey: string) => {
    if (searchQuery) return true;
    return !!expandedCategories[catKey];
  };

  // Flattened components list for global search
  const allComponents = useMemo(() => {
    const list: { name: string; importName: string; category: string }[] = [];
    Object.entries(componentsSchema).forEach(([catKey, compList]) => {
      compList.forEach((comp) => {
        list.push({
          name: comp.name,
          importName: comp.importName,
          category: catKey
        });
      });
    });
    return list;
  }, []);

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return componentsSchema;
    
    const results: Record<string, typeof allComponents> = {};
    Object.keys(componentsSchema).forEach((catKey) => {
      const list = componentsSchema[catKey].filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.importName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (list.length > 0) {
        results[catKey] = list;
      }
    });
    return results;
  }, [searchQuery]);

  const bookmarkedList = useMemo(() => {
    return allComponents.filter((c) => bookmarks.includes(c.importName));
  }, [bookmarks, allComponents]);

  const recentList = useMemo(() => {
    return recentlyViewed
      .map((name) => allComponents.find((c) => c.importName === name))
      .filter(Boolean) as typeof allComponents;
  }, [recentlyViewed, allComponents]);

  return (
    <aside className="w-80 border-r border-slate-800 bg-[#07070a]/90 backdrop-blur-md flex flex-col h-full overflow-hidden select-none">
      {/* Brand logo / search bar */}
      <div className="p-4 border-b border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-white font-display">
              afk<span className="text-indigo-500">.motion</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold font-mono">
              v1.1.0
            </span>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search catalog... (Ctrl + K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900/60 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-lg text-slate-200 placeholder-slate-500 transition-colors"
          />
        </div>
      </div>

      {/* Tabs list selector */}
      <div className="flex px-4 py-2 border-b border-slate-800/50 bg-slate-900/30 gap-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "all" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          <ListFilter className="w-3 h-3" /> Components
        </button>
        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "bookmarks" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          <Bookmark className="w-3 h-3" /> Favs ({bookmarks.length})
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "recent" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          <Clock className="w-3 h-3" /> Recents
        </button>
      </div>

      {/* Categories / components list */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
        {activeTab === "all" && (
          <>
            {Object.keys(filteredComponents).length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs flex flex-col gap-2 justify-center items-center">
                <span>🔍 No results found for "{searchQuery}"</span>
                <button onClick={() => setSearchQuery("")} className="text-indigo-400 font-bold hover:underline">
                  Clear search
                </button>
              </div>
            ) : (
              Object.entries(filteredComponents).map(([catKey, compList]) => {
                const expanded = isCategoryExpanded(catKey);
                return (
                  <div key={catKey} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(catKey)}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-left hover:bg-slate-800/30 group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight 
                          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                            expanded ? "rotate-90 text-indigo-400" : ""
                          }`} 
                        />
                        <span className={`text-[10px] uppercase font-bold tracking-wider font-mono transition-colors ${
                          expanded ? "text-slate-200" : "text-slate-400 group-hover:text-slate-200"
                        }`}>
                          {CATEGORIES_LABELS[catKey]}
                        </span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.2 bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-slate-400 rounded-md font-normal font-mono transition-colors">
                        {compList.length}
                      </span>
                    </button>
                    {expanded && (
                      <div className="space-y-0.5 pl-3.5 border-l border-slate-800/60 ml-[15px] mt-0.5 transition-all">
                        {compList.map((comp) => (
                          <Link
                            key={comp.importName}
                            to={`/explore/${catKey}/${comp.importName}`}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-all text-left ${
                              selectedComponent === comp.importName
                                ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold"
                                : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                            }`}
                          >
                            <span className="truncate">{comp.name}</span>
                            {selectedComponent === comp.importName && (
                              <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}

        {activeTab === "bookmarks" && (
          <div className="space-y-1.5">
            <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
              Bookmarked Widgets
            </h5>
            {bookmarkedList.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No bookmarked components yet.
              </div>
            ) : (
              <div className="space-y-0.5">
                {bookmarkedList.map((comp) => (
                  <Link
                    key={comp.importName}
                    to={`/explore/${comp.category}/${comp.importName}`}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all text-left ${
                      selectedComponent === comp.importName
                        ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold"
                        : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <span className="truncate">{comp.name}</span>
                    <span className="text-[9px] text-slate-600 font-mono">
                      {comp.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "recent" && (
          <div className="space-y-1.5">
            <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
              Recently Viewed
            </h5>
            {recentList.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Browse components to view history.
              </div>
            ) : (
              <div className="space-y-0.5">
                {recentList.map((comp) => (
                  <Link
                    key={comp.importName}
                    to={`/explore/${comp.category}/${comp.importName}`}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all text-left ${
                      selectedComponent === comp.importName
                        ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold"
                        : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <span className="truncate">{comp.name}</span>
                    <span className="text-[9px] text-slate-600 font-mono">
                      {comp.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar footer commands shortcuts */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-semibold"><Keyboard className="w-3.5 h-3.5" /> Shortcuts</span>
          <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono text-[9px]">Ctrl + K</kbd>
        </div>
      </div>
    </aside>
  );
};
