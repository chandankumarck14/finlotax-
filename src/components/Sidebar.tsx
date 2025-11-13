import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  UserSquare2,
  BarChart3,
  UserPlus,
  FileEdit,
  DollarSign,
  UsersRound,
  Clock,
  ChevronDown,
  ChevronRight,
  UserCog,
  Gift,
  ClipboardList,
  Settings,
  Menu,
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
];

const clientSubItems = [
  { title: "Clients", path: "/clients/list", icon: UsersRound },
  { title: "Edit Client", path: "/clients/edit", icon: UserCog },
  { title: "Create Client", path: "/clients/create", icon: UserPlus },
];

const otherNavigationItems = [
  { title: "Invoice", path: "/invoices", icon: FileText },
  { title: "Documents", path: "/documents", icon: FolderOpen },
  { title: "Employee", path: "/employee", icon: UserSquare2 },
];

const reportsSubItems = [
  { title: "Sign Up", path: "/reports/signup", icon: UserPlus },
  {
    title: "Invoice/Contract",
    path: "/reports/invoice-contract",
    icon: FileEdit,
  },
  {
    title: "Payments Revenue",
    path: "/reports/payments-revenue",
    icon: DollarSign,
  },
  { title: "Clients", path: "/reports/clients", icon: UsersRound },
  { title: "Timesheet", path: "/reports/timesheet", icon: Clock },
];

const bottomNavigationItems = [
  { title: "Referral Program", path: "/referral-program", icon: Gift },
  { title: "Time Sheet", path: "/time-sheet", icon: Clock },
  {
    title: "Manage Client Sheet",
    path: "/manage-client-sheet",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if any client sub-item is active
  const isClientActive = clientSubItems.some((item) =>
    currentPath.startsWith(item.path)
  );

  // Check if any reports sub-item is active
  const isReportsActive = reportsSubItems.some(
    (item) => currentPath === item.path
  );

  const [clientOpen, setClientOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Keep dropdown open if any sub-item is active
  useEffect(() => {
    if (isClientActive) {
      setClientOpen(true);
    }
    if (isReportsActive) {
      setReportsOpen(true);
    }
  }, [isClientActive, isReportsActive]);

  // Update CSS variable for Layout margin
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "64px" : "224px"
    );
  }, [isCollapsed]);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-border overflow-y-auto transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      <div
        className={`flex md:justify-between items-center ${
          isCollapsed ? "gap-0" : "gap-2"
        } px-4 py-5 border-b border-border`}
      >
        <div>
          {" "}
          {!isCollapsed && (
            <>
              <span className="text-xl font-bold text-foreground">FINLO</span>
              <span className="text-xl font-bold text-primary">TAX</span>
            </>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <nav className="p-3">
        {/* Dashboard */}
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-muted transition-colors mb-1 ${
              isCollapsed ? "justify-center" : ""
            }`}
            activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            title={isCollapsed ? item.title : undefined}
          >
            <item.icon className="w-4 h-4" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}

        {/* Client with dropdown */}
        {!isCollapsed ? (
          <div className="mb-1">
            <button
              onClick={() => setClientOpen(!clientOpen)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-t-xl
 text-sm transition-colors ${
   isClientActive
     ? "text-white bg-primary hover:bg-primary/90"
     : "text-sidebar-foreground hover:bg-muted"
 }`}
            >
              <Users className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Client</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  clientOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {clientOpen && (
              <div className=" bg-background rounded-b-lg border border-border">
                {clientSubItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    activeClassName="bg-muted text-foreground font-medium"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/clients/list"
            className={`flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-muted transition-colors mb-1 ${
              isClientActive
                ? "bg-primary text-primary-foreground hover:bg-primary"
                : ""
            }`}
            title="Client"
          >
            <Users className="w-4 h-4" />
          </NavLink>
        )}

        {/* Other navigation items: Invoice, Documents, Employee */}
        {otherNavigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-muted transition-colors mb-1 ${
              isCollapsed ? "justify-center" : ""
            }`}
            activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            title={isCollapsed ? item.title : undefined}
          >
            <item.icon className="w-4 h-4" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}

        {/* Reports with dropdown */}
        {!isCollapsed ? (
          <div className="mb-1">
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-t-xl text-sm transition-colors ${
                isReportsActive
                  ? "text-white bg-primary hover:bg-primary/90"
                  : "text-sidebar-foreground hover:bg-muted"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Reports</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  reportsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {reportsOpen && (
              <div className="bg-background rounded-b-lg border border-border">
                {reportsSubItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    activeClassName="bg-muted text-foreground font-medium"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/reports/invoice-contract"
            className={`flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-muted transition-colors mb-1 ${
              isReportsActive
                ? "bg-primary text-primary-foreground hover:bg-primary"
                : ""
            }`}
            title="Reports"
          >
            <BarChart3 className="w-4 h-4" />
          </NavLink>
        )}

        {/* Bottom navigation items */}
        {bottomNavigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-muted transition-colors mb-1 ${
              isCollapsed ? "justify-center" : ""
            }`}
            activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            title={isCollapsed ? item.title : undefined}
          >
            <item.icon className="w-4 h-4" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
