function loadDataAnimation(): void {
  const CourseMain = document.querySelector('.course-main')
  const loadWrap = document.createElement('div')
  loadWrap.classList.add('loading-div')
  const loadLine1 = document.createElement('p')
  const loadLine2 = document.createElement('p')
  const loadLine3 = document.createElement('p')
  const loadLine4 = document.createElement('p')
  loadLine1.classList.add('loading')
  loadLine2.classList.add('loading')
  loadLine3.classList.add('loading')
  loadLine4.classList.add('loading')
  loadLine1.classList.add('loadLine1')
  loadLine2.classList.add('loadLine2')
  loadLine3.classList.add('loadLine3')
  loadLine4.classList.add('loadLine4')
  loadWrap?.appendChild(loadLine1)
  loadWrap?.appendChild(loadLine2)
  loadWrap?.appendChild(loadLine3)
  loadWrap?.appendChild(loadLine4)
  CourseMain?.appendChild(loadWrap)
}

let rank = 0
let isNewSort = false
let isHotSort = false
let isPriceAsc = false
let isPriceDesc = false
let isVIPOnly = false

let rankByte = 0

async function generateLabelLink(): Promise<void> {
  function labelTagClickHandle(event: Event): void {
    event.preventDefault()

    const clickId = (event.target as HTMLElement).id
    // console.log(clickId);

    rank = Number(String(clickId).charAt(5))
    // console.log(rank);

    const CatesLabelWrapLabel = document.querySelector(
      '.cates-label-wrap-label'
    )
    const LabelContent = CatesLabelWrapLabel?.querySelector('.label-content')
    const LabelContentNavList = LabelContent?.querySelector('.nav-list')

    LabelContentNavList?.querySelectorAll('.nav-item').forEach((element) => {
      // console.log(item.id);
      // console.log(clickId);
      if (element.id === clickId) {
        element.querySelector('.tag-item')?.classList.add('active')
      } else {
        element.querySelector('.tag-item')?.classList.remove('active')
      }
    })
    document.dispatchEvent(new Event('rankChanged'))
  }
  const LabelTagNav = document.querySelector('.label-tag-nav')
  if (LabelTagNav !== null)
    LabelTagNav.innerHTML = `
    <a class="nav-item tag-item-first" id="rank-0" href="#">
      <span class="tag-item active" id="rank-0">全部</span>
    </a>
  `
  const url =
    'https://api.juejin.cn/tag_api/v1/query_category_briefs?aid=2608&uuid=7356941711581333001&spider=0'
  try {
    const response = await fetch(url)
    const jsonData = await response.json()
    // console.log(jsonData)

    const CatesLabelWrapLabel = document.querySelector(
      '.cates-label-wrap-label'
    )
    const LabelContent = CatesLabelWrapLabel?.querySelector('.label-content')
    const LabelContentNavList = LabelContent?.querySelector('.nav-list')
    // console.log(LabelContentNavList);
    jsonData.data.forEach(
      (item: { category_url: string; category_name: string; rank: string }) => {
        const LabelNavListItemLink = document.createElement('a')
        LabelNavListItemLink.classList.add('nav-item')
        LabelNavListItemLink.id = `rank-${item.rank}`
        LabelNavListItemLink.href = '#'
        // LabelNavListItemLink.href = `/course/${item.category_url}`;

        LabelNavListItemLink.addEventListener('click', labelTagClickHandle)

        const LabelNavListItemLinkSpan = document.createElement('span')
        LabelNavListItemLinkSpan.classList.add('tag-item')
        LabelNavListItemLinkSpan.id = `rank-${item.rank}`
        LabelNavListItemLinkSpan.textContent = item.category_name

        LabelNavListItemLink.appendChild(LabelNavListItemLinkSpan)
        LabelContentNavList?.appendChild(LabelNavListItemLink)
      }
    )
    const tagItemFirst = document.querySelector('.tag-item-first')
    tagItemFirst?.addEventListener('click', labelTagClickHandle)
  } catch (error) {
    // console.error('Error loading data:', error)
  }
}
void generateLabelLink()

interface RankImg {
  'lv-0': string
  'lv-1': string
  'lv-2': string
  'lv-3': string
  'lv-4': string
  'lv-5': string
  'lv-6': string
  'lv-7': string
  'lv-8': string
}

const RankImgImpl: RankImg = {
  'lv-0': '',
  'lv-1':
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a4dbd8a81a84d599442ef1095e35bab~tplv-k3u1fbpfcp-watermark.image',
  'lv-2':
    'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad1d5b8ec0974b0bbc14446acdd7c20d~tplv-k3u1fbpfcp-watermark.image',
  'lv-3':
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3f5a3e7550645a08184e5c4247cc3d4~tplv-k3u1fbpfcp-watermark.image',
  'lv-4':
    'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05be64d75fee4dbdb290ba23afd21fcf~tplv-k3u1fbpfcp-watermark.image',
  'lv-5':
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fa3f08a7107485f81157b296fd9d41f~tplv-k3u1fbpfcp-watermark.image',
  'lv-6':
    'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06b49284428a4dc48be678a47cd1504b~tplv-k3u1fbpfcp-watermark.image',
  'lv-7':
    'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/549f476f5e9146848df91d2cd912fe61~tplv-k3u1fbpfcp-watermark.image',
  'lv-8':
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fdb11f5b5ff4d9aaf7982197d7e4082~tplv-k3u1fbpfcp-watermark.image'
}

