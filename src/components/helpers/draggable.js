import React, { memo, useRef } from "react";
import Draggable from "react-draggable";
import { isClient } from "../../utils/is-client";

export const DraggableComponent = memo(() => {
  const draggleRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const [disabled, setDisabled] = useState(true);

  if (isClient) {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();

    const onStart = (event, uiData) => {
      setBounds({
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      });
    };
    return (
      <>
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{model}</div>
        </Draggable>
      </>
    );
  }
});

DraggableComponent.displayName = DraggableComponent;
