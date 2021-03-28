import React from 'react';
import firebase from '../Firebase/firebase';
import LoadingStandard from "../microComponents/Loading/LoadingStandard";
import {FetchLastUpdatedArtistTimestamp, FetchLastUpdatedArtistId, FetchCounters} from "../../api-functions/artists-api";
import {FetchLastAddedRecordArtistId, FetchLastAddedRecordId, FetchLastAddedRecordTimestamp} from "../../api-functions/records-api";
import {ArtistLink} from "../apiComponents/ArtistComponents";
import AllArtistsPaginated from "../lists/AllArtistsPaginated";
import IconLink from "../microComponents/Links/IconLink";
import * as ROUTES from "../../constants/routes";
import {RecordLink} from "../cards/RecordCard";
import AllRecordsPaginated from "../lists/AllRecordsPaginated";
import AllTracksPaginated from "../lists/AllTracksPaginated";
import CopyrightInformation from "../microComponents/CopyrightInformation";

console.log("-- WE HAVE FIREBASE " + firebase.app.name + " --");

const StartPage = () => {

    const lastUpdatedArtistId = FetchLastUpdatedArtistId();
    const lastUpdatedArtistDate = new Date(FetchLastUpdatedArtistTimestamp().seconds * 1000);
    const lastAddedRecordId = FetchLastAddedRecordId();
    const lastAddedRecordArtistId = FetchLastAddedRecordArtistId();
    const lastAddedRecordDate = new Date(FetchLastAddedRecordTimestamp().seconds * 1000);

    let counters = FetchCounters();
    let countersAreFetched;
    counters.recordCounter && counters.songCounter ?
        countersAreFetched = true : countersAreFetched = false;

    return lastUpdatedArtistId.length && lastAddedRecordId.length && lastAddedRecordArtistId.length && countersAreFetched ?
        (<div className="row">
            <div className="standard-secondary-column">
                <div className="standard-box-wrapper__near-dark mb-5">
                    <h1>The Baseball Field & Friends</h1>
                    <p>The music scene in Nyköping has delivered great music since the early 90's. </p>
                    <p>This website, former home of band <b>The Baseball Field</b> and music labels <b>Vanishing Vanity Music</b> and <b>Strandad
                        Sjöbuse Records</b>, now brings you that good old music in a modern way.</p>
                    <h2>Extra content</h2>
                    <h3>Links</h3>
                    <p><a href="https://thebaseballfield.se/old/">The old TBF/VVM site</a></p>
                    <p><a href="https://thebaseballfield.se/styleguide/">TBF and Friends styleguide</a></p>
                    <h3>Video</h3>
                    <p>T.B.A</p>
                    <CopyrightInformation className={"d-none d-lg-block"}/>
                </div>
            </div>
            <div className="standard-main-column">
                <div className="standard-main-column__section">
                    <h2 className="section-header">Popular artists</h2>
                    <p className="small m-0">
                        Last updated artist: <ArtistLink id={lastUpdatedArtistId} className={"text-uppercase"}/> ({lastUpdatedArtistDate.toLocaleDateString()}).
                    </p>
                    <AllArtistsPaginated/>
                    <IconLink className={"ml-3"} link={ROUTES.ARTISTS} text={"See all artists"} icon={"user-astronaut"}/>
                </div>
                <div className="standard-main-column__section">
                    <h2 className="section-header">Popular records</h2>
                    <p className="small m-0">
                        Last added record: <RecordLink id={lastAddedRecordId}/> by <ArtistLink
                        id={lastAddedRecordArtistId} className={"text-uppercase"}/> ({lastAddedRecordDate.toLocaleDateString()}). Total number of records: {counters.recordCounter}
                    </p>
                    <AllRecordsPaginated/>
                    <IconLink className={"ml-3"} link={ROUTES.RECORDS} text={"See all records"} icon={"compact-disc"}/>
                </div>
                <div className="standard-main-column__section">
                    <h2 className="section-header">Popular tracks</h2>
                    <p className="small m-0">Total number of tracks: {counters.songCounter}</p>
                    <AllTracksPaginated/>
                    <IconLink className={"ml-3"} link={ROUTES.TRACKS} text={"See all tracks"} icon={"music"}/>
                </div>
                <CopyrightInformation className={"d-block d-lg-none"}/>
            </div>
        </div>)
        :
        (<LoadingStandard spinning={true}/>)
};
export default StartPage;
