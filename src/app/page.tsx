import { Homepage } from '@/@componentes';
import { ThemeContextProvider } from '@/context/ContextTheme';
import {getSessionData} from '@/utils/auth'

const Page = async () => {
const session = await getSessionData()
console.log('session que vai ser passado como props: ', session)
return (
    <ThemeContextProvider>
        <Homepage session = {session}/>
    </ThemeContextProvider>
  );
};


export default Page;
