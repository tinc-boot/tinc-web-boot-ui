import {useCallback, useState} from "react";
import {useStateSelector} from "./useStateSelector";
import {dispatcher} from "../../store";

type Task<T> = Promise<T> | (() => Promise<T>)

export const useFetching = () => {
  const globalFetching = useStateSelector(s => s.system.fetching),
    [fetching, setFetching] = useState(false);

  const withFetching = useCallback( <T>(task: Task<T>): Promise<T> => {
    dispatcher.system.inc();
    setFetching(true);
    const p = typeof task === 'function' ? task() : task;
    p.finally(() => {
      setTimeout(() => {
        dispatcher.system.dec();
        setFetching(false);
      }, 100)
    });
    return p;
  }, []);

  return {globalFetching, fetching, withFetching}
}