interface VIPImg {
  '0': string
  '3': string
  '4': string
  '5': string
  '1': string
}

const VIPImgImpl: VIPImg = {
  '0': '',
  '1': 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/7467fc326521e91a50af0d354572dccc.svg',
  '3': 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/ffdbad884aa0e7884cbcf924226df6ce.svg',
  '4': 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/07302452a7ad81cb43a173b5cd580237.svg',
  '5': 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/162b40efbd71af9a806dd2b54c4580ef.svg'
}

interface RankCateId {
  '1': string
  '2': string
  '3': string
  '4': string
  '5': string
  '6': string
  '7': string
  '8': string
}

const RankCateIdImpl: RankCateId = {
  '1': '6809637769959178254',
  '2': '6809637767543259144',
  '3': '6809635626879549454',
  '4': '0',
  '5': '6809637773935378440',
  '6': '6809637771511070734',
  '7': '6809637776263217160',
  '8': '6809637772874219534'
}

async function generateBooksFilterContent(): Promise<void> {
  // 加载数据动画显示前先清空book-filter-content内容
  const BookFilterContent = document.querySelector('.book-filter-content')
  if (BookFilterContent !== null) BookFilterContent.innerHTML = ''

  // 加载数据动画
  const loadWrap = document.createElement('div')
  loadWrap.classList.add('loading-div')
  const loadLine1 = document.createElement('p')
  const loadLine2 = document.createElement('p')
  const loadLine3 = document.createElement('p')
  const loadLine4 = document.createElement('p')
  loadLine1.classList.add('loading')
  loadLine2.classList.add('loading')
  loadLine3.classList.add('loading')
  loadLine4.classList.add('loading')
  loadLine1.classList.add('loadLine1')
  loadLine2.classList.add('loadLine2')
  loadLine3.classList.add('loadLine3')
  loadLine4.classList.add('loadLine4')
  loadWrap?.appendChild(loadLine1)
  loadWrap?.appendChild(loadLine2)
  loadWrap?.appendChild(loadLine3)
  loadWrap?.appendChild(loadLine4)
  BookFilterContent?.appendChild(loadWrap)

  try {
    const response1 = await fetch(
      'https://api.juejin.cn/booklet_api/v1/booklet/listbycategory?aid=2608&uuid=7356941711581333001&spider=0',
      {
        headers: {
          accept: '*/*',
          'accept-language': 'zh-CN,zh;q=0.9',
          'content-type': 'application/json',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'x-secsdk-csrf-token':
            '0001000000013d18a47c543bf869509c8c30077c23875e446ff08b3920e453827077afd4ab1a17ccf377893c7b24'
        },
        referrer: 'https://juejin.cn/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: '{"category_id":"0","cursor":"0","sort":10,"is_vip":0,"limit":80}',
        method: 'POST'
      }
    )
    const jsonData = await response1.json()
    // console.log(jsonData)
    // let filterData = jsonData1.concat(jsonData2)
    let filterData = jsonData.data
    // 对数据进行筛选
    if (rank !== 0) {
      filterData = filterData.filter(
        (item: { base_info: { category_id: string } }) =>
          item.base_info.category_id ===
          RankCateIdImpl[String(rank) as keyof RankCateId]
      )
    }
    if (isNewSort) {
      filterData.sort(
        (
          a: { base_info: { submit_time: number } },
          b: { base_info: { submit_time: number } }
        ) => b.base_info.submit_time - a.base_info.submit_time
      )
    }
    if (isHotSort) {
      filterData.sort(
        (
          a: { base_info: { buy_count: number } },
          b: { base_info: { buy_count: number } }
        ) => b.base_info.buy_count - a.base_info.buy_count
      )
    }
    if (isPriceAsc) {
      filterData.sort(
        (
          a: { max_discount: { discount_money: number } },
          b: { max_discount: { discount_money: number } }
        ) => a.max_discount.discount_money - b.max_discount.discount_money
      )
    }
    if (isPriceDesc) {
      filterData.sort(
        (
          a: { max_discount: { discount_money: number } },
          b: { max_discount: { discount_money: number } }
        ) => b.max_discount.discount_money - a.max_discount.discount_money
      )
    }

    if (isVIPOnly) {
      filterData = filterData.filter(
        (item: { base_info: { can_vip_borrow: boolean } }) =>
          item.base_info.can_vip_borrow
      )
    }
    // console.log(filterData)
    // 移除动画元素
    const BookFilterContentS = document.querySelector('.book-filter-content')
    if (BookFilterContentS != null) {
      const loadingElement = BookFilterContentS.querySelector('.loading-div')
      if (loadingElement != null) {
        BookFilterContentS.removeChild(loadingElement)
      }
    }

    const BookFilterContent = document.querySelector('.book-filter-content')
    if (BookFilterContent !== null) BookFilterContent.innerHTML = ''
    const BookFilterContentWrap = document.createElement('div')
    BookFilterContentWrap.classList.add('book-filter-content-wrap')
    const BookFilterContentWrapDiv = document.createElement('div')
    BookFilterContentWrapDiv.classList.add('book-filter-content-wrap-div')
    // 添加子元素
    // CourseMain?.appendChild(BookFilterContent)
    BookFilterContent?.appendChild(BookFilterContentWrap)
    BookFilterContentWrap.appendChild(BookFilterContentWrapDiv)

    // console.log(JSON.stringify(filterData))
    if (JSON.stringify(filterData) === '[]') {
      const EmptyBox = document.createElement('div')
      EmptyBox.classList.add('empty-box')
      const ImgEmptyWrap = document.createElement('div')
      ImgEmptyWrap.classList.add('img-empty-wrap')
      ImgEmptyWrap.innerHTML = `
      <div class="img-empty" style="background-image: url(https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25cce8f54a7f441aa914131ed8fd1ed5~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis)">
      </div>
      `
      const ImgEmptyDescription = document.createElement('div')
      ImgEmptyDescription.classList.add('empty-description')
      ImgEmptyDescription.textContent = '该分类下暂无小册'

      EmptyBox.appendChild(ImgEmptyWrap)
      EmptyBox.appendChild(ImgEmptyDescription)
      BookFilterContentWrapDiv.appendChild(EmptyBox)
      return
    }

    filterData.forEach(
      (item: {
        is_new: boolean
        base_info: {
          can_vip_borrow: boolean
          buy_count: string
          is_finished: boolean
          summary: string
          title: string
          cover_img: string
          section_count: string
        }
        user_info: {
          level: string
          user_name: string
          avatar_large: string
          job_title: string
          company: string
          user_growth_info: {
            vip_title: string
            vip_level: number
          }
        }
        max_discount: {
          name: string
          discount_money: string
          price: string
        }
      }) => {
        const BookFilterContentLink = document.createElement('a')
        BookFilterContentLink.classList.add('book-filter-content-a')
        BookFilterContentLink.href = '#'

        // 课程封面
        const BookImgDiv = document.createElement('div')
        BookImgDiv.classList.add('book-thumb')
        BookImgDiv.classList.add('book-poster')

        const BookImg = document.createElement('img')
        BookImg.classList.add('lazy')
        BookImg.classList.add('book-thumb-img')
        BookImg.src = item.base_info.cover_img
        BookImg.alt = `「${item.base_info.title}」封面`
        BookImg.loading = 'lazy'

        BookImgDiv.appendChild(BookImg)

        // 课程信息
        const BookInfoDiv = document.createElement('div')
        BookInfoDiv.classList.add('book-info')

        // 课程信息标题
        const BookInfoTitleBox = document.createElement('div')
        BookInfoTitleBox.classList.add('title-box')

        // 新品
        if (item.is_new) {
          const BookInfoTitleTagSpan = document.createElement('span')
          BookInfoTitleTagSpan.classList.add('new-tag-wrap-tag')
          BookInfoTitleTagSpan.classList.add('book-info-tag')
          BookInfoTitleTagSpan.textContent = '新品'
          BookInfoTitleBox.appendChild(BookInfoTitleTagSpan)
        }

        // VIP
        if (item.base_info.can_vip_borrow) {
          const BookVIPInfoTitleTagSpan = document.createElement('span')
          BookVIPInfoTitleTagSpan.classList.add('vip-free-tag')
          BookVIPInfoTitleTagSpan.classList.add('vip-info-tag')
          BookVIPInfoTitleTagSpan.textContent = 'VIP'
          BookInfoTitleBox.appendChild(BookVIPInfoTitleTagSpan)
        }

        const BookInfoTitleTextSpan = document.createElement('span')
        BookInfoTitleTextSpan.classList.add('text-highlight')
        BookInfoTitleTextSpan.textContent = item.base_info.title
        BookInfoTitleTextSpan.title = item.base_info.title

        BookInfoTitleBox.appendChild(BookInfoTitleTextSpan)
        BookInfoDiv.appendChild(BookInfoTitleBox)

        // 课程信息简介
        const BookInfoIntroSpan = document.createElement('span')
        BookInfoIntroSpan.classList.add('intro-text')
        BookInfoIntroSpan.textContent = item.base_info.summary
        BookInfoDiv.appendChild(BookInfoIntroSpan)

        // 课程信息作者
        const BookInfoAuthorDiv = document.createElement('div')
        BookInfoAuthorDiv.classList.add('author')
        BookInfoDiv.appendChild(BookInfoAuthorDiv)

        // 课程信息作者相关
        const BookInfoAutherLink = document.createElement('a')
        BookInfoAutherLink.classList.add('xiaoce-user')
        BookInfoAutherLink.href = '#'
        BookInfoAutherLink.target = '_blank'
        BookInfoAuthorDiv.appendChild(BookInfoAutherLink)

        // 课程信息作者头像
        const BookInfoAutherImgDiv = document.createElement('div')
        BookInfoAutherImgDiv.classList.add('xiaoce-user-hero')
        const BookInfoAutherImg = document.createElement('img')
        BookInfoAutherImg.classList.add('lazy')
        BookInfoAutherImg.classList.add('avater-img')
        BookInfoAutherImg.src = item.user_info.avatar_large
        BookInfoAutherImg.alt = `${item.user_info.user_name}的头像`
        BookInfoAutherImg.loading = 'lazy'
        BookInfoAutherImgDiv.appendChild(BookInfoAutherImg)
        BookInfoAutherLink.appendChild(BookInfoAutherImgDiv)

        // 课程信息作者信息
        const BookInfoAutherLinkLink = document.createElement('a')
        BookInfoAutherLinkLink.classList.add('author-name')
        BookInfoAutherLinkLink.classList.add('username')
        BookInfoAutherLinkLink.href = '#'
        BookInfoAutherLinkLink.target = '_blank'
        BookInfoAuthorDiv.appendChild(BookInfoAutherLinkLink)

        // 课程信息作者信息-名字
        const BookInfoAutherName = document.createElement('span')
        BookInfoAutherName.classList.add('name')
        BookInfoAutherName.textContent = item.user_info.user_name
        BookInfoAutherLinkLink.appendChild(BookInfoAutherName)

        // 课程信息作者信息-创作等级
        if (Number(item.user_info.level) !== 0) {
          const BookInfoAutherRankImgSpan = document.createElement('span')
          BookInfoAutherRankImgSpan.classList.add('rank')
          const BookInfoAutherRankImg = document.createElement('img')
          BookInfoAutherRankImg.classList.add('lazy')
          BookInfoAutherRankImg.src =
            RankImgImpl[`lv-${item.user_info.level}` as keyof RankImg]
          BookInfoAutherRankImg.alt = `创作等级LV.${item.user_info.level}`
          BookInfoAutherRankImg.title = `创作等级LV.${item.user_info.level}`
          BookInfoAutherRankImgSpan.appendChild(BookInfoAutherRankImg)
          BookInfoAutherLinkLink.appendChild(BookInfoAutherRankImgSpan)
        }

        // 课程信息作者信息-vip等级
        if (item.user_info.user_growth_info.vip_level !== 0) {
          const BookInfoAutherVIPLevel = document.createElement('div')
          BookInfoAutherVIPLevel.classList.add('vip-level')
          const BookInfoAutherToolTip = document.createElement('span')
          BookInfoAutherToolTip.classList.add('tooltip')
          const BookInfoAutherToolTipWrap = document.createElement('span')
          BookInfoAutherToolTipWrap.classList.add('tooltip-wrap')
          const BookInfoAutherVIPLevelImg = document.createElement('img')
          BookInfoAutherVIPLevelImg.classList.add('lazy')
          BookInfoAutherVIPLevelImg.src =
            VIPImgImpl[
              `${item.user_info.user_growth_info.vip_level}` as keyof VIPImg
            ]
          BookInfoAutherVIPLevelImg.alt = `VIP."${item.user_info.user_growth_info.vip_level}" ${item.user_info.user_growth_info.vip_title}`
          BookInfoAutherVIPLevelImg.title = `VIP.${item.user_info.user_growth_info.vip_level} ${item.user_info.user_growth_info.vip_title}`
          BookInfoAutherVIPLevelImg.loading = 'lazy'
          BookInfoAutherToolTipWrap.appendChild(BookInfoAutherVIPLevelImg)
          BookInfoAutherToolTip.appendChild(BookInfoAutherToolTipWrap)
          BookInfoAutherVIPLevel.appendChild(BookInfoAutherToolTip)
          BookInfoAutherLinkLink.appendChild(BookInfoAutherVIPLevel)
        }

        // 课程信息作者简介
        const BookInfoAuthorDesc = document.createElement('div')
        BookInfoAuthorDesc.classList.add('author-desc')
        const BookInfoAuthorDescSpan = document.createElement('span')
        BookInfoAuthorDescSpan.classList.add('self_description')
        const isCompanyEmpty = item.user_info.company === '' ? '' : '@'
        BookInfoAuthorDescSpan.textContent = `${item.user_info.job_title}${isCompanyEmpty}${item.user_info.company}`

        BookInfoAuthorDesc.appendChild(BookInfoAuthorDescSpan)
        BookInfoAuthorDiv.appendChild(BookInfoAuthorDesc)

        // 课程价格
        const BookInfoOtherDiv = document.createElement('div')
        BookInfoOtherDiv.classList.add('other')
        BookInfoDiv.appendChild(BookInfoOtherDiv)
        const BookInfoOtherLink = document.createElement('a')
        BookInfoOtherLink.classList.add('full-link')
        BookInfoOtherLink.href = '#'
        BookInfoOtherDiv.appendChild(BookInfoOtherLink)
        if (Number(item.max_discount.price) !== 0) {
          const BookInfoPriceDiv = document.createElement('div')
          BookInfoPriceDiv.classList.add('price')
          BookInfoPriceDiv.classList.add('lasted-price')
          BookInfoPriceDiv.innerHTML = `
            <span class="price-unit">¥</span>
            ${Number(item.max_discount.discount_money) / 100}
            <span class="origin-price">
            ¥${Number(item.max_discount.price) / 100}
            </span>
        `
          BookInfoOtherDiv.appendChild(BookInfoPriceDiv)
        } else {
          const PriceFree = document.createElement('div')
          PriceFree.classList.add('price-free')
          PriceFree.textContent = '免费'
          BookInfoDiv.appendChild(PriceFree)
          BookInfoOtherDiv.appendChild(PriceFree)
        }

        // 课程完结/更新信息
        // 第一段信息
        const BookInfoMessageDiv = document.createElement('div')
        BookInfoMessageDiv.classList.add('messages')
        const BookInfoMessageFirst = document.createElement('span')
        BookInfoMessageFirst.classList.add('messages-first')
        const isFinished = item.base_info.is_finished ? '完结' : '更新'
        BookInfoMessageFirst.textContent = `已${isFinished}${item.base_info.section_count}小节`
        BookInfoMessageDiv.appendChild(BookInfoMessageFirst)
        BookInfoOtherDiv.appendChild(BookInfoMessageDiv)

        // 第二段信息
        const BookInfoMessageSecond = document.createElement('span')
        BookInfoMessageSecond.classList.add('messages-second')
        const BookInfoMessagSecondLeft = document.createElement('span')
        BookInfoMessagSecondLeft.classList.add('messages-second-left')
        BookInfoMessagSecondLeft.textContent = `${item.base_info.buy_count}`
        const BookInfoMessagSecondRight = document.createElement('span')
        BookInfoMessagSecondRight.classList.add('messages-second-right')
        BookInfoMessagSecondRight.textContent = '人已购买'
        BookInfoMessageSecond.appendChild(BookInfoMessagSecondLeft)
        BookInfoMessageSecond.appendChild(BookInfoMessagSecondRight)
        BookInfoMessageDiv.appendChild(BookInfoMessageSecond)

        // 首单券后价
        const BookInfoSaleToolTipWrap = document.createElement('div')
        BookInfoSaleToolTipWrap.classList.add('sale-tooltip-wrap')
        const BookInfoSaleToolTip = document.createElement('div')
        BookInfoSaleToolTip.classList.add('sale-tooltip')
        BookInfoSaleToolTip.textContent = `${item.max_discount.name}`
        BookInfoSaleToolTipWrap.appendChild(BookInfoSaleToolTip)
        BookInfoDiv.appendChild(BookInfoSaleToolTipWrap)

        // 更多信息
        const BookMoreInfo = document.createElement('div')
        BookMoreInfo.classList.add('more-box')

        // DOM操作之后添加子元素
        BookFilterContentWrapDiv.append(BookFilterContentLink)
        BookFilterContentLink.appendChild(BookImgDiv)
        BookFilterContentLink.appendChild(BookInfoDiv)
      }
    )
  } catch (error) {
    // console.error('Error loading data:', error)
  }
}
void generateBooksFilterContent()
document.addEventListener('rankChanged', () => {
  void generateBooksFilterContent()
})

