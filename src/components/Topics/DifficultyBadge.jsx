import React from "react";
import Badge from "../Common/Badge";

const DifficultyBadge = ({ difficulty, className = "" }) => {
  const getVariant = () => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getIcon = () => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "🟢";
      case "medium":
        return "🟡";
      case "hard":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <Badge
      variant={getVariant()}
      className={`inline-flex items-center space-x-1 ${className}`}
    >
      <span>{getIcon()}</span>
      <span>{difficulty}</span>
    </Badge>
  );
};

export default DifficultyBadge;
