export default function Loader({size, color}: {size: string, color?: string}){
    return (
        <svg
        width={size}
        height={size}
        className='loader'
        viewBox="0 0 24 24"
        fill="none"
        stroke={color ?? "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <circle cx="12" cy="12" r="10" />
        </svg>
    );
};