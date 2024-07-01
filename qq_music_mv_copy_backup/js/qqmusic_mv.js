import { area, version } from "../data/filterRule.js";

let select = localStorage.select || "new";
let songArea = 0;
let songVersion = 0;

//更新主内容main标题
function updateFilterTitleDisplay() {
    const FilterAreaTitleSpan = document.createElement("span");
    FilterAreaTitleSpan.classList.add("mv-main-details-title-area-span");

    const FilterVersionTitleSpan = document.createElement("span");
    FilterVersionTitleSpan.classList.add("mv-main-details-title-version-span");

    const TitleElement = document.querySelector(".mv-main-details-title");

    if (songArea !== 0 || songVersion !== 0) {
        TitleElement.textContent = "";
    }
    if (songArea !== 0) {
        FilterAreaTitleSpan.textContent = area[songArea];
        TitleElement.appendChild(FilterAreaTitleSpan);

        const FilterAreaTitleLink = document.createElement("a");
        FilterAreaTitleLink.classList.add("mv-main-details-title-area-span-a");
        FilterAreaTitleSpan.appendChild(FilterAreaTitleLink);

        FilterAreaTitleLink.addEventListener("click", function () {
            songArea = 0;
            TitleElement.removeChild(FilterAreaTitleSpan);
            if (songArea === 0 && songVersion === 0)
                TitleElement.textContent = "全部MV";

            const areaElement = document.querySelector(".js_tags_area");
            // 遍历所有子元素，添加和移除样式类
            areaElement.querySelectorAll('.js_tag_item').forEach(link => {
                if (link.id === String(songArea)) {
                    link.classList.add('tag-item-select');
                } else {
                    link.classList.remove('tag-item-select');
                }
            });
            // 在点击后触发自定义事件
            document.dispatchEvent(new Event("songAreaChanged"));
        })
    }
    if (songVersion !== 0) {
        FilterVersionTitleSpan.textContent = version[songVersion];
        TitleElement.appendChild(FilterVersionTitleSpan);

        const FilterVersionTitleLink = document.createElement("a");
        FilterVersionTitleLink.classList.add("mv-main-details-title-version-span-a");
        FilterVersionTitleSpan.appendChild(FilterVersionTitleLink);

        FilterVersionTitleLink.addEventListener("click", function () {
            songVersion = 0;
            TitleElement.removeChild(FilterVersionTitleSpan);
            if (songArea === 0 && songVersion === 0)
                TitleElement.textContent = "全部MV";

            const versionElement = document.querySelector(".js_tags_version");
            // 遍历所有子元素，添加和移除样式类
            versionElement.querySelectorAll('.js_tag_item').forEach(link => {
                if (link.id === String(songVersion)) {
                    link.classList.add('tag-item-select');
                } else {
                    link.classList.remove('tag-item-select');
                }
            });
            // 在点击后触发自定义事件
            document.dispatchEvent(new Event("songVersionChanged"));
        })
    }
    if (songArea === 0 && songVersion === 0)
        TitleElement.textContent = "全部MV";
}

/**
 * 遍历filterData并生成对应<a>，同时为标签a添加点击响应事件
 * @param {*} className 
 * @param {*} filterData 
 * @returns 
 */
async function generateMvMainTagsLink(className, filterData) {
    const tag = document.querySelector(className);
    for (const filterKey in filterData) {
        if (filterData.hasOwnProperty(filterKey)) {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = filterData[filterKey];
            link.classList.add("tag-item");
            link.classList.add("js_tag_item");
            link.id = filterKey;

            function tagLinkclickHandle(event) {
                //阻止a标签默认跳转功能
                event.preventDefault();

                //获取点击事件的id
                const clickedId = event.target.id;
                console.log(clickedId);

                className === ".js_tags_area" ? songArea = Number(clickedId) : songVersion = Number(clickedId);
                className === ".js_tags_area" ? console.log(songArea) : console.log(songVersion);

                // 遍历所有子元素，添加和移除样式类
                tag.querySelectorAll('.js_tag_item').forEach(link => {
                    if (link.id === clickedId) {
                        link.classList.add('tag-item-select');
                    } else {
                        link.classList.remove('tag-item-select');
                    }
                });

                // 在此处可以使用全局变量 songarea，根据需要进行其他操作
                // console.log("当前 songVersion 值为: ", songVersion);

                // 在点击后触发自定义事件
                className === ".js_tags_area" ? document.dispatchEvent(new Event("songAreaChanged")):document.dispatchEvent(new Event("songVersionChanged"));

                updateFilterTitleDisplay();
            }
            //Todo  重构link点击事件
            link.addEventListener("click", tagLinkclickHandle);
            tag.appendChild(link);
            tag.querySelector(".tag-item-first").addEventListener("click", tagLinkclickHandle);
        }
    }
}

