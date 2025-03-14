import { Homepage } from '@/@componentes';
import { ThemeContextProvider } from '@/context/ContextTheme';
import { getServerSession } from 'next-auth/next';

const Page = async () => {
const session = await getServerSession()
console.log(session)
return (
    <ThemeContextProvider>
        <Homepage/>
    </ThemeContextProvider>
  );
};


export default Page;
