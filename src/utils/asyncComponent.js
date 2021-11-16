import React from "react";
import dynamic from "next/dynamic";
import CircularProgress from "../components/CircularProgress";

const AsyncComponent = (importComponent) => {
  return dynamic(importComponent, {
    loadings: () => {
      <CircularProgress />;
    },
  });
};

AsyncComponent.displayName = AsyncComponent;
export default AsyncComponent;
