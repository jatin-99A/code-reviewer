import { ModeToggle } from "@/components/ui/toggle-mode";
import { UserMenuWithSession } from "./features/auth/client-components/user-menu-with-session";


const Home = () => {
  return (
    <div>
          <ModeToggle />
          <UserMenuWithSession variant="compact"/>
    </div>
  )
}

export default Home
