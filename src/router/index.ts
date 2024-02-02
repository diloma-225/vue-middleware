import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import middlewarePipeline from '@/middleware/middleware-pipeline'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        middleware: [
          guest
        ]
      },
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        middleware: [
          auth
        ]
      },
      component: ProfileView
    }
  ]
})


type MiddlewareFunction = (to: any) => void;
router.beforeEach((to, from, next) => {

  /** Navigate to next if middleware is not applied */
  if (!to.meta.middleware) {
      return next()
  }

  /** if middleware is applied  call middlewarePipeline function */
  const middleware:MiddlewareFunction[] = (to.meta.middleware||[]) as MiddlewareFunction[];
  const context = {
    to,
    from,
    next,
    //   store  | You can also pass store as an argument
  }

  return middleware[0]({
      ...context,
      next:middlewarePipeline(context, middleware,1)
  })
})

export default router
