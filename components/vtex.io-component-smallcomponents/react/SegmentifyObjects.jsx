import React, {useEffect, Fragment} from 'react';
import { useRuntime } from 'vtex.render-runtime';

const SegmentifyObjects = () => {
    var runtime = useRuntime()
    console.log("esto es renderr", runtime.page, runtime)
    useEffect(() => {
        setTimeout(() => {
                //var containerSegClass = document.querySelector(".render-container").getAttribute("class");
                var containerSegClass = runtime.page;
                if(containerSegClass.includes("category")) {
                    window.segPagetype=[{
                        pagetype: "category"
                    }];
                }
                else if(containerSegClass.includes("home")) {
                    window.segPagetype=[{
                        pagetype: "home"
                    }];
                }
                else if(containerSegClass.includes("search")) {
                    window.segPagetype=[{
                        pagetype: "search result"
                    }];
                }
        }, 1000);
    }, []);
    return (
        <Fragment>
        </Fragment>
    )
}

export default SegmentifyObjects