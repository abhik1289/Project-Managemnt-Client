
import HomePage from "@/components/Home/dashboard";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomePage>{children}</HomePage>;
}
