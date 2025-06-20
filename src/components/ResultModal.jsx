import { forwardRef, useImperativeHandle, useRef } from 'react'

// forwardRef is a React utility that allows you to pass refs down to child components.
// it optional in react 19.0 and later, but it is a good practice to use it when you need to access the DOM element directly.

// forwardRef allows us to pass a ref to the dialog element
// This is useful for controlling the dialog from parent components
// such as opening or closing it programmatically.
// In this case, we use it to show the dialog when the timer expires.

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
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

  return (
    <dialog
      ref={dialog}
      className="result-modal"
    >
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the time with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  )
})

export default ResultModal
