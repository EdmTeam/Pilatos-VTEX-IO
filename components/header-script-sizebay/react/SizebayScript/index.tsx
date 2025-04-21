import React from 'react'
import { Helmet } from 'vtex.render-runtime'

function SizebayScript() {
    return (
      <Helmet>
        <script defer id="sizebay-vfr-v4" src="https://static.sizebay.technology/5885/prescript.js" ></script>

      </Helmet>
    )
}
  
export default SizebayScript