import {useStateSelector} from "../system/useStateSelector";
import {useCallback, useEffect} from "react";
import {useApi} from "./useApi";
import {dispatcher} from "../../store";
import {useFetching} from "../system/useFetching";
import {Network, Sharing} from "../../api/tincweb";

const defaultSubnet = '10.165.0.0/16'
export interface JWTData {
  "iat":string,
  "network":string,
  "role":string,
  "subnet":string
}

export function useNetworks() {
  const {api, events} = useApi();
  const networks = useStateSelector(s => s.networks.list),
    {fetching, withFetching} = useFetching();

  const loadNetworks = useCallback(async () => {
    try {
      const networks: Network[] = await withFetching(api.networks())
      dispatcher.networks.setList(networks)
    } catch (e) {
      // TODO notify error
    } finally {
    }
  }, [api, withFetching]);

  const createNetwork = useCallback(async (name: string, subnet: string = defaultSubnet) => {
    try {
      const n = await withFetching(api.create(name, subnet))
      dispatcher.networks.add(n)
    } catch (e) {
      // TODO notify error
    } finally {
    }
  }, [api, withFetching])

  const importNetwork = useCallback(async (shared64: string, name?: string) => {
    return await withFetching(async () => {
      try {
        const shared: Sharing = JSON.parse(shared64);
        const n = await api.import(name ? {...shared, name} : shared);
        dispatcher.networks.add(n)
        return true
      } catch (e) {
        // TODO notify error
        console.error(e)
        return false
      } finally {
      }
    });
  }, [api, withFetching])

  const importMojordomo = useCallback(async (url: string) => {
    await withFetching(api.join(url, true))
    await loadNetworks()
  } , [api, loadNetworks, withFetching])

  useEffect(() => {
    events.onStarted(loadNetworks);
    events.onStopped(loadNetworks);
  }, [events, loadNetworks])

  return {networks, loadNetworks, fetching, createNetwork, importNetwork, importMojordomo}
}
