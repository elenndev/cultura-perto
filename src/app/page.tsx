import { Homepage } from '@/@componentes';
import { ThemeContextProvider } from '@/context/ContextTheme';
import {getSessionData} from '@/utils/auth'
import { redirect } from 'next/navigation';

const Page = async () => {
const session = await getSessionData()
const user = session?.user as {perfilArtisticoId: string}
if(user?.perfilArtisticoId == 'none'){
  redirect('/configurar-perfil')
}
return (
    <ThemeContextProvider>
        <Homepage userSession = {session?.user ?? null}/>
    </ThemeContextProvider>
  );
};


export default Page;
