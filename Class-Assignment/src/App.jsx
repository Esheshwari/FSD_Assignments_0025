import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-12 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RV University Web Portal</h1>
          <p className="text-gray-600">Main body content goes here.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}