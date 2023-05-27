import React from 'react'
import loading from '../loading.gif'

const Spinner = () => {
  
    return (
      <div className='text-center'>
        <img src={loading} style={{ height: "50px" }} alt="not found" />
      </div>
    )

  }

  export default Spinner
