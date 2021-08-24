import React from "react";

function AppShadowDiv(props) {
  const { children, style } = props;

  const styles = {
    ...style,
    marginTop: 0,
  };
  return (
    <div style={styles} className="shadow-sm p-3 mb-2 bg-body rounded">
      {children}
    </div>
  );
}

export default AppShadowDiv;
