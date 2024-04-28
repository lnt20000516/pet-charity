import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'loginRegister',
    redirect: '/login',
    component: () => import('@/layout/loginRegister.vue'),
    children: [{
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginRegister/login.vue'),
    }, {
      path: '/register',
      name: 'register',
      component: () => import('@/views/LoginRegister/register.vue'),
    }, {
      path: '/retrieve',
      name: 'retrieve',
      component: () => import('@/views/LoginRegister/retrieve.vue'),
    }]
  },
  {
    path: '/adminManage',
    name: 'adminManage',
    component: () => import('@/layout/adminManage'),
    redirect: '/dashboard',
    meta: {
      title: 'adminManage',
    },
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/AdminManage/dashboard.vue'),
      meta: {
        title: 'dashboard',
      },
    },
    {
      path: '/donateList',
      name: 'donateList',
      component: () => import('@/views/AdminManage/donateManage/donateList.vue'),
      meta: {
        title: '众筹列表',
      },
    },
    {
      path: '/addDonate',
      name: 'addDonate',
      component: () => import('@/views/AdminManage/donateManage/addDonate.vue'),
      meta: {
        title: '添加众筹',
      },
    },
    {
      path: '/feedbackManage',
      name: 'feedbackManage',
      component: () => import('@/views/AdminManage/feedbackManage.vue'),
      meta: {
        title: '用户反馈',
      },
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: () => import('@/views/AdminManage/personalCenter.vue'),
      meta: {
        title: '个人中心',
      },
    }
    ]
  },
  {
    path: '/homePage',
    name: 'homePage',
    redirect: '/home',
    component: () => import('@/layout/userHome.vue'),
    children: [
      {
        path: '/dog',
        name: 'dog',
        component: () => import('@/views/HomePage/home/dog.vue'),
        meta: {
          title: '狗狗',
        },
      },
      {
        path: '/cat',
        name: 'cat',
        component: () => import('@/views/HomePage/home/cat.vue'),
        meta: {
          title: '猫咪',
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomePage/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/petAdopt',
        name: 'petAdopt',
        component: () => import('@/views/HomePage/petAdopt.vue'),
        meta: {
          title: '宠物领养',
        },
      },
      {
        path: '/petAskList',
        name: 'petAskList',
        component: () => import('@/views/HomePage/petAsk/petAskList.vue'),
        meta: {
          title: '宠物问答列表',
        },
      },
      {
        path: '/petAskDetail',
        name: 'petAskDetail',
        component: () => import('@/views/HomePage/petAsk/petAskDetail.vue'),
        meta: {
          title: '宠物问答详情',
        },
      },
      {
        path: '/petDonateList',
        name: 'petDonateList',
        component: () => import('@/views/HomePage/petDonate/petDonateList.vue'),
        meta: {
          title: '宠物众筹列表',
        },
      },
      {
        path: '/petDonateDetail',
        name: 'petDonateDetail',
        component: () => import('@/views/HomePage/petDonate/petDonateDetail.vue'),
        meta: {
          title: '宠物众筹详情',
        },
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('@/views/HomePage/petDonate/payForm/index.vue'),
        meta: {
          title: '支付',
        },
      }
    ]
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    redirect: '/personalInfo',
    component: () => import('@/views/HomePage/personalCenter/index.vue'),
    meta: {
      title: '个人中心',
    },
    children: [
      {
        path: '/personalInfo',
        name: 'personalInfo',
        component: () => import('@/views/HomePage/personalCenter/personalInfo/index.vue'),
        meta: {
          title: '个人信息',
        },
      },
      {
        path: '/myPets',
        name: 'myPets',
        component: () => import('@/views/HomePage/personalCenter/myPets/index.vue'),
        meta: {
          title: '我的宠物',
        },
      },
      {
        path: '/adopt',
        name: 'adopt',
        component: () => import('@/views/HomePage/personalCenter/adopt/index.vue'),
        meta: {
          title: '发布领养',
        },
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import('@/views/HomePage/personalCenter/feedback.vue'),
        meta: {
          title: '系统反馈',
        },
      }
    ]
  },
  {
    path: '/othersCenter',
    name: 'othersCenter',
    redirect: '/hisPets',
    component: () => import('@/views/HomePage/othersCenter/index.vue'),
    meta: {
      title: '他人主页',
    },
    children: [
      {
        path: '/othersContact',
        name: 'othersContact',
        component: () => import('@/views/HomePage/othersCenter/contact.vue'),
        meta: {
          title: '联系方式',
        },
      },
      {
        path: '/hisPets',
        name: 'hisPets',
        component: () => import('@/views/HomePage/othersCenter/pets.vue'),
        meta: {
          title: 'Ta的宠物',
        },
      },
    ]
  },
  //404路由
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import('@/views/Error/404.vue')
  },
  {
    path: "/403",
    name: "notAuthorized",
    component: () => import('@/views/Error/403.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  window.$loadingBar.start();
  if (to.name !== "login" && to.name !== "register" && to.name !== "retrieve") {
    const userToken = localStorage.getItem("userToken")
    const adminToken = localStorage.getItem("adminToken")
    if (!userToken && !adminToken) {
      next({ name: "login" });
    } else {
      if (to.fullPath.includes("dashboard") || to.fullPath.includes("Manage")) {
        if (userToken) {
          next({ name: "notAuthorized" })
        }
      }
      next();
    }
  } else {
    next();
  }
})
router.afterEach(() => {
  window.$loadingBar.finish();
})
export default router
