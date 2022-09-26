import { type PropsWithChildren } from 'react';
import { useCmd } from 'hooks/useCmd';
import { Cmd } from 'components/CmdK';

export const CmdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useCmd();
  return (
    <>
      {children}
      <Cmd />
    </>
  );
};
