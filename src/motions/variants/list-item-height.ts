import {Variants} from "framer-motion";


export const listItemHeight: Variants = {
  visible: {
    maxHeight: [0, 112, 112],
    opacity: [0, 0.3, 1],
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    maxHeight: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    maxHeight: [112, 112, 0],
    opacity: [1, 0.3, 0],
    transition: {
      duration: 0.4,
    },
  },
};
