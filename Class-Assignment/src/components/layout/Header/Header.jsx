import TopAnnouncementBar from "./TopAnnouncementBar";
import MainNavbar from "./MainNavbar";

export default function Header() {
  return (
    <header className="w-full font-sans shadow-sm bg-white">
      <TopAnnouncementBar />
      <MainNavbar />
    </header>
  );
}