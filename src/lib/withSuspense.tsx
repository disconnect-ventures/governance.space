import { Suspense, ComponentType } from "react";

export function withSuspense<T extends object>(
  Component: ComponentType<T>,
  LoadingComponent: ComponentType = () => null
) {
  return function WithSuspenseWrapper(props: T) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
