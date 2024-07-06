import React from 'react';
import RenderNavigation from './RenderNavigation';

const DesktopNavigation: React.FC = () => {
  return (
    <aside className="border-border hidden flex-col border-r border-solid pt-4 sm:flex sm:w-[240px]">
      <RenderNavigation />
    </aside>
  );
};

export default DesktopNavigation;
