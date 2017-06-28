import React from 'react'
import ReactDOM from 'react-dom'

import RootRouter from './config/Route-Config'

import 'antd/dist/antd.less'
import './Sources/style/App'


ReactDOM.render(
  <div className='allen'>
    {RootRouter}
  </div>,
  document.getElementById('app')
)
