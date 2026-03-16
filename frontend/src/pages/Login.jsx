import React from 'react'

export const Login = () => {
  return (
    <div className='container d-flex justify-content-center align-items-center'>
        <form className='w-50 mx-auto mt-5 bg-light p-4 rounded border'>
            <div className="mb-3">
                <label for="emailInput" className="form-label">Email *:</label>
                <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                
            </div>
            <div className="mb-3">
                <label for="passwordInput" className="form-label">Password *:</label>
                <input type="text" className="form-control" id="passwordInput" />
            </div>
            <div className='text-center'>
                <button type="submit" className="btn btn-primary px-4 fs-5">Login</button>
            </div>
        </form>
    </div>
  )
}
