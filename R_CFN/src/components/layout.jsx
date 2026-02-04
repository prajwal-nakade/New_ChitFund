import Sidebar from './sidebar'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen lg:h-screen">
           
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 overflow-y-auto bg-white">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    )
}

export default Layout
