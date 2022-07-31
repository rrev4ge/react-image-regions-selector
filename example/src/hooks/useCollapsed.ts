import { useEffect, useState } from 'react';
import { useWindowDimensions } from './index';

const useCollapsed = () => {
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = useState(false);
  const [manualCollapsed, setManualCollapsed] = useState(false);
  const [margin, setMargin] = useState<{ [key: string]: string | number }>({});

  // eslint-disable-next-line consistent-return
  const collapsedHandler = () => {
    if (width > 470 && !manualCollapsed) {
      return setCollapsed(false);
    }
    if (width > 470 && manualCollapsed) {
      return setCollapsed(true);
    }
    if (width <= 470 && manualCollapsed) {
      return setCollapsed(false);
    }
    if (width <= 470) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    collapsedHandler();
  }, [width, manualCollapsed]);

  useEffect(() => {
    if (collapsed) {
      setMargin({ marginLeft: 50 });
    }
    if (!collapsed) {
      setMargin({ marginLeft: 200 });
    }
  }, [collapsed]);

  return {
    collapsed,
    setCollapsed,
    manualCollapsed,
    setManualCollapsed,
    margin,
    setMargin,
  };
};

export default useCollapsed;
