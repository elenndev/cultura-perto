import { Homepage } from '@/@componentes/homepage/Homepage';
import { ThemeContextProvider } from '@/context/ContextTheme';
import {getSessionData} from '@/utils/auth'
import { Suspense } from 'react';

const Page = async () => {
  const session = await getSessionData()

  return (
      <ThemeContextProvider>
        <Suspense fallback={<p>Carregando</p>}>
          <Homepage userSession = {session?.user ?? null}/>
        </Suspense>
      </ThemeContextProvider>
    );
};


export default Page;
