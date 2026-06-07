import React from "react";
import { useDocsStore } from "../store/useDocsStore";
import { PropControl } from "../components-schema";
import { RotateCcw } from "lucide-react";

interface PropControlsProps {
  componentName: string;
  propsList: PropControl[];
  defaultValues: Record<string, any>;
}

export const PropControls: React.FC<PropControlsProps> = ({
  componentName,
  propsList,
  defaultValues
}) => {
  const { customProps, setCustomProp, resetCustomProps } = useDocsStore();
  const activeProps = customProps[componentName] || {};

  const handleValueChange = (key: string, val: any) => {
    setCustomProp(componentName, key, val);
  };

  const getPropValue = (key: string, defaultValue: any) => {
    return activeProps[key] !== undefined ? activeProps[key] : defaultValue;
  };

  if (propsList.length === 0) {
    return (
      <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center text-xs text-slate-500">
        No configurable properties available for this component.
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f15]/80 border border-slate-800/80 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">
          Playground Controls
        </h4>
        <button
          onClick={() => resetCustomProps(componentName)}
          className="text-xs text-slate-500 hover:text-indigo-400 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
        {propsList.map((ctrl) => {
          const val = getPropValue(ctrl.name, ctrl.default);

          return (
            <div key={ctrl.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 font-mono">
                  {ctrl.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono italic">
                  {ctrl.type}
                </span>
              </div>

              {/* Boolean Control */}
              {ctrl.type === "boolean" && (
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => handleValueChange(ctrl.name, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-200 after:border-slate-300 after:border after:rounded-full after:height after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              )}

              {/* Number Control (Slider) */}
              {ctrl.type === "number" && (
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={ctrl.min ?? 0}
                    max={ctrl.max ?? 10}
                    step={ctrl.step ?? 0.1}
                    value={val}
                    onChange={(e) => handleValueChange(ctrl.name, Number(e.target.value))}
                    className="flex-1 accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-mono w-10 text-center">
                    {val}
                  </span>
                </div>
              )}

              {/* Dropdown Selection Control */}
              {ctrl.type === "select" && (
                <select
                  value={Array.isArray(val) ? val.join(",") : val}
                  onChange={(e) => {
                    const optionVal = e.target.value;
                    // Check if it's formatted as string array
                    if (optionVal.includes(",")) {
                      handleValueChange(ctrl.name, optionVal.split(","));
                    } else {
                      handleValueChange(ctrl.name, optionVal);
                    }
                  }}
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                  {ctrl.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {/* Color Control */}
              {ctrl.type === "color" && (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={val.startsWith("rgba") ? "#6366f1" : val}
                    onChange={(e) => handleValueChange(ctrl.name, e.target.value)}
                    className="w-8 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleValueChange(ctrl.name, e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-mono focus:outline-none"
                  />
                </div>
              )}

              {/* String / Text Area Control */}
              {(ctrl.type === "string" || ctrl.type === "text") && (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleValueChange(ctrl.name, e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              )}

              <p className="text-[10px] text-slate-500 leading-normal">
                {ctrl.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
