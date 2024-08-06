import { ReactNode } from 'react';

interface OnlyProps {
  when: unknown;
  children: ReactNode;
}

export const Only: React.FC<OnlyProps> = ({ when, children }) => {
  return when ? <>{children}</> : null;
};
