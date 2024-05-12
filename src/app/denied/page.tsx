import Link from "next/link";

export default function Denied(){
    return(
        <>
        <h1>Access Denied</h1>
        <Link href="/"> Return to home page</Link>
        </>
    );
}