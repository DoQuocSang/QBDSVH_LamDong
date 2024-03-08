import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TabGrid from "components/user/cards/TabCardGrid.js";
import FAQS from "components/user/faqs/SingleCol.js";

export default ({ roundedHeaderButton }) => {
    document.title = 'Danh sách di sản';

    return (
        <AnimationRevealPage>
            <TabGrid />
            <FAQS />
        </AnimationRevealPage>
    );
}

