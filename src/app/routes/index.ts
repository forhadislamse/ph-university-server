import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { StudentRoutes } from '../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];
//no return
moduleRoutes.forEach((route) => router.use(route.path, route.route));

//way-1
// router.use('/users',UserRoutes)
// router.use('/students',StudentRoutes)

export default router;
