import React from 'react';
import { Helmet } from 'vtex.render-runtime'
// import { useRuntime } from 'vtex.render-runtime';

const SegmentifyHead = () => {
  // const runtime = useRuntime();

  // if(runtime.page !== "vtex.store@2.x:store.custom#prueba-head-segmentify") {
  //   return null
  // }
  

  return (
    <>
      <Helmet>

  <link rel="stylesheet" href="//cdn.segmentify.com/20818070-a3ae-474a-bf22-2e32619ecefb/search.css" />

  <script id='search-pilatos-segmentify' src="//cdn.segmentify.com/20818070-a3ae-474a-bf22-2e32619ecefb/search.js"></script>

</Helmet>
    </>
  );
};

export default SegmentifyHead;