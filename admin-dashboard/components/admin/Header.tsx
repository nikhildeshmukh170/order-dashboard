import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {/* {session?.user?.name} */}
          Welcome, Nikhil Deshmukh
        </h2>
        <p className="text-base text-slate-500">
          Handle all orders here
        </p>
      </div>

      {/*<p>Search</p>*/}
    </header>
  );
};
export default Header;