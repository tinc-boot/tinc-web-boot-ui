import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faDownload,
  faNetworkWired,
  faPause,
  faPlay,
  faPlus,
  faQrcode,
  faSpinner,
  faTrash,
  faUpload
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";

// IconDefinition
//const i: IconDefinition =

export const fa = {
  faSpinner,
  faNetworkWired,
  faPlay,
  faPause,
  faPlus,
  faChevronRight,
  faChevronLeft,
  faCheck,
  faTimes,
  faSun,
  faUpload,
  faDownload,
  faTrash,
  faMoon,
  faQrcode
};

export const faInit = () => {
  library.add(..._.values(fa))
};
