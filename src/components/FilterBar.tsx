import React from "react";
import { Filter } from "../types";

interface Props {
  value: Filter;
  onChange: (f: Filter) => void;
}

export const FilterBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 15 }}>
      {(["all", "active", "completed"] as const).map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            padding: "6px 12px",
            fontWeight: value === f ? "bold" : "normal",
          }}
        >
          {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
        </button>
      ))}
    </div>
  );
};
