import React, { useEffect } from "react";
import NProgress from "nprogress";

interface LoadingBarProps {
  loading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ loading }) => {
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return null;
};

export default LoadingBar;
