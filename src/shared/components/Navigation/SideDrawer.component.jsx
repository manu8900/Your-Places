import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.styles.css';

const SideDrawer = props => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter //3rd party library react transition group tells the dom the aside element should be displayed & removed from the dom by mountOnEnter & unmountOnExit
            unmountOnExit>
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    );
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));//To return side drawer elements in the area were this id is named instead of somewhere else + id is declared in index.html in public
}

export default SideDrawer;