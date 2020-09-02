module.exports = {
  title: 'VASON',
  description: 'enrich your life today, yesterday is history, tomorrow is mystery.',
  head: [['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    author: 'vasonYin',
    authorAvatar: '/logo.png',
    logo: '/logo.png',
    // sidebar: 'auto',
    sidebar: {
      '/note/JavaScript/': [
        '',
        '数据类型', 
        '函数'
      ]
    },
    codeTheme: 'tomorrow',
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '归档', link: '/timeline/', icon: 'reco-date' },
      { text: '社区', icon: 'reco-message', items: [
        {text: 'GitHub', link: 'https://github.com/yinsucheng', icon: 'reco-github'},
        {text: '掘金', link: 'https://juejin.im/', icon: 'reco-juejin'},
        {text: '思否', link: 'https://segmentfault.com/', icon: 'reco-sf'},
      ]}
    ],
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
        link: 'https://vuepress-theme-reco.recoluan.com',
      },
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类',
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签',
      },
    },
    // 评论功能
    vssueConfig: {
      platform: 'github',
      // baseURL: 'https://github.com',
      owner: 'yinsucheng',
      repo: 'yinsucheng.github.io',
      clientId: 'b579c80097607b8e8f39',
      clientSecret: '97daf6c40f974ad22d17f8a763000f1e8a05b2ef',
    }
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  }
}