/**
 * 使用模块化导入data/filterRule.js中的数据
 * 调用generateMvMainTagsLink实现功能
 */
async function fetchFilterRuleData() {
    try {
        //调用generateMvMainTagsLink动态创建<a>
        await Promise.all([
            generateMvMainTagsLink(".js_tags_area", area),
            generateMvMainTagsLink(".js_tags_version", version)
        ]
        );
    } catch (error) {
        console.error('Error fetching filterRule.js:', error);
    }
}

fetchFilterRuleData();

/**
 * 将Unix时间戳转换为具体的发布时间
 * @param {*} timestamp Unix 时间戳
 * @returns 
 */
function getPubDate(timestamp) {
    const pubDate = new Date(timestamp * 1000);
    const year = pubDate.getFullYear();
    const month = pubDate.getMonth() + 1;
    const day = pubDate.getDate();
    return `${year}-${month}-${day}`
}

/**
 * 根据select值选择数据源并根据songArea和songVersion筛选mv数据并显示对应mv
 */
async function loadMvMusicData() {
    let url = select === "new" ? "data/new.json" : "data/hot.json";
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        let filterData = jsonData;
        if (songArea !== 0) {
            filterData = filterData.filter(item => item.area === songArea);
        }
        if (songVersion !== 0) {
            filterData = filterData.filter(item => item.version === songVersion);
        }
        console.log(filterData);

        const mvMainMusicList = document.querySelector(".mv-main-music-list");

        mvMainMusicList.innerHTML = "";

        filterData.forEach(item => {
            // 创建一个包含音乐信息的单个容器元素
            const musicsingleElement = document.createElement('div');
            musicsingleElement.classList.add('mv-main-music-list-div');

            const musicsingleDivElement = document.createElement("div");
            musicsingleDivElement.classList.add("mv-main-music-list-div-div");

            // 创建包含音乐封面的链接元素
            const musicimgcoverElement = document.createElement('a');
            musicimgcoverElement.classList.add('mv-main-music-list-img-cover');
            musicimgcoverElement.href = item.picurl;
            musicimgcoverElement.target = '_blank';
            musicimgcoverElement.title = item.title;

            // 创建包含音乐封面图片的元素
            const musicimgElement = document.createElement('div');
            musicimgElement.classList.add('mv-main-music-list-img-cover-div');

            // 创建图片元素并设置属性
            const imgElement = document.createElement('img');
            imgElement.setAttribute('loading', 'lazy');
            imgElement.src = item.picurl;
            imgElement.alt = item.title;
            imgElement.dataset.qarDef = '//y.qq.com/mediastyle/global/img/mv_300.png?max_age=2592000';

            // 创建播放图标元素
            const iconPlayElement = document.createElement('i');
            iconPlayElement.classList.add('mv-main-music-list-img-cover-icon-play');

            // 将图片和播放图标添加到音乐封面元素
            musicimgElement.appendChild(imgElement);
            musicimgElement.appendChild(iconPlayElement);

            // 将音乐封面元素添加到链接元素
            musicimgcoverElement.appendChild(musicimgElement);

            // 创建包含音乐标题的元素
            const mvListTitleElement = document.createElement('h3');
            mvListTitleElement.classList.add('mv-main-music-list-title');

            // 创建标题链接元素并设置内容
            const titleLinkElement = document.createElement('a');
            titleLinkElement.href = item.picurl;
            titleLinkElement.target = '_blank';
            titleLinkElement.textContent = item.title;
            titleLinkElement.dataset.qarDef = "//y.qq.com/mediastyle/global/img/mv_300.png?max_age=2592000"

            // 将标题链接元素添加到标题元素
            mvListTitleElement.appendChild(titleLinkElement);

            // 创建包含歌手信息的元素
            const mvListSingerElement = document.createElement('p');
            mvListSingerElement.classList.add('mv-main-music-list-singer');

            // 创建歌手链接元素并设置内容
            const singerLinkElement = document.createElement('a');
            singerLinkElement.classList.add('mv-main-music-list-playlist-author');
            singerLinkElement.title = item.singers[0].name;
            singerLinkElement.href = item.singers[0].picurl;
            singerLinkElement.target = '_blank';
            singerLinkElement.textContent = item.singers[0].name;

            // 将歌手链接元素添加到歌手元素
            mvListSingerElement.appendChild(singerLinkElement);

            // 创建用于显示信息的元素（假设你想保留这个 ID）
            const mvListInfoElement = document.createElement('div');
            mvListInfoElement.classList.add('mv-main-music-list-info');
            mvListInfoElement.id = 'currentDate';

            let filterPlayCnt = item.playcnt;

            if (item.playcnt >= 10000) {
                filterPlayCnt = item.playcnt / 10000;
                filterPlayCnt = String(filterPlayCnt.toFixed(1)) + "万";
            }
            if (item.playcnt >= 100000000) {
                filterPlayCnt = item.playcnt / 100000000;
                filterPlayCnt = String(filterPlayCnt.toFixed(1)) + "亿";
            }
            mvListInfoElement.innerHTML = `
            <span class="mv-main-music-list-info-span">
                <i class="mv-main-music-list-info-icon"></i>
                ${filterPlayCnt}
            </span>
            ${getPubDate(item.pubdate)}
            `

            musicsingleElement.appendChild(musicsingleDivElement);

            // 将所有创建的元素添加到单个音乐容器中
            musicsingleDivElement.appendChild(musicimgcoverElement);
            musicsingleDivElement.appendChild(mvListTitleElement);
            musicsingleDivElement.appendChild(mvListSingerElement);
            musicsingleDivElement.appendChild(mvListInfoElement);

            // 将单个音乐容器添加到页面中
            mvMainMusicList.appendChild(musicsingleElement);
        });

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// 页面加载完成时初始化数据
// document.addEventListener("DOMContentLoaded", loadMvMusicData);
loadMvMusicData();
document.addEventListener("songAreaChanged", loadMvMusicData);
document.addEventListener("songVersionChanged", loadMvMusicData);
document.addEventListener("selectChanged", loadMvMusicData);


const newestElement = document.querySelector('.mv-main-details-choose[title="最新"]');
const hottestElement = document.querySelector('.mv-main-details-choose[title="最热"]');

//点击按钮跟新样式
function UpdateSelecthandleClick(event) {
    event.preventDefault();
    // 判断点击的是最新还是最热
    if (event.target === newestElement) {
        select = "new";
        // 添加和移除样式类
        newestElement.classList.add("mv-main-details-choose-select");
        hottestElement.classList.remove("mv-main-details-choose-select");

        localStorage.select = "new";
    } else if (event.target === hottestElement) {
        select = "hot";
        // 添加和移除样式类
        hottestElement.classList.add("mv-main-details-choose-select");
        newestElement.classList.remove("mv-main-details-choose-select");

        localStorage.select = "hot";
    }
    // 在此处可以使用全局变量 source1，根据需要进行其他操作
    // console.log("当前 select 值为: ", select);

    // 在点击后触发自定义事件
    document.dispatchEvent(new Event("selectChanged"));
}

newestElement.addEventListener("click", UpdateSelecthandleClick);
hottestElement.addEventListener("click", UpdateSelecthandleClick);

//刷新页面后根据本地缓存的select更新选择的按钮为“最新”还是“最热”
if (localStorage.select === "new") {
    // 添加和移除样式类
    newestElement.classList.add("mv-main-details-choose-select");
    hottestElement.classList.remove("mv-main-details-choose-select");
} else if (localStorage.select === "hot") {
    // 添加和移除样式类
    hottestElement.classList.add("mv-main-details-choose-select");
    newestElement.classList.remove("mv-main-details-choose-select");
}
