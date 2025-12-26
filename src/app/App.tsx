import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";

const App = () => {
  return (
    <div>
        <Navbar />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="destructive" size="lg" className="rounded-full">Click me</Button>
      </div>
   
    </div>
  );
};

export default App;
