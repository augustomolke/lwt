'use client';
import { useSession } from 'next-auth/react';
import SidebarMenuItem from './SidebarMenuItem';
import UserCard from './UserCard';
import Burger from './Burger/Burger';
import PrivateSidebar from './PrivateSidebar';
import PublicSidebar from './PublicSidebar';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({ children }) => {
  const { data, status } = useSession();

  if (status === 'loading') return null;

  if (status === 'authenticated')
    return <PrivateSidebar user={data.user}>{children}</PrivateSidebar>;

  return <PublicSidebar>{children}</PublicSidebar>;
};

export default Sidebar;
