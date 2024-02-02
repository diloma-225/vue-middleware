import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { NavigationGuardNext } from 'vue-router';

export default async function auth({next}:{
    next: NavigationGuardNext;
}){
    const router = useRouter();
    const {isLoggedIn} = useAuthStore(); 
    if(!isLoggedIn){
        router.push('/login')
    }
 
    return next();
}