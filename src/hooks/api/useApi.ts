import {useCallback, useState} from "react";
import {Events} from "../../api/events";
import {TincWeb} from "../../api/tincweb";

let _api: TincWeb = new TincWeb();
let _events: Events = new Events('ws://127.0.0.1:8686/api/events');

export function useApi() {
  const [api, setApi] = useState(_api),
    [events, setEvents] = useState(_events);

  const createApi = useCallback(() => {
    setApi(new TincWeb())
  }, []);

  const connectEvents = useCallback(() => {
    setEvents(new Events('ws://127.0.0.1:8686/api/events'));
  }, []);

  return {api, events, createApi, connectEvents}
}
