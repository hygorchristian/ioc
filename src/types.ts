import type InversionOfControl from './InversionOfControl';

export type DependenciesMap = Record<string, any>;

export type BindCallback<
  ReturnValue,
  Container extends InversionOfControl<DependenciesMap>
> = (container: Container) => ReturnValue;

export type MockCallback<
  ReturnValue,
  Container extends InversionOfControl<DependenciesMap>
> = (container: Container, originalValue: ReturnValue) => ReturnValue;

export interface LookupNode<Namespace extends string> {
  namespace: Namespace;
  type: 'binding' | 'alias';
}

export type DependencyFactory<
  ReturnType = unknown,
  Container extends
    InversionOfControl<DependenciesMap> = InversionOfControl<DependenciesMap>
> = (ioc: Container) => ReturnType;

export type MockFactory<
  ReturnType = unknown,
  Container extends
    InversionOfControl<DependenciesMap> = InversionOfControl<DependenciesMap>
> = (ioc: Container, originalValue: ReturnType | null) => ReturnType;
