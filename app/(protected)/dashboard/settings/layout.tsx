export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 3 second delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}