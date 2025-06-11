export function InventoLogo({ className = "h-12 w-12" }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="20" fill="#4F46E5" />
      <path 
        d="M30 30L70 30M50 50L70 30L50 50ZM50 50V70M50 50H30" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      <path 
        d="M35 65L65 65" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
    </svg>
  );
}