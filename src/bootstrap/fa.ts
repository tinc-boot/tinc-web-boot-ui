import { library } from '@fortawesome/fontawesome-svg-core'
import {faCheck, faNetworkWired, faPause, faPlay, faPlus, faSpinner} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";

// IconDefinition
//const i: IconDefinition =

export const fa = {
  faSpinner,
  faNetworkWired,
  faPlay,
  faPause,
  faPlus,
  faChevronRight,
  faCheck,
  faTimes,
  faSun,
  faMoon
};

export const faInit = () => {
  library.add(..._.values(fa))
};
