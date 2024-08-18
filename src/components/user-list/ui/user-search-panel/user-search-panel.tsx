import React from "react";
import "./search-panel.css";
type UserSearchPanelProps = {
  handleNameChange: (value: string) => void;
  handleAgeChange: (value: string) => void;
};
const UsetSearchPanel: React.FC<UserSearchPanelProps> = ({
  handleNameChange,
  handleAgeChange,
}) => {
  console.log("search");
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        onChange={(e) => handleAgeChange(e.target.value)}
      />
    </div>
  );
};

export default UsetSearchPanel;
