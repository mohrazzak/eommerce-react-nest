import { isEqual } from 'lodash';
import { useEffect, useRef } from 'react';

export default function useDeepCompareEffect(
  callback: () => void,
  dependencies: unknown[]
) {
  const previousDependencies = useRef<unknown[]>([]);

  if (!isEqual(previousDependencies.current, dependencies)) {
    previousDependencies.current = dependencies;
  }
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(callback, previousDependencies.current);
}
