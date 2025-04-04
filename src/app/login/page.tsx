import Loader from "@/@componentes/Loader";
import Login from "@/@componentes/login/Login";
import { Suspense } from "react";

export default function Page() {

        return(
            <Suspense fallback={<div className='suspense'>
                        <Loader size={'7rem'}/>
                        <p>Carregando</p>
                    </div>}>
                <Login/> 
            </Suspense>
        )
}
