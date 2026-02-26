export default function Tabs({children, tabs, TabsWrapper = 'menu'}) {
    return (
        <>
            <TabsWrapper>{tabs}</TabsWrapper>
            {children}
        </>
    );
}