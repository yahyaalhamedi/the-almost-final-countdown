import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

// forwardRef is a React utility that allows you to pass refs down to child components.
// it optional in react 19.0 and later, but it is a good practice to use it when you need to access the DOM element directly.

// forwardRef allows us to pass a ref to the dialog element
// This is useful for controlling the dialog from parent components
// such as opening or closing it programmatically.
// In this case, we use it to show the dialog when the timer expires.

const ResultModal = forwardRef(function ResultModal({ targetTime, timeRemainimg, onReset }, ref) {
  const dialog = useRef()

  // useImperativeHandle is a React hook that allows you to customize the instance value that is exposed to parent components when using refs.
  // In this case, we expose an `open` method that shows the dialog when called.
  // This allows parent components to control the dialog's visibility without directly manipulating the DOM.
  // This is useful for encapsulating the logic of showing the dialog and keeping the component reusable.
  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal()
    },
  }))

  const userLost = timeRemainimg <= 0
  const formattedTimeRemainimg = (timeRemainimg / 1000).toFixed(2)
  const score = Math.round((1 - timeRemainimg / (targetTime * 1000)) * 100)

  const portalRoot = document.getElementById('modal')

  // createPortal is a React function that allows you to render a component into a different part of the DOM tree.
  // In this case, we render the dialog into a specific element with the ID 'modal' which is exist in index.html file.
  // This is useful for creating modals or overlays that need to be rendered outside the normal React component hierarchy.
  // It helps in avoiding issues with z-index and overflow styles that can occur when rendering modals directly within the component tree.
  return createPortal(
    <dialog
      ref={dialog}
      className="result-modal"
    >
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the time with <strong>{formattedTimeRemainimg} seconds left.</strong>
      </p>
      <form
        method="dialog"
        onSubmit={onReset}
      >
        <button>Close</button>
      </form>
    </dialog>,
    portalRoot,
  )
})

export default ResultModal
