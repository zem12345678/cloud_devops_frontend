import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/system/user/center'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/users',
  //   component: Layout,
  //   hidden: true,
  //   // redirect: 'noredirect',
  //   meta: { title: '用户管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'users',
  //       component: () => import('@/views/system/user/index'),
  //       name: '用户',
  //       meta: { title: '个人中心', icon: 'user' }
  //     }
  //   ]
  // },
  {
    path: '/books',
    component: Layout,
    redirect: '/example/list',
    name: '图书管理系统',
    meta: { title: '图书管理系统', icon: 'example' },
    children: [
      {
        path: 'book',
        name: '图书',
        component: () => import ('@/views/books/book/index'),
        meta: { title: '图书', icon: 'table' }
      },
      {
        path: 'author',
        name: '作者',
        component: () => import('@/views/books/author/index'),
        meta: { title: '作者', icon: 'tree' }},
      {
        path: 'publish',
        name: '出版商',
        component: () => import('@/views/books/publish/index'),
        meta: { title: '出版商', icon: 'table' }}
    ]
  },
  {
    path: '/project',
    component: Layout,
    name: '项目管理',
    meta: { title: '项目管理', icon: 'code' },
    children: [
      {
        path: 'project',
        name: '项目管理',
        component: () => import('@/views/project/index'),
        meta: { title: '项目管理', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/release',
  //   component: Layout,
  //   name: '代码上线',
  //   meta: { title: '代码上线', icon: 'user' },
  //   children: [
  //     {
  //       path: 'apply',
  //       name: '申请上线',
  //       component: () => import('@/views/release/apply/index'),
  //       meta: { title: '申请上线', icon: 'user' }
  //     },
  //     {
  //       path: 'list',
  //       name: '申请列表',
  //       component: () => import('@/views/release/list/index'),
  //       meta: { title: '申请列表', icon: 'tree' }
  //     },
  //     {
  //       path: 'history',
  //       name: '上线列表',
  //       component: () => import('@/views/release/history/index'),
  //       meta: { title: '上线列表', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/workorder',
  //   component: Layout,
  //   name: '工单系统',
  //   meta: { title: '工单系统', icon: 'form' },
  //   children: [
  //     {
  //       path: 'apply',
  //       name: '工单申请',
  //       component: () => import('@/views/workorder/apply/index'),
  //       meta: { title: '工单申请', icon: 'form' }
  //     },
  //     {
  //       path: 'list',
  //       name: '申请列表',
  //       component: () => import('@/views/workorder/list/index'),
  //       meta: { title: '申请列表', icon: 'table' }
  //     },
  //     {
  //       path: 'history',
  //       name: '工单历史',
  //       component: () => import('@/views/workorder/history/index'),
  //       meta: { title: '工单历史', icon: 'table' }
  //     }
  //   ]
  // },

  {
    path: '/tasks',
    component: Layout,
    name: '任务系统',
    meta: { title: '任务系统', icon: 'tree' },
    children: [
      {
        path: 'add',
        name: '任务添加',
        component: () => import('@/views/tasks/add/index'),
        meta: { title: '任务添加', icon: 'form' }
      },
      {
        path: 'list',
        name: '任务列表',
        component: () => import('@/views/tasks/list/index'),
        meta: { title: '申请列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/product',
    name: '资源管理',
    meta: {
      title: '资源管理',
      icon: 'user'
    },
    children: [
      {
        path: 'product',
        component: () => import('@/views/resource/ProductList'),
        name: '业务线',
        meta: { title: '业务线', icon: 'user' }
      },
      {
        path: 'manufacturer',
        component: () => import('@/views/resource/ManufacturerList'),
        name: '制造商',
        meta: { title: '制造商', icon: 'user' }
      },
      {
        path: 'product_model',
        component: () => import('@/views/resource/ProductModelList'),
        name: '机型型号',
        meta: { title: '机型型号', icon: 'user' }
      },
      {
        path: 'idc',
        component: () => import('@/views/resource/IdcList'),
        name: 'IDC机房',
        meta: { title: 'IDC机房', icon: 'user' }
      },
      {
        path: 'cabinet',
        component: () => import('@/views/resource/CabinetList'),
        name: '机柜管理',
        meta: { title: '机柜管理', icon: 'user' }
      },
      {
        path: 'network_device',
        component: () => import('@/views/resource/NetworkDeviceList'),
        name: '网卡管理',
        meta: { title: '网卡管理', icon: 'user' }
      },
      {
        path: 'ip',
        component: () => import('@/views/resource/IpList'),
        name: 'IP管理',
        meta: { title: 'IP管理', icon: 'user' }
      },
      {
        path: 'server',
        component: () => import('@/views/resource/ServerList'),
        name: '服务器',
        meta: { title: '服务器', icon: 'user' }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    name: '监控管理',
    meta: {
      title: '监控管理',
      icon: 'user'
    },
    children: [
      {
        path: 'monitor',
        component: () => import('@/views/monitor/zabbix'),
        name: 'monitor',
        meta: { title: 'monitor', icon: 'user' }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
