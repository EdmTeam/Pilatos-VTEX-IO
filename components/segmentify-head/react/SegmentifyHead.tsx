import React from 'react';
import { Helmet } from 'vtex.render-runtime'

const SegmentifyHead = () => {

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="//cdn.segmentify.com/454787be-312f-4804-a4a7-972f960481c6/search.css" />

        <script src="//cdn.segmentify.com/454787be-312f-4804-a4a7-972f960481c6/search.js"></script>

        <script src="//cdn.segmentify.com/454787be-312f-4804-a4a7-972f960481c6/segmentify.js"></script>

      </Helmet>
    </>
  );
};

export default SegmentifyHead;