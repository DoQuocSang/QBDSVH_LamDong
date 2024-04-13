const initialState = {
    scene: 'outsideOne',
  };
  
  const sceneReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_SCENE':
        return {
          ...state,
          scene: action.payload.sceneName,
        };
      default:
        return state;
    }
  };
  
  export default sceneReducer;
  