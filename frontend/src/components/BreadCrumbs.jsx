// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8">
      <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            {isLast ? (
              <span className="text-slate-900 capitalize">
                {name.replace(/-/g, " ")}
              </span>
            ) : (
              <Link 
                to={routeTo}
                className="hover:text-blue-600 transition-colors capitalize"
              >
                {name.replace(/-/g, " ")}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

