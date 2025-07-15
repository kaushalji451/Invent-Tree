import React from 'react'

import Popup from 'reactjs-popup';
const servicepost = () => {
  return (
    <div style={{ padding: '50px' }}>

      <Popup trigger={<button className="hover:text-persian-green-600 flex w-full cursor-pointer items-center justify-between p-2 text-2xl font-semibold text-neutral-700 transition-all duration-200 hover:scale-105 md:w-auto md:justify-center md:text-xl dark:text-neutral-100"> Post Service </button>} modal>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Popup Header </div>
            <div className="content">
              This is a popup window. You can put anything here.
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log('Doing something...');
                  close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default servicepost
