import {useCallback, useEffect, useState} from "react";
import {Events} from "../../api/events";
import {TincWeb} from "../../api/tincweb";
import {TincWebUI} from "../../api/tincwebui";
import {useStateSelector} from "../system/useStateSelector";
import {TincWebMajordomo} from "../../api/tincwebmajordomo";

function getHost() {
  if (process.env.NODE_ENV === 'development') {
    return '127.0.0.1:8686'
  } else {
    return window.location.host
  }
}

const getApi = (token: string) => new TincWeb(`ws://${getHost()}/api/${token}/`);
const getEvents = (token: string) => new Events(`ws://${getHost()}/api/${token}/events`);
const getApiUI = (token: string) => new TincWebUI(`ws://${getHost()}/api/${token}/`);
const getMojordomo = (token: string) => new TincWebMajordomo(`ws://${getHost()}/api/${token}/`);

let api = getApi('default')
let events = getEvents('default')
let apiUI = getApiUI('default')
let mojordomo = getMojordomo('default')

export function useApi() {
  const token = useStateSelector(s => s.system.token),
    [prevToken, setPrevToken] = useState('default')

  useEffect(() => {
    if (token !== prevToken) {
      api = getApi(token)
      events = getEvents(token)
      apiUI = getApiUI(token)
      mojordomo = getMojordomo(token)
      setPrevToken(token)
    }
  }, [prevToken, token])

  const createApi = useCallback((baseURL: string) => {
    api = new TincWeb(baseURL + '/api/' + process.env.REACT_APP_TOKEN)
  }, []);

  const connectEvents = useCallback((baseURL: string) => {
    events = new Events(baseURL + '/api/' + process.env.REACT_APP_TOKEN + '/events')
  }, []);

  const createApiUI = useCallback((baseURL: string) => {
    apiUI = new TincWebUI(baseURL + '/api/' + process.env.REACT_APP_TOKEN + '/')
  }, [])

  return {api, events, apiUI, mojordomo, createApi, connectEvents, createApiUI}
}