async function headerJueJinBookClickUpdateContent(): Promise<void> {
  // 移除样式
  const JueJin = document.querySelector('.juejin')
  const JueJinSpan = JueJin?.querySelector('.tag-item')
  JueJinSpan?.classList.add('active')
  const Byte = document.querySelector('.byte')
  const ByteSpan = Byte?.querySelector('.tag-item')
  ByteSpan?.classList.remove('active')

  const CourseMainDiv = document.querySelector('.course-main')
  if (CourseMainDiv !== null)
    CourseMainDiv.innerHTML = `
  <div class="book-filter-header">
  <div class="filter-content">
    <div class="filter-left">
      <a href="#" class="sort-item active"  id="allest">全部</a>
      <a href="#" class="sort-item" id="newest">最新</a>
      <a href="#" class="sort-item" id="hotest">热销</a>
      <a href="#" class="sort-item price-item" id="pircest">
        价格
        <div class="triangle-content">
          <div class="bottom-triangle"></div>
          <div class="top-triangle"></div>
        </div>
      </a>
    </div>
    <a href="#" class="filter-right-a">
      <div class="filter-right">
        <div class="checkbox-wrap">
          <label class="checkbox" style="width: 14px; height: 14px">
            <span class="checkbox-inner">
              <input type="checkbox" class="checkbox-input" />
              <span class="checkbox-span"></span>
            </span>
          </label>
        </div>
        <span class="isVIP">只看VIP课程</span>
      </div>
    </a>
  </div>
</div>
<div class="book-filter-content"></div>
  `
  void generateBooksFilterContent()
  // loadDataAnimation()

  document.dispatchEvent(new Event('BookFilterHeaderGenerate'))
}

