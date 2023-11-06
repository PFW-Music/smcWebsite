import NavbarCustom from "./Navbar"

export default function Layout({ children }) {
    return (
      <>
        <NavbarCustom />
        <main>{children}</main>
      </>
    )
  }