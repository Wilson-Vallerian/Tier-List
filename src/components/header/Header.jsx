import "../../styles/header.css";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header>
      <div className="header-logo">Tier List</div>
      <SearchBar />
    </header>
  );
}
