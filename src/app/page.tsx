import { Homepage } from '@/@componentes/homepage/Homepage';
import {getSessionData} from '@/utils/auth'
import { Suspense } from 'react';

const Page = async () => {
    const session = await getSessionData()
    const user  = session as {username: string} | null

    return (
        <Suspense fallback={<p>Carregando</p>}>
            <Homepage username = {user?.username ?? null}/>
        </Suspense>
    );
};


export default Page;