function courseTagBookContentClickHandle(): void {
  const JueJinBookTag = document.querySelector('.juejin')
  JueJinBookTag?.addEventListener('click', () => {
    void headerJueJinBookClickUpdateContent()
  })
}

courseTagBookContentClickHandle()

function bookFilterUpdate(): void {
  function bookFilterClickHandle(event: Event): void {
    event.preventDefault()

    const clickId = (event.target as HTMLElement).id
    if (clickId === '') return
    // console.log(clickId)
    if (clickId === 'allest') {
      isNewSort = false
      isHotSort = false
      isPriceAsc = false
      isPriceDesc = false
      document.dispatchEvent(new Event('isSortChanged'))
    } else if (clickId === 'newest') {
      isNewSort = true
      isHotSort = false
      isPriceAsc = false
      isPriceDesc = false
      document.dispatchEvent(new Event('isNewSortChanged'))
    } else if (clickId === 'hotest') {
      isNewSort = false
      isHotSort = true
      isPriceAsc = false
      isPriceDesc = false
      document.dispatchEvent(new Event('isHotSortChanged'))
    } else if (clickId === 'pircest') {
      if (!isPriceDesc) {
        isNewSort = false
        isHotSort = false
        isPriceAsc = false
        isPriceDesc = true
        document.dispatchEvent(new Event('isPriceSortChanged'))
      } else {
        isNewSort = false
        isHotSort = false
        isPriceAsc = true
        isPriceDesc = false
        document.dispatchEvent(new Event('isPriceSortChanged'))
      }
    }
    // console.log(isNewSort)
    // console.log(isHotSort)
    // console.log(isPriceAsc)
    // console.log(isPriceDesc)

    // 改变样式
    const FilterLeft = document.querySelector('.filter-left')
    FilterLeft?.querySelectorAll('.sort-item').forEach((item) => {
      if (item.id === clickId) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })

    const BottomTriangle = document.querySelector('.bottom-triangle')
    const TopTriangle = document.querySelector('.top-triangle')
    if (clickId === 'pircest') {
      if (isPriceDesc) {
        TopTriangle?.classList.add('top-active')
        BottomTriangle?.classList.remove('bottom-active')
      } else {
        TopTriangle?.classList.remove('top-active')
        BottomTriangle?.classList.add('bottom-active')
      }
    }
  }
  const FilterLeft = document.querySelector('.filter-left')
  FilterLeft?.addEventListener('click', bookFilterClickHandle)

  const FilterRightLink = document.querySelector('.filter-right-a')
  FilterRightLink?.addEventListener('click', OnlyVIPCourseClickHandle)
}

