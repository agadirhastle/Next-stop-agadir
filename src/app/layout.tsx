import './globals.css'
export const metadata = {
title: 'NEXT STOP, AGADIR.',
description: 'Dakar 2027 Agadir',
manifest: '/manifest.json',
themeColor: '#FF6B00',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="pl">
<head>
<link rel="apple-touch-icon" href="/icon-192.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</head>
<body style={{margin:0, background:'#0A1B2E'}}>{children}</body>
</html>
)
}
