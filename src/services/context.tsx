import React, {
  createContext,
  JSX,
  useContext
} from 'react';
import { Container } from 'inversify';
import { repositoryContainer } from './inversify.conf';


interface RepositoryIocContextValue {
  container: Container;
}

const RepositoryIocContext = createContext<RepositoryIocContextValue | null>(null);

type RepositoryIocProviderProps = {
  container?: Container
  children: JSX.Element,
};

export const RepositoryIocProvider = ({
  container,
  children
}: RepositoryIocProviderProps) => {
  const value = { container: container || repositoryContainer };

  return <RepositoryIocContext.Provider value={value}>{children}</RepositoryIocContext.Provider>;
};

export const useRepositoryIoc = (): RepositoryIocContextValue => {
  const context = useContext(RepositoryIocContext);
  if (!context) {
    throw new Error("useRepositoryIoc must be used within a RepositoryIocProvider");
  }
  return context;
};
