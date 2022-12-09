import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    //Slidedown
    case "clearSlidedown":
      return { ...state, slidedown: initializeSlidedown() };

    case "setSlidedown":
      return {
        ...state,
        slidedown: { ...state.slidedown, ...action.slidedown },
      };

    //User
    case "setUser":
      return {
        ...state,
        user: action.user,
      };

    default:
      const message = `No reducer action of type: ${action.type}`;
      throw Error(message);
  }
}

export default function useAppState() {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    slidedown: initializeSlidedown(),
  });

  return { state, dispatch };
}

function initializeSlidedown() {
  return { message: "", severity: "", duration: 2000 };
}
