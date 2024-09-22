import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="px-4 py-12 w-full bg-stone-200 font-solid text-sm">
      <div className="mb-3 mx-auto max-w-screen-md">
        <Link
          className="text-2xl font-bold font-logo focus:outline-none focus:opacity-80"
          to="/ready"
        >
          Shuprinter
        </Link>
      </div>
      <div className="mx-auto max-w-screen-md flex justify-between">
        <div className="flex gap-3">
          <Link to="/" className="focus:outline-none focus:opacity-80">
            ホーム
          </Link>
          <Link to="/terms" className="focus:outline-none focus:opacity-80">
            規約とポリシー
          </Link>
        </div>
        <div className="text-gray-500">
          <a href="https://github.com/yocaji/sprintpost" target="_blank">
            <span className="i-fa6-brands-github text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
