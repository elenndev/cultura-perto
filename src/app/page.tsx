import { Homepage } from '@/@componentes/homepage/Homepage';
import Loader from '@/@componentes/Loader';
import {getSessionData} from '@/utils/auth'
import { Suspense } from 'react';

const Page = async () => {
    const session = await getSessionData()
    const user  = session as { user: {username: string} | null }| null
    return (
        <Suspense fallback={<div className='suspense'>
            <Loader size={'7rem'}/>
            <p>Carregando</p>
        </div>}>
            <Homepage username = {user?.user?.username ?? null}/>
        </Suspense>
    );
};


export default Page;
