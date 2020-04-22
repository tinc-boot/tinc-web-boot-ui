import {useCallback, useState} from "react";
import {Events} from "../../api/events";
import {TincWeb} from "../../api/tincweb";

let _api: TincWeb = new TincWeb( 'ws://127.0.0.1:8686/api/'+process.env.REACT_APP_TOKEN+'/');
// let _events: Events = new Events('ws://127.0.0.1:8686/api/events/'+process.env.REACT_APP_TOKEN+'/');

export function useApi() {
  const [api, setApi] = useState(_api),
    [events, setEvents] = useState();

  const createApi = useCallback(() => {
    const api = new TincWeb('ws://127.0.0.1:8686/api/'+process.env.REACT_APP_TOKEN)
    setApi(api)
  }, []);

  const connectEvents = useCallback(() => {
    //setEvents(new Events('ws://127.0.0.1:8686/api/events/'));
  }, []);

  return {api, events, createApi, connectEvents}
}
