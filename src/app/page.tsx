import { Homepage } from '@/@componentes';
import { ThemeContextProvider } from '@/context/ContextTheme';
import {getSessionData} from '@/utils/auth'

const Page = async () => {
const session = await getSessionData()
console.log(session)
return (
    <ThemeContextProvider>
        <Homepage/>
    </ThemeContextProvider>
  );
};


export default Page;
