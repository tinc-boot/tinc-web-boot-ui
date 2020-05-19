import { useCallback, useEffect, useState } from "react";
import { PeerInfo } from "../../api/tincweb";
import { useFetching } from "../system/useFetching";
import { useApi } from "./useApi";

export function usePeers(name: string) {
  const { withFetching } = useFetching(),
    { api } = useApi();
  const [peers, setPeers] = useState<PeerInfo[]>();

  const loadPeers = useCallback(async (shadow: boolean = false) => {
    try {
      const peers = await withFetching(api.peers(name), shadow);
      setPeers(peers);
    } catch (e) {
      console.error(e);
    }
  }, [api, name, withFetching]);

  useEffect(() => {
    if (!peers) {
      loadPeers();
    }
  }, [loadPeers, peers]);

  return { peers, loadPeers };
}
