import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClose, faDashboard, faGraduationCap, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname()

  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  let storedSidebarExpanded = "true"
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return

      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) {
        return
      }

      if (window.matchMedia("(min-width: 1024px)").matches) {
        return
      }

      setSidebarOpen(false)
    }

    document.addEventListener("click", clickHandler)

    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded")
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark ${
        sidebarOpen ? "translate-x-0 lg:static" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6">
        <Link href="/">
          <Image
            width={160}
            height={160}
            src={"/images/logo/logo.png"}
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FontAwesomeIcon icon={faClose} size="xl" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Calendar --> */}
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname == '/' &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FontAwesomeIcon icon={faDashboard} />
                  Dasbor
                </Link>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Subject --> */}
              <li>
                <Link
                  href="/mata-kuliah"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("mata-kuliah") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FontAwesomeIcon icon={faGraduationCap} />
                  Mata Kuliah
                </Link>
              </li>
              {/* <!-- Menu Item Subject --> */}

              {/* <!-- Menu Item Information --> */}
              <li>
                <Link
                  href="/informasi"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('informasi') &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Informasi
                </Link>
              </li>
              {/* <!-- Menu Item Information --> */}

              {/* <!-- Menu Item Users --> */}
              <li>
                <Link
                  href="/pengguna"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('pengguna') &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FontAwesomeIcon icon={faUsers} />
                  Pengguna
                </Link>
              </li>
              {/* <!-- Menu Item Users --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

export default Sidebar
