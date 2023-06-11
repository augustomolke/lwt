interface SidebarMenuItemProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  sufix?: React.ReactNode;
}

const SidebarMenuItem: React.FunctionComponent<SidebarMenuItemProps> = ({
  href,
  icon,
  children,
  sufix,
}) => {
  return (
    <li>
      <a
        href={href}
        className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
      >
        {icon}
        <span className='ml-3'>{children}</span>
        {sufix}
      </a>
    </li>
  );
};

export default SidebarMenuItem;
