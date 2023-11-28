import { useState } from 'react'
import "./App.css";
import Form from "./components/Form";

type GithubData = {
  name: string;
};

function App() {
  const [data, setData] = useState<GithubData | null>(null);

  async function fetchData(username: string, e: unknown) {
    e.preventDefault();

    const response = await fetch(`https://api.github.com/users/${username}`);
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      setData(data);
    } else {
      console.log("Error: User not found");
    }
  }
  return (
    <>
      <div>
        <p className="font-bold text-center pt-10">The Search Form</p>
      </div>
      <Form fetchData={fetchData}/>
      <p className='text-center mt-4'>{data?.name}</p>
    </>
  );
}
export default App;
