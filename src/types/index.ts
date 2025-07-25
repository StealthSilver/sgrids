export interface NavItem {
    name: string;
    href: string;
    section: string;
  }
  
  export interface SectionProps {
    id: string;
    className?: string;
  }
  
  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
  }
  