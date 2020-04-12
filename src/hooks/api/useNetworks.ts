import {useStateSelector} from "../system/useStateSelector";
import {useCallback, useEffect} from "react";
import {useApi} from "./useApi";
import {dispatcher} from "../../store";
import {useFetching} from "../system/useFetching";

export function useNetworks() {
  const {api, events} = useApi();
  const networks = useStateSelector( s => s.networks.list),
    {fetching, withFetching} = useFetching();

  const loadNetworks = useCallback(async () => {
    try {
      const networks = await withFetching(api.networks())
      dispatcher.networks.setList(networks)
    } finally {
    }
  }, [api, withFetching]);

  useEffect(() => {
    events.onStarted(loadNetworks);
    events.onStopped(loadNetworks);
  }, [events, loadNetworks])

  return {networks, loadNetworks, fetching}
}
