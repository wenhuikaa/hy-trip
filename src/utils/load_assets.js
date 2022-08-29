export const getAssetUrl = (image) => {
    //vite不支持require直接引入图标路径，只支持ES Module语法
    return new URL(`../assets/img/${image}`, import.meta.url).href;
}