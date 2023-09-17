interface ChildProps {
    className?: string;
    mylogo?: string;
}

function logo(
    child: ChildProps = {
        className: 'w-[100%] sm:w-[50%]',
        mylogo: '/images/logo.svg',
    },
) {
    return (
        <div className={`flex ${child.className}`}>
            <img src={child.mylogo} alt="logo" />
        </div>
    );
}
export default logo;
