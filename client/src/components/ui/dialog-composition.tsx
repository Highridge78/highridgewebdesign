import * as React from "react";

export interface DialogCompositionContextValue {
  isComposing: () => boolean;
  setComposing: (composing: boolean) => void;
  justEndedComposing: () => boolean;
  markCompositionEnd: () => void;
}

export const DialogCompositionContext =
  React.createContext<DialogCompositionContextValue>({
    isComposing: () => false,
    setComposing: () => {},
    justEndedComposing: () => false,
    markCompositionEnd: () => {},
  });

export const useDialogComposition = () =>
  React.useContext(DialogCompositionContext);
