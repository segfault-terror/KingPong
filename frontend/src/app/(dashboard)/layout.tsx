import Header from './Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="mt-[120px] lg:mt-[110px]">{children}</main>

            {/* <Footer /> */}
        </div>
    );
}
