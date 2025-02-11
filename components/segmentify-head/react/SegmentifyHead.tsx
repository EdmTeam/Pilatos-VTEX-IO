import React from 'react';
import { Helmet } from 'vtex.render-runtime'

const SegmentifyHead = () => {

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="//cdn.segmentify.com/20818070-a3ae-474a-bf22-2e32619ecefb/search.css" />
        <script src="//cdn.segmentify.com/20818070-a3ae-474a-bf22-2e32619ecefb/search.js"></script>
      </Helmet>
    </>
  );
};

export default SegmentifyHead;