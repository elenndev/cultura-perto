// import { LoaderSVG } from "@/styles/Styles";

export default function Loader({size}: {size: string}){
    return (
        <svg
        width={size}
        height={size}
        className='loader'
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <circle cx="12" cy="12" r="10" />
        </svg>
    );
};