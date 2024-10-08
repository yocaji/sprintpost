import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Start from '../components/Start.tsx';
import Notes from '../components/Notes.tsx';
import Footer from '../components/Footer.tsx';

function Home() {
  const authContext = AuthContextConsumer();

  return (
    <>
      <div className={'page'}>
        <div className={'px-4 py-12 bg-stone-50 dark:bg-slate-800 font-hand'}>
          <Start />
        </div>
        <div className={'px-4 py-6 grow flex bg-stone-100 dark:bg-slate-900'}>
          {authContext?.currentUser ? <Notes /> : <div />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