function BookFilterHeaderGenerateHandle(): void {
  isNewSort = false
  isHotSort = false
  isPriceAsc = false
  isPriceDesc = false
  isVIPOnly = false
  rank = 0
  bookFilterUpdate()
}

document.addEventListener(
  'BookFilterHeaderGenerate',
  BookFilterHeaderGenerateHandle
)

bookFilterUpdate()

document.addEventListener('isSortChanged', () => {
  void generateBooksFilterContent()
})
document.addEventListener('isNewSortChanged', () => {
  void generateBooksFilterContent()
})
document.addEventListener('isHotSortChanged', () => {
  void generateBooksFilterContent()
})
document.addEventListener('isPriceSortChanged', () => {
  void generateBooksFilterContent()
})

function OnlyVIPCourseClickHandle(event: Event): void {
  event.preventDefault()
  // console.log()
  isVIPOnly = !isVIPOnly
  const CheckboxSpan = document.querySelector('.checkbox-span')
  // console.log(CheckboxSpan)
  // console.log(isVIPOnly)
  if (isVIPOnly) {
    CheckboxSpan?.classList.add('checkbox-span-active')
  } else {
    CheckboxSpan?.classList.remove('checkbox-span-active')
  }
  document.dispatchEvent(new Event('isVIPOnlyChanged'))
}
function OnlyVIPCourseUpdate(): void {
  const FilterRightLink = document.querySelector('.filter-right-a')
  FilterRightLink?.addEventListener('click', OnlyVIPCourseClickHandle)
}
OnlyVIPCourseUpdate()

