'use client'

import Button from "@/components/molecules/button/Button";
import Link from "next/link";

type NavLinksProps = {
    logged: string
}

export default function NavLinks(props: NavLinksProps){

    const preAuth = [
        { label: "Contact", path:"/contact" },
        { label: "About", path:"/about"},
        { label: "Features", path: "/features"}
    ];

    const postAuth = [
        { label: "Profile", path:"/user/profile" },
        { label: "Meetings", path:"/user/meetings" },
        { label: "Workspace", path: "/user/dashboard"}
    ];

const menuDecider = () => {
    return (
        <ul>
            {props.logged === 'authenticated' ? (
                postAuth.map((obj, index) => {
                    return <li key={index}><Link  href={obj.path}>{obj.label}</Link></li>
                }   
            )
            ) : (
                preAuth.map((obj, index) => {
                    return <li key={index}><Link  href={obj.path}>{obj.label}</Link></li>
                })
            )}
        </ul>
        );
}

    return (
        <nav>
            {menuDecider()}
        </nav>
    );
}