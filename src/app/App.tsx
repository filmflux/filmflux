import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";

const App = () => {
  return (
    <div>
        <Navbar />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="hex1" size="lg" className="rounded-full">Search</Button>
      </div>
   
    </div>
  );
};

export default App;
