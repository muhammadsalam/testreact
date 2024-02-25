export const handleInputScroll = ({ target }: any) => {
    console.log(target);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        document.body.style.overflow = "unset";
    }, 450);
}
