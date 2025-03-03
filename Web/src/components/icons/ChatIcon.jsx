export function ChatIcon({ color }) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="7.5" y="12" width="0.01" height="0.01" stroke={color} strokeWidth="3" strokeLinejoin="round" />
			<rect x="12" y="12" width="0.01" height="0.01" stroke={color} strokeWidth="3" strokeLinejoin="round" />
			<rect x="16.5" y="12" width="0.01" height="0.01" stroke={color} strokeWidth="3" strokeLinejoin="round" />
		</svg>
	)
}

