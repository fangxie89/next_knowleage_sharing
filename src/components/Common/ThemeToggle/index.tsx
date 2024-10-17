'use client';

import { FC, MouseEvent } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

type ThemeToggleProps = {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
};
const ThemeToggle:FC<ThemeToggleProps> = ({ onClick = () => {}}) => {
    return (
    <button
        type="button"
        onClick={onClick}
        className="size-9 rounded-md p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 hover:dark:bg-neutral-900"
    >
        <MoonIcon className="block dark:hidden" height="20" />
        <SunIcon className="hidden dark:block" height="20" />
    </button>
    )
}

export default ThemeToggle;