import {useNetworks} from "./useNetworks";
import {useStateSelector} from "../system/useStateSelector";
import {useCallback, useEffect} from "react";
import {useApi} from "./useApi";
import {dispatcher} from "../../store";
import _ from "lodash";


export function useAddress() {
  const address = useStateSelector(s => s.address.list)
  const {networks} = useNetworks(),
    {apiUI} = useApi()

  useEffect(() => {
    if (networks) {
      apiUI.endpoints()
        .then(endpoints => _.filter(endpoints, e => e.host !== '127.0.0.1'))
        .then(dispatcher.address.setList)
    }
  }, [apiUI, networks])

  const getToken = useCallback(async () => {
    return apiUI.issueAccessToken(30)
  }, [apiUI])


  return {address, getToken}
}
