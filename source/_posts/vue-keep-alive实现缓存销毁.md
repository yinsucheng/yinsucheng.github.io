---
title: vue keep-alive实现动态缓存以及缓存销毁
date: 2019-11-20 15:15:28
tags: [vue]
categories: [沸点]
---
## 需求来源及描述

用户登录系统，数据展示页面缓存。系统用户退出登录后，清除页面所有缓存。再次登录，重新加载数据。

## 缓存

```vue
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
```

根据页面路由是否设置 `$route.meta.keepAlive`，判断页面是否缓存。

```JavaScript
// 首页路由
{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
        keepAlive: true
    }
}
```

## 清除缓存

```javascript
// 路由守卫监听路由变化，确定用户是否在进行退出操作
beforeRouteLeave(to, from, next) {
    if (from.path === "/profile" &&to.path === "/login") {
        if (
            this.$vnode.parent &&
            this.$vnode.parent.componentInstance &&
            this.$vnode.parent.componentInstance.cache
        ) {
        let cache = this.$vnode.parent.componentInstance.cache;
        for (const key in cache) {
            delete cache[key]; // 清除缓存
        }
        }
        this.$destroy();
    }
    next();
},
```