import React, {useState} from "react";
import {Link} from "react-router-dom";
import imgUnavailable from "../../images/image_unavailable.png";
import Artist, {ArtistLink} from "../apiComponents/ArtistComponents";
import * as COLUMNS from "../../constants/cols";
import {TracksByRecordWithPlayerWithImage} from "../lists/TracksByRecord";
import FormatInformation from "../microComponents/FormatInformation";
import {FetchRecordFromId} from "../../api-functions/records-api";
import TrackPlayer from "./TrackPlayer";
import {colorRandomizer, fontRandomizer} from "../microComponents/microComponentsHelper";

const RecordCard = ({route, id, name, artistId, coverUrl, fullWidth, year, format}) => {
    return (
        <div className={fullWidth ? COLUMNS.RECORDS_FULLWIDTH : COLUMNS.RECORDS_MAIN} key={id}>
            <div className={`record-card`}>
                <img alt={`Cover for ${name}`} src={coverUrl || imgUnavailable}/>
                <div className={`record-card__content p-3`}>
                    <Link to={`/${route}/${id}`}>
                        <p className={`card-title`}><Artist id={artistId}/></p>
                        <p className={`card-sub-title text-color-variant__${fontRandomizer().toString()}`}>{name}</p>
                        <p className={`card-sub-title text-color-variant__${fontRandomizer().toString()}`}><FormatInformation format={format} text={false}/> {year}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

const RecordLink = (props) => {
    const record = FetchRecordFromId(props.id);
    return <>
        <Link to={`/record/${props.id}`}>
            <span>{record.name}</span>
        </Link>
    </>
};

const RecordCardWithSongsWithImage = ({id, name, artistId}) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const setCurrentTrackOnClick = (songId) => {
        setCurrentTrack(songId);
    }
    const destroyCurrentTrack = () => {
        setCurrentTrack(null);
    }

    return (
        <div className="record-card-with-tracks col-12">
            <h2 className={`section-header logo-font-family__${fontRandomizer().toString()}`}><div className={`d-inline text-color-variant__${colorRandomizer().toString()}`}><ArtistLink id={artistId} className={"text-uppercase"}/>: </div><span className="small">{name}</span></h2>
            <TracksByRecordWithPlayerWithImage recordId={id} currentTrack={currentTrack} setCurrentTrackOnClick={setCurrentTrackOnClick}/>
            {currentTrack ? <TrackPlayer id={currentTrack} key={currentTrack} destroyCurrentTrack={destroyCurrentTrack}/> : false}
        </div>
    )
};

export default RecordCard;
export {RecordCardWithSongsWithImage, RecordLink};
