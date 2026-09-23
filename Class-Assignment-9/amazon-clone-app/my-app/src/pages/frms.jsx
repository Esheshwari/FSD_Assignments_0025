import React from 'react'

function frms() {
  return (
    <div>
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" /> <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" /> <br />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default frms