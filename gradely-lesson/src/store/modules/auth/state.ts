import { AuthModel } from '@/store/models';

const authState: AuthModel = {
  token: localStorage.getItem('gradelyAuthToken') || '',
  authUser: JSON.parse(localStorage.getItem('authUser') as any) || '',
};

export { authState as default };
