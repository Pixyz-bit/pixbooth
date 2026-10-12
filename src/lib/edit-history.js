export function makeEditHistory(present, history = {}) {
  return {
    present,
    past: Array.isArray(history.past) ? history.past.slice(-60) : [],
    future: Array.isArray(history.future) ? history.future.slice(0, 60) : [],
  };
}
export function editHistoryReducer(state, action) {
  if (action.type === 'undo') {
    if (!state.past.length) return state;
    return {
      present: state.past.at(-1),
      past: state.past.slice(0, -1),
      future: [state.present, ...state.future].slice(0, 60),
    };
  }
  if (action.type === 'redo') {
    if (!state.future.length) return state;
    return {
      present: state.future[0],
      past: [...state.past, state.present].slice(-60),
      future: state.future.slice(1),
    };
  }
  if (action.type === 'patch') {
    const present = { ...state.present, ...action.values };
    if (Object.keys(action.values).every((key) => state.present[key] === present[key]))
      return state;
    return { present, past: [...state.past, state.present].slice(-60), future: [] };
  }
  return state;
}
