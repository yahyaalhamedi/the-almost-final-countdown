import { forwardRef } from 'react'

// forwardRef is a React utility that allows you to pass refs down to child components.
// it optional in react 19.0 and later, but it is a good practice to use it when you need to access the DOM element directly.

// forwardRef allows us to pass a ref to the dialog element
// This is useful for controlling the dialog from parent components
// such as opening or closing it programmatically.
// In this case, we use it to show the dialog when the timer expires.

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
  return (
    <dialog
      ref={ref}
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
