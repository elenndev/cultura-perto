import { Homepage } from '@/@componentes';
import { ThemeContextProvider } from '@/context/ContextTheme';

const Page = () => {

  return (
    <ThemeContextProvider>
      <Homepage/>
    </ThemeContextProvider>
  );
};


export default Page;
