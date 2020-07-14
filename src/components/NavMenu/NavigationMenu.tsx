import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationMenu.scss'

const NavMenu: React.FC = () => {
	return (
		<div className='app-container navMenu'>
			<header>
				<Link to={'/'}>
					<h2>MyApp</h2>
				</Link>
				<input className='switcher' type='checkbox' id='menu' />
				<label className='open' htmlFor='menu'>
					<i className='fa fa-bars' />
				</label>

				<nav>
					<div className='bg'>
						<ul>
							<li>
								<Link to={'/'}>Home</Link>
							</li>
							<li>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<Link to={'/about_Me'}>About Me</Link>
							</li>
							<li>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<Link to={'/skills'}>Skills</Link>
							</li>
							<li>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<Link to={'/portfolio'}>Portfolio</Link>
							</li>
							<li>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<Link to={'/contacts'}>Contacts</Link>
							</li>
						</ul>
						<label className='close' htmlFor='menu'>
							<i className='fa fa-times' />
						</label>
					</div>
				</nav>
			</header>
		</div>
	)
}

export default NavMenu
