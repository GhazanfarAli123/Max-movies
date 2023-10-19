import React from 'react'

const pr = (data) => {
  return (
    <>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default pr