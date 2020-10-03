import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Message = props => <div>{props.msg}</div>;

const TodoComponent = (props) => (
    <p className="todo-component">
        <FontAwesomeIcon icon="wrench" spin/>
        <span>{props.todo}</span>
    </p>
);

const LoadingComponent = () => (
    <div className="loading-component">
        <FontAwesomeIcon icon="spinner" spin size="2x"/>
    </div>
);

const DashboardListItemButton = (props) => (
    <button
        type="button"
        aria-label={`${props.action} ${props.listItem.name}`}
        className="btn btn-fa__primary ml-2"
        onClick={() => props.onClick()}
    >
        <FontAwesomeIcon icon={props.icon} />
    </button>
);

const CopyrightInfoComponent = () => (
    <div>
        <p className="small">Site content <FontAwesomeIcon icon={['far', 'copyright']}/> 2020 Joakim Johnsson</p>
        <p className="small">Except where otherwise noted, creative content on this site is licensed under
            a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US">Creative Commons
                Attribution 3.0 Unported License</a>.
        </p>
    </div>
);

export default TodoComponent;
export {Message, LoadingComponent, DashboardListItemButton, CopyrightInfoComponent};

