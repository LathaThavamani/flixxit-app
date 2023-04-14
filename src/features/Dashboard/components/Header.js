import React, { useState } from "react";
import "../../../styles/DashboardHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
//import { setCurrentProfile } from "../../../Redux/Profile/actions/profileActions";

import { DebounceInput } from "react-debounce-input";
//import { Search } from "../../Search/Search";
import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { getMoviesBySearchText } from '../../../data/moviesSlice.js';
import { useLoader } from '../../../data/hooks/useLoader'

// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
//import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

function Header({ black }) {

    const { setLoaderSpinning, search, setSearch, searchBox, setSearchBox, showSearch } = useLoader();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const profiles = useSelector((state) => state.profiles.profile);
    // const currentProf = useSelector((state) => state.profiles.currentProfile);

    //const params = useParams();

    //const [search, setSearch] = useState(
    //history.location.search.split("=")[1] || ""
    //);
    // const showProfiles = profiles.filter((item) => {
    //     return item._id !== currentProf._id;
    // });

    const [open, setOpen] = useState(false);

    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    //return focus to the button when we transitioned from!open -> open
    const prevOpen = React.useRef(openMenu);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = openMenu;
    }, [openMenu]);

    const toggleSearchBox = () => {
        if (searchBox) {
            setSearchBox(false);
        } else {
            setSearchBox(true);
        }
    };

    const handleClick = (item, e) => {
        e.preventDefault();
        //dispatch(setCurrentProfile(item));
    };

    const handleSignout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    const Debouncer = (e) => {
        //if (e.length > 0) {
        setLoaderSpinning(true);
        const callGetMoviesBySearch = async () => {
            dispatch(getMoviesBySearchText(e));
            setLoaderSpinning(false);
        }
        callGetMoviesBySearch();
        //}
        setSearch(e);
    };
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <header className={black ? "black" : ""}>
            <div className="nav-bar-bar">
                <div className="header-logo">
                    <Link to="/dashboard">
                        <img
                            src="/images/flixxit-logo.png"
                            alt="Flixxit"
                        />
                    </Link>
                </div>
                <div className="nav-lg">
                    <Link
                        to="/dashboard"
                        className="nav-bar-text-1"
                    >
                        Home
                    </Link>
                    <Link to="" className="nav-bar-text">
                        TV Shows
                    </Link>
                    <Link to="" className="nav-bar-text">
                        Movies
                    </Link>
                    <Link to="" className="nav-bar-text">
                        New & Popular
                    </Link>
                    <Link to="/myList" className="nav-bar-text">
                        My List
                    </Link>
                </div>

                <div>
                    <Button
                        className="nav-sm"
                        ref={anchorRef}
                        aria-controls={openMenu ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color={"secondary"}
                    >
                        Browse
                    </Button>
                    <Popper
                        open={openMenu}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={openMenu}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>Home</MenuItem>
                                            <MenuItem onClick={handleClose}>Tv Shows</MenuItem>
                                            <MenuItem onClick={handleClose}>Movies</MenuItem>
                                            <MenuItem onClick={handleClose}>My List</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
                <div className="search-bar-right">
                    {showSearch ?
                        <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>
                            <span className="icon" onClick={() => toggleSearchBox()}>
                                <FontAwesomeIcon color="white" icon={faSearch} />
                            </span>
                            <DebounceInput
                                className="searchInput"
                                minLength={2}
                                value={search}
                                placeholder="Titles, People, Genres..."
                                //onBlur={() => setSearchBox(false)}
                                debounceTimeout={1000}
                                onChange={(e) => {
                                    Debouncer(e.target.value);
                                }}
                            />
                        </div> : <></>
                    }
                    <div className="header-user">
                        <a>
                            <img
                                onClick={handleOpen}
                                src="/images/profile-avatar.png"
                                alt="profile    "
                            />
                        </a>
                    </div>
                    {open && (
                        <div className="modal-box-profiles">
                            {/* {showProfiles &&
                                showProfiles.map((item) => (
                                    <div className="each-profile-box">
                                        <img src={item.profilePic} alt={item.name} />
                                        <div
                                            onClick={(e) => handleClick(item, e)}
                                            className="each-profile-name"
                                        >
                                            {" "}
                                            {item.name}{" "}
                                        </div>
                                    </div>
                                ))}
                            <div
                                //onClick={() => history.push("/profiles")}
                                className="each-profile-box"
                            >
                                {" "}
                                Manage Profiles{" "}
                            </div> */}
                            <div className="profile-box-line"></div>
                            <div className="profile-text-bottom">Account</div>
                            <div onClick={handleSignout} className="profile-text-bottom">
                                Sign out
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;