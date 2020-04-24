import {useCallback, useState} from "react";
import {useApi} from "./useApi";
import {useFetching} from "../system/useFetching";
import {dispatcher} from "../../store";
import {Node} from "../../api/tincweb";
import {useStateSelector} from "../system/useStateSelector";
import _ from "lodash";


export function useNetwork(name: string) {
  const {api} = useApi(),
    network = useStateSelector(s => _.find(s.networks.list, {name})),
    [node, setNode] = useState<Node>(),
    {fetching, withFetching} = useFetching();

  const loadNetwork = useCallback(async () => {
    withFetching((async () => {
      const networkP = api.network(name),
        nodeP = api.node(name);
      const network = await networkP,
        node = await nodeP;
      dispatcher.networks.add(network);
      setNode(node);
    })())
  }, [api, name, withFetching])

  const start = useCallback(async () => {
    const res = await withFetching(api.start(name))
    dispatcher.networks.add(res)
  }, [api, name, withFetching]);

  const stop = useCallback(async () => {
    const res = await withFetching(api.stop(name));
    dispatcher.networks.add(res)
  }, [api, name, withFetching])

  const remove = useCallback(async () => {
    const res = await withFetching(api.remove(name));
    if (res) {
      dispatcher.networks.remove(name)
    }
  }, [api, name, withFetching])

  const shared = useCallback( async () => {
    const res = await withFetching(api.share(name))
    return btoa(JSON.stringify(res))
  }, [api, name, withFetching])

  return {network, node, start, fetching, stop, remove, loadNetwork, shared}
}
