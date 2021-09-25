import React, {useContext, useEffect} from 'react';
import {NavigationContext} from "../NavigationStore/NavigationStore";

const DevopsPage = () => {
    const setHideNavs = useContext(NavigationContext)[1];
    useEffect(() =>
        setHideNavs(true)
    )

    return (
        <>
            <div className="container-fluid standard-container bg-light">
            <main className="row no-gutters">
                <div className="col-12">
                    <h1 className="mb-3">DevOps</h1>
                </div>
            </main>
            </div>
        </>
    );
}

export default DevopsPage;
