import {useCallback, useState} from "react";
import {useStateSelector} from "./useStateSelector";
import {dispatcher} from "../../store";


export const useFetching = () => {
  const globalFetching = useStateSelector(s => s.system.fetching),
    [fetching, setFetching] = useState(false);

  const withFetching = useCallback( <T>(task: Promise<T>): Promise<T> => {
    dispatcher.system.inc();
    setFetching(true);
    task.finally(() => {
      setTimeout(() => {
        dispatcher.system.dec();
        setFetching(false);
      }, 200)
    });
    return task;
  }, []);

  return {globalFetching, fetching, withFetching}
}
