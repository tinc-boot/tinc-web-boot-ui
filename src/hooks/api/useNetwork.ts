import {useCallback, useState} from "react";
import {useApi} from "./useApi";
import {useFetching} from "../system/useFetching";
import {dispatcher} from "../../store";
import {Network, Node} from "../../api/api";


export function useNetwork(name: string) {
  const {api} = useApi(),
    [network, setNetwork] = useState<Network>(),
    [node, setNode] = useState<Node>(),
    {fetching, withFetching} = useFetching();

  const loadNetwork = useCallback(async () => {
    withFetching((async () => {
      const networkP = api.network(name),
        nodeP = api.node(name);
      const network = await networkP,
        node = await nodeP;
      setNetwork(network);
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

  return {network, node, start, fetching, stop, remove, loadNetwork}
}
