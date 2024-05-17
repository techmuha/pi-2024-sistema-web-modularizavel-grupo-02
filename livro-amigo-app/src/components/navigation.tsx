import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  Squares2X2Icon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { createElement } from "react";

export function Navigation() {
  return (
    <div className="fixed bottom-6 left-1/2 flex h-16 w-9/12 -translate-x-1/2 items-center rounded-3xl bg-white px-8 shadow-2xl">
      <div className="flex h-full w-full justify-between text-orange-400">
        {[
          { to: "/", icon: HomeIcon },
          { to: "/buscar", icon: Squares2X2Icon },
          { to: "/novo", icon: PlusIcon },
          { to: "/conta", icon: UserIcon },
        ].map(({ to, icon }, index) => (
          <NavLink
            key={`navigation-item-${index}`}
            to={to}
            className="relative grid place-items-center"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-1/2 top-0 h-[3px] w-6 -translate-x-1/2 rounded-bl-full rounded-br-full bg-orange-200" />
                )}

                {createElement(icon, {
                  className: "h-5 w-5",
                })}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
