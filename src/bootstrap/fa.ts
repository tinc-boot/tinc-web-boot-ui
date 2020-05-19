// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {library, IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {
  faCheck, faCircle as fasCircle,
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
import {faCircle as farCircle} from '@fortawesome/free-regular-svg-icons'
import _ from 'lodash'
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";

// IconDefinition
//const i: IconDefinition = faCircle

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
  faQrcode,
  fasCircle,
  farCircle
};

export const faInit = () => {
  library.add(..._.values(fa))
};
