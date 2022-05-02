import React, {useEffect, Fragment} from 'react';

const TeamselectedNb = () => {
    useEffect(() => {
        setTimeout(() => {
            const tabSelect = document.querySelectorAll(".vtex-tab-layout-0-x-listItem--tabs-newbalanceform");
            tabSelect.forEach(tab => {
                tab.addEventListener("click", function(){
                    let textTab = tab.innerText;
                    setTimeout(() => {
                        let inputInfluencer = document.querySelectorAll(".vtex-styleguide-9-x-input");
                        inputInfluencer.forEach(input => {
                            let placeholderInput = input.placeholder;
                            if(placeholderInput == "Influencer") {
                                input.value = textTab;
                            } 
                        });
                    }, 1000);
                }, false) 
            });
        }, 500);
    }, []);
    return (
        <Fragment>
        </Fragment>
    )
}

export default TeamselectedNb