document.addEventListener('isVIPOnlyChanged', () => {
  void generateBooksFilterContent()
})

async function headerByteCourseClickGenerateLabelLink(): Promise<void> {
  rankByte = 0
  const LabelTagNav = document.querySelector('.label-tag-nav')
  if (LabelTagNav !== null)
    LabelTagNav.innerHTML = `
    <a class="nav-item tag-item-first" id="rank-0" href="#">
      <span class="tag-item active" id="rank-0">全部</span>
    </a>
  `
  const url =
    'https://api.juejin.cn/tag_api/v1/query_category_briefs?aid=2608&uuid=7356941711581333001&spider=0'
  try {
    const response = await fetch(url)
    const jsonData = await response.json()
    // console.log(jsonData)

    let filterData = jsonData.data

    filterData = filterData.filter(
      (item: { category_name: string }) => item.category_name !== '人工智能'
    )

    filterData = filterData.filter(
      (item: { category_name: string }) => item.category_name !== '开发工具'
    )

    filterData = filterData.filter(
      (item: { category_name: string }) => item.category_name !== '阅读'
    )

    // console.log(filterData)

    const CatesLabelWrapLabel = document.querySelector(
      '.cates-label-wrap-label'
    )
    const LabelContent = CatesLabelWrapLabel?.querySelector('.label-content')
    const LabelContentNavList = LabelContent?.querySelector('.nav-list')
    // console.log(LabelContentNavList);

    filterData.forEach(
      (item: { category_url: string; category_name: string; rank: string }) => {
        const LabelNavListItemLink = document.createElement('a')
        LabelNavListItemLink.classList.add('nav-item')
        LabelNavListItemLink.id = `rank-${item.rank}`
        LabelNavListItemLink.href = '#'
        // LabelNavListItemLink.href = `/course/${item.category_url}`;
        function labelTagClickHandle(event: Event): void {
          event.preventDefault()

          const clickId = (event.target as HTMLElement).id
          // console.log(clickId);

          rankByte = Number(String(clickId).charAt(5))
          // console.log(rankByte)

          LabelContentNavList?.querySelectorAll('.nav-item').forEach(
            (element) => {
              // console.log(item.id);
              // console.log(clickId);
              if (element.id === clickId) {
                element.querySelector('.tag-item')?.classList.add('active')
              } else {
                element.querySelector('.tag-item')?.classList.remove('active')
              }
            }
          )
          document.dispatchEvent(new Event('rankByteChanged'))
        }
        LabelNavListItemLink.addEventListener('click', labelTagClickHandle)
        const tagItemFirst = document.querySelector('.tag-item-first')
        tagItemFirst?.addEventListener('click', labelTagClickHandle)

        const LabelNavListItemLinkSpan = document.createElement('span')
        LabelNavListItemLinkSpan.classList.add('tag-item')
        LabelNavListItemLinkSpan.id = `rank-${item.rank}`
        LabelNavListItemLinkSpan.textContent = item.category_name

        LabelNavListItemLink.appendChild(LabelNavListItemLinkSpan)
        LabelContentNavList?.appendChild(LabelNavListItemLink)
      }
    )
  } catch (error) {
    // console.error('Error loading data:', error)
  }
}

interface rankByteName {
  '1': string
  '2': string
  '3': string
  '4': string
  '7': string
}

const rankByteNameImpl = {
  '1': '后端',
  '2': '前端',
  '3': 'Android',
  '4': 'iOS',
  '7': ['通用素质', '项目管理']
}

async function headerByteCourseClickUpdateContent(): Promise<void> {
  // 加载数据动画先清空.course-main内容
  const CourseMainDiv = document.querySelector('.course-main')
  if (CourseMainDiv !== null) CourseMainDiv.innerHTML = ''

  // 加载数据动画
  loadDataAnimation()
  const url =
    'https://api.juejin.cn/booklet_api/v1/bytecourse/list_by_category?category_id=0&cursor=0&page_size=20&aid=2608&uuid=7356941711581333001&spider=0'
  try {
    const response = await fetch(url)
    const jsonData = await response.json()
    // console.log(jsonData)

    let filterData = jsonData.data

    if (rankByte !== 0) {
      filterData = filterData.filter((item: { content: { name: string } }) => {
        const rankName =
          rankByteNameImpl[String(rankByte) as keyof rankByteName]
        if (Array.isArray(rankName)) {
          // 如果 rankByte 对应的值是一个数组，则检查 item.content.name 是否包含数组中的任意一个值
          return rankName.some((name) => item.content.name.includes(name))
        }
        // 如果 rankByte 对应的值不是数组，则直接检查 item.content.name 是否包含该值
        return item.content.name.includes(rankName)
      })
    }

    // console.log(filterData)
    // 移除动画元素
    const CourseMain = document.querySelector('.course-main')
    if (CourseMain != null) {
      const loadingElement = CourseMain.querySelector('.loading-div')
      if (loadingElement != null) {
        CourseMain.removeChild(loadingElement)
      }
    }

    // 创建三个div子元素
    const VideoFilterContent = document.createElement('div')
    VideoFilterContent.classList.add('video-filter-content')
    const VideoFilterContentWrap = document.createElement('div')
    VideoFilterContentWrap.classList.add('video-filter-content-wrap')
    const VideoFilterContentWrapDiv = document.createElement('div')
    VideoFilterContentWrapDiv.classList.add('video-filter-content-wrap-div')
    // 添加子元素
    CourseMainDiv?.appendChild(VideoFilterContent)
    VideoFilterContent.append(VideoFilterContentWrap)
    VideoFilterContentWrap.append(VideoFilterContentWrapDiv)

    filterData.forEach(
      (item: {
        content: {
          cover_image: {
            url: string
          }
          name: string
          abstract: string
          extra: {
            course_package: {
              chapter_count: string
              duration: number
            }
          }
        }
      }) => {
        // 移除样式
        const JueJin = document.querySelector('.juejin')
        const JueJinSpan = JueJin?.querySelector('.tag-item')
        JueJinSpan?.classList.remove('active')
        const Byte = document.querySelector('.byte')
        const ByteSpan = Byte?.querySelector('.tag-item')
        ByteSpan?.classList.add('active')

        const VideoFilterContentLink = document.createElement('a')
        VideoFilterContentLink.classList.add('video-filter-content-a')
        VideoFilterContentLink.href = '#'
        VideoFilterContentLink.target = '_blank'

        VideoFilterContentWrapDiv.appendChild(VideoFilterContentLink)

        // 视频封面
        const VideoImgDiv = document.createElement('div')
        VideoImgDiv.classList.add('poster')
        const VideoImg = document.createElement('img')
        VideoImg.src = item.content.cover_image.url
        VideoImg.alt = `「${item.content.name}」封面`
        VideoImg.classList.add('video-thumb')
        VideoImg.classList.add('lazy')
        VideoImg.loading = 'lazy'
        VideoImgDiv.appendChild(VideoImg)
        VideoFilterContentLink.appendChild(VideoImgDiv)

        // 视频信息
        const VideoInfoDiv = document.createElement('div')
        VideoInfoDiv.classList.add('info')
        const VideoInfoTopDiv = document.createElement('div')
        VideoInfoTopDiv.classList.add('info-top')
        VideoInfoDiv.appendChild(VideoInfoTopDiv)
        VideoFilterContentLink.appendChild(VideoInfoDiv)

        const VideoInfoTitleBox = document.createElement('div')
        VideoInfoTitleBox.classList.add('title-box')
        VideoInfoTitleBox.innerHTML = `
            <span class="vip-free-tag tag" style="width: 55px; height: 20px; line-height: 20px;">
            VIP免费
            </span>
            ${item.content.name}
        `
        VideoInfoTopDiv.appendChild(VideoInfoTitleBox)

        // 视频简介
        const VideoInfoDescDiv = document.createElement('div')
        VideoInfoDescDiv.classList.add('video-desc')
        VideoInfoDescDiv.textContent = item.content.abstract
        VideoInfoTopDiv.appendChild(VideoInfoDescDiv)

        // 视频来源
        const VideoSourceWrap = document.createElement('div')
        VideoSourceWrap.classList.add('source-wrap')
        VideoSourceWrap.innerHTML = `
            <img src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/icon-bytetech.6c483d2.png" class="icon-bytetech">
            ByteTech
        `
        VideoInfoTopDiv.appendChild(VideoSourceWrap)

        const VideoFooterDiv = document.createElement('div')
        VideoFooterDiv.classList.add('video-count-duration-wrap')
        VideoFooterDiv.classList.add('video-duration-wrap')
        VideoFooterDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="video-icon">
            <path d="M4.32253 13.2286V13.2286C3.62016 13.2286 3.05078 12.6593 3.05078 11.9569V5.05469C3.05078 3.95012 3.94621 3.05469 5.05078 3.05469H11.953C12.6554 3.05469 13.2247 3.62407 13.2247 4.32643V4.32643" stroke-width="1.2" stroke-linecap="round"></path>
            <rect x="6.25039" y="6.24844" width="10.7275" height="10.7275" rx="1.6" stroke-width="1.2"></rect>
            <path d="M13.7117 11.2915L10.778 9.49607C10.5212 9.33889 10.1914 9.52371 10.1914 9.8248L10.1914 13.4158C10.1914 13.7168 10.5212 13.9017 10.778 13.7445L13.7117 11.949C13.9574 11.7987 13.9574 11.4419 13.7117 11.2915Z"></path>
        </svg>
        ${item.content.extra.course_package.chapter_count}个视频 · ${Math.floor(Number(item.content.extra.course_package.duration) / 3600000)}小时${((Number(item.content.extra.course_package.duration) % 3600000) / 60000).toFixed(0)}分钟
        `
        VideoInfoTopDiv.appendChild(VideoFooterDiv)
      }
    )
  } catch (error) {
    // console.error('Error loading data:', error)
  }
}

function courseTagClickHandle(): void {
  const ByteCourseTag = document.querySelector('.byte')
  const JueJin = document.querySelector('.juejin')

  ByteCourseTag?.addEventListener('click', () => {
    void headerByteCourseClickGenerateLabelLink()
  })
  ByteCourseTag?.addEventListener('click', () => {
    void headerByteCourseClickUpdateContent()
  })

  JueJin?.addEventListener('click', () => {
    void generateLabelLink()
  })
}

courseTagClickHandle()

document.addEventListener('rankByteChanged', () => {
  void headerByteCourseClickUpdateContent()
})

export {}
