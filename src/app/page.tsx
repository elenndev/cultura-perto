import { Homepage } from '@/@componentes';
import { ThemeContextProvider } from '@/context/ContextTheme';
import {getSessionData} from '@/utils/auth'

const Page = async () => {
const session = await getSessionData()
return (
    <ThemeContextProvider>
        <Homepage userSession = {session?.user ?? null}/>
    </ThemeContextProvider>
  );
};


export default Page;
