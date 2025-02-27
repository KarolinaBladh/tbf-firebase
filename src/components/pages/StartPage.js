import React, {useContext, useEffect} from 'react';
import firebase from '../Firebase/firebase';
import LoadingStandard from "../microComponents/Loading/LoadingStandard";
import {
    FetchLastUpdatedArtistTimestamp, FetchLastUpdatedArtistId, FetchCounters,
    FetchLastAddedRecordArtistId, FetchLastAddedRecordId, FetchLastAddedRecordTimestamp
} from "../../api-functions/api";
import {ArtistLink} from "../apiComponents/ArtistComponents";
import AllArtistsPaginated from "../lists/AllArtistsPaginated";
import IconLink from "../microComponents/Links/IconLink";
import * as ROUTES from "../../constants/routes";
import {RecordLink} from "../cards/RecordCard";
import AllRecordsPaginated from "../lists/AllRecordsPaginated";
import AllTracksPaginated from "../lists/AllTracksPaginated";
import CopyrightInformation from "../microComponents/CopyrightInformation";
import {NavigationContext} from "../NavigationStore/NavigationStore";

console.log("-- WE HAVE FIREBASE " + firebase.app.name + " --");

const StartPage = () => {
    const setHideNavs = useContext(NavigationContext)[1];
    useEffect(() =>
        setHideNavs(false)
    )
    const lastUpdatedArtistId = FetchLastUpdatedArtistId();
    const lastUpdatedArtistDate = new Date(FetchLastUpdatedArtistTimestamp().seconds * 1000);
    const lastAddedRecordId = FetchLastAddedRecordId();
    const lastAddedRecordArtistId = FetchLastAddedRecordArtistId();
    const lastAddedRecordDate = new Date(FetchLastAddedRecordTimestamp().seconds * 1000);
    const package_json = require('../../../package.json');

    let counters = FetchCounters();
    let countersAreFetched;
    countersAreFetched = !!(counters.recordCounter && counters.songCounter);

    return lastUpdatedArtistId.length && lastAddedRecordId.length && lastAddedRecordArtistId.length && countersAreFetched ?
        (<div className="container-fluid standard-container">
            <div className="row">
                <div className="start-page-secondary-column">
                    <main className="standard-box-wrapper__near-dark mb-5">
                        <h1>The Baseball Field & Friends</h1>
                        <p>The music scene in Nyk&ouml;ping has delivered great music since the early 90's. </p>
                        <p>This website, former home of band <b>The Baseball Field</b> and music labels <b>Vanishing Vanity Music</b> and <b>Strandad
                            Sj&ouml;buse Records</b>, now brings you that good old music in a modern way.</p>
                        <h2>Extra content</h2>
                        <h3>Links</h3>
                        <p><IconLink link={"https://thebaseballfield.se/old/"} text={"The old TBF/VVM site"} icon={"sitemap"}/></p>
                        <h3>Video</h3>
                        <p>T.B.A</p>
                        <h3>Documentation</h3>
                        <div className="list-group-item list-group-item-warning flex-column align-items-start mb-3">
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <h4 className="mb-1">Changelog</h4>
                                <small>v. {package_json.version}</small>
                            </div>

                            <ol className="small">
                                <li className="mb-1">Updated <strong>Cloud Firestore</strong> security.</li>
                                <li className="mb-1">Record cover in audio player now holds a link to the record.</li>
                                <li className="mb-1">Lots of a11y fixes to improve ux.</li>
                                <li className="mb-1">Minor visual and ux improvements.</li>
                                <li className="mb-1">Fixed audio player bug in <strong>Chrome</strong>.</li>
                                <li className="mb-1">Improved test coverage with <strong>Jest</strong>.</li>
                            </ol>
                            <small>{lastUpdatedArtistDate.toLocaleDateString()}</small>
                        </div>
                        <div className="list-group-item list-group-item-info flex-column align-items-start mb-3">
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <h4 className="mb-1">Previous changes</h4>
                            </div>
                            <ol className="small">
                                <li className="mb-1">Added option to minimize the audio player.</li>
                                <li className="mb-1">Record cover is now visible in audio player.</li>
                                <li className="mb-1">Minor visual improvements.</li>
                                <li className="mb-1">Added global state for audio player. You are now able to listen to music while surfing the
                                    site.
                                </li>
                                <li className="mb-1">This enabled me to solve a bug on the <strong>Tracks</strong> page where multiple tracks were
                                    playing
                                    at the same time when you chose a new track from another record.
                                </li>
                                <li className="mb-1">The audio player also got a visual upgrade.</li>
                                <li className="mb-1">Implemented a <strong>Styleguidist</strong> styleguide for component documentation.</li>
                                <li className="mb-1">Behind the scenes, testing for the site is now powered by <strong>Jest</strong>.</li>
                                <li className="mb-1">Added filtering
                                    to <strong>Artists</strong>, <strong>Records</strong> and <strong>Tracks</strong> pages.
                                </li>
                            </ol>
                        </div>
                        <p><IconLink link={"https://thebaseballfield.se/styleguide/"} text={"TBF & Friends react styleguide"} icon={"book-dead"} external={true}/></p>
                        <p><IconLink link={ROUTES.DEVOPS} text={"DevOps"} icon={"journal-whills"}/></p>
                        <CopyrightInformation className={"d-none d-lg-block"}/>
                    </main>
                </div>
                <div className="start-page-main-column">
                    <section className="standard-main-column__section" aria-labelledby="section-header-artists">
                        <h2 className="section-header" id="section-header-artists">Popular artists</h2>
                        <p className="small m-0">
                            Last updated artist: <ArtistLink id={lastUpdatedArtistId}
                                                             className={"text-uppercase"}/> ({lastUpdatedArtistDate.toLocaleDateString()}).
                        </p>
                        <AllArtistsPaginated/>
                        <IconLink className={"ml-3"} link={ROUTES.ARTISTS} text={"See all artists"} icon={"user-astronaut"}/>
                    </section>
                    <section className="standard-main-column__section" aria-labelledby="section-header-records">
                        <h2 className="section-header" id="section-header-records">Popular records</h2>
                        <p className="small m-0">
                            Last added record: <RecordLink id={lastAddedRecordId}/> by <ArtistLink
                            id={lastAddedRecordArtistId} className={"text-uppercase"}/> ({lastAddedRecordDate.toLocaleDateString()}). Total number of
                            records: {counters.recordCounter}
                        </p>
                        <AllRecordsPaginated/>
                        <IconLink className={"ml-3"} link={ROUTES.RECORDS} text={"See all records"} icon={"compact-disc"}/>
                    </section>
                    <section className="standard-main-column__section" aria-labelledby="section-header-tracks">
                        <h2 className="section-header" id="section-header-tracks">Popular tracks</h2>
                        <p className="small m-0">Total number of tracks: {counters.songCounter}</p>
                        <AllTracksPaginated/>
                        <IconLink className={"ml-3"} link={ROUTES.TRACKS} text={"See all tracks"} icon={"music"}/>
                        <CopyrightInformation className={"d-block d-lg-none mt-5"}/>
                    </section>

                </div>
            </div>
        </div>)
        :
        (<LoadingStandard spinning={true}/>)
};
export default StartPage;
