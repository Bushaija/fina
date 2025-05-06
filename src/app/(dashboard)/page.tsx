"use client"
import { useUserSession } from "@/lib/session-store";

const Home = () => {
  const { hospital, program, programs, facilities } = useUserSession();
  return <div>
    <p>{hospital}</p>
    <p>{program}</p>
    <p>{programs?.length}</p>
    <p>{facilities?.length}</p>
    <div>
      {
        facilities?.map((program) => (
          <p key={program}>{program}</p>
        ))
      }
    </div>
  </div>
}

export default Home;