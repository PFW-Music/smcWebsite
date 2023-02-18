import React from "react";
import { NavLink } from "react-router-dom";
import "./navbarlinks.css";

const Navbar = () => {
	const [open, setState] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		setState(open);
	};
	return (
		<>
			<div className="navbarlinks">
				<div className="navbarlinks_container">
					<p>
						<NavLink to="/">Book Rooms</NavLink>
					</p>
					<p>
						<NavLink to="/schedules">Room Schedules</NavLink>
					</p>
					<p>
						<NavLink to="/gear">Gear Checkout</NavLink>
					</p>
					<p>
						<NavLink to="/contact">Contact Us</NavLink>
					</p>
				</div>
			</div>
		</>
	);
};

export default Navbar;
