export const handleInputScroll = ({ target }: any) => {
    setTimeout(() => {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
}