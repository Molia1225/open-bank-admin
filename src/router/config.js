import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'bank-opening-query',
          name: '预约银行卡信息查询',
          meta: {
            icon: 'file-ppt',
          },
          component: () => import('@/pages/openingQuery')
        },
        {
          path: 'bank-opening-status',
          name: '预约开卡状态变更',
          meta: {
            icon: 'file-ppt',
          },
          component: () => import('@/pages/openingStatus')
        },
        {
          path: 'bank-opening-visit',
          name: '预约开卡客户回访',
          meta: {
            icon: 'file-ppt',
          },
          component: () => import('@/pages/openingVisit')
        },
        {
          path: 'bank-info-manage',
          name: '银行信息管理',
          meta: {
            icon: 'file-ppt',
          },
          component: () => import('@/pages/bankInfoManage')
        },
        /* {
          path: 'parent1',
          name: '父级路由1',
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'demo1',
              name: '演示页面1',
              component: () => import('@/pages/openingQuery'),
            }
          ]
        },
        {
          path: 'parent2',
          name: '父级路由2',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'demo2',
              name: '演示页面2',
              component: () => import('@/pages/openingQuery'),
            }
          ]
        }, */
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
            invisible:true
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          name: '验权页面',
          path: 'auth/openingQuery',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/pages/openingQuery')
          }
        }
      ]
    }
  ]
}

export default options